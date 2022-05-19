import {useNavigation, useRoute} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {
  View,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ApiErrorMessage, Button} from '../../components';
import styles from './style';
import {getPost, updatePost} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const UpdatePostScreen = () => {
  const route = useRoute();
  const {id} = route?.params;
  const {userId} = useAuthContext();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [doUpdatePost, {error: updateError, data: updateData}] =
    useMutation(updatePost);
  const {data, loading, error} = useQuery(getPost, {
    variables: {
      id: id,
    },
  });
  const post = data?.getPost;

  useEffect(() => {
    if (data) {
      setDescription(data?.getPost?.description || '');
    }
  }, [data]);
  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation]);
  const submit = async () => {
    if (!post) {
      return;
    }
    await doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          description,
        },
      },
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error.message || updateError.message}
      />
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.root}>
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

export default UpdatePostScreen;
