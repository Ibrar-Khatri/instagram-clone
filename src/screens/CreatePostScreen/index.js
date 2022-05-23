import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {View, Text, Image, TextInput, Alert, ScrollView} from 'react-native';
import {Button, Carousel, VideoPlayer} from '../../components';
import styles from './style';
import {createPost} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import {Storage} from 'aws-amplify';
import {v4 as uuidv4} from 'uuid';

const CreatePostScreen = () => {
  const route = useRoute();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {image, images, video} = route?.params;
  const {userId} = useAuthContext();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [doCratePost] = useMutation(createPost);

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const input = {
      type: 'POST',
      description,
      image: undefined,
      images: undefined,
      video: undefined,
      nofComments: 0,
      nofLikes: 0,
      userID: userId,
    };
    if (image) {
      input.image = await uploadMedia(image);
    } else if (images) {
      const imageKeys = await Promise.all(images.map(img => uploadMedia(img)));
      input.images = imageKeys.filter(key => key);
    } else if (video) {
      input.video = await uploadMedia(video);
    }

    try {
      const response = await doCratePost({
        variables: {
          input: input,
        },
      });
      setIsSubmitting(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert('Error uploading the post', e?.message);
    }
  };

  const uploadMedia = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const uriParts = uri?.split('.');
      const extention = uriParts[uriParts.length - 1];

      const s3Response = await Storage.put(`${uuidv4()}.${extention}`, blob, {
        progressCallback(newProgress) {
          setProgress(newProgress.loaded / newProgress.total);
        },
      });
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uplaoding the file', e.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.content}>{content}</View>
      <TextInput
        placeholder="Description..."
        style={styles.input}
        multiline={true}
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />
      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        onPress={submit}
      />
      {isSubmitting && (
        <View style={styles.progressContainer}>
          <View style={[styles.progress, {width: `${progress * 100}%`}]} />
          <Text>Uploading {Math.floor(progress * 100)}%</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CreatePostScreen;
