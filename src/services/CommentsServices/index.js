import {Alert} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {useAuthContext} from '../../contexts/AuthContext';
import {createComment, getPost, updatePost} from './queries';

const useCommentsServices = postId => {
  const {userId} = useAuthContext();
  const [doUpdatePost] = useMutation(updatePost);
  const [doCreateComment] = useMutation(createComment);
  const {data: postData} = useQuery(getPost, {
    variables: {
      id: postId,
    },
  });
  const post = postData?.getPost;
  console.log('🚀 ~ post', postData);
  const incrementNofComments = amount => {
    if (!post) {
      Alert.alert('Failed to load post. Try again later');
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: postId,
          _version: post?._version,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async newComment => {
    if (!post) {
      Alert.alert('Failed to load post. Try again later');
      return;
    }
    try {
      await doCreateComment({
        variables: {
          input: {
            postID: postId,
            userID: userId,
            comment: newComment,
          },
        },
        refetchQueries: ['CommentsByPost'],
      });
      incrementNofComments(1);
    } catch (e) {
      Alert.alert('Error submitting the comment', e?.message);
    }
  };
  return {
    onCreateComment,
  };
};
export default useCommentsServices;
