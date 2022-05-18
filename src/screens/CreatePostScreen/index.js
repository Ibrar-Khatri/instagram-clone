import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {View, Image, TextInput, Alert, ScrollView} from 'react-native';
import {Button, Carousel} from '../../components';
import styles from './style';
import {createPost} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const CreatePostScreen = () => {
  const route = useRoute();
  const {image, images, video} = route?.params;
  const {userId} = useAuthContext();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [doCratePost] = useMutation(createPost);

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (post.video) {
    content = <VideoPlayer uri={video} />;
  }

  const submit = async () => {
    try {
      const response = await doCratePost({
        variables: {
          input: {
            description,
            image: image,
            images: images,
            video: video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
      console.log(response?.data?.createPost);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading the post', e?.message);
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
      <Button text="Submit" onPress={submit} />
    </ScrollView>
  );
};

export default CreatePostScreen;
