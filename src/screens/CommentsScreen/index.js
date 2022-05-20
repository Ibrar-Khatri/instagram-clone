import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {ApiErrorMessage, Comment} from '../../components';
import styles from './style';
import InputComment from './InputComment';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {commentsByPost} from './queries';

const CommentsScreen = () => {
  const route = useRoute();
  const {postId} = route.params;
  const {data, loading, error} = useQuery(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: 'DESC',
    },
  });
  const comments = data?.commentsByPost?.items?.filter(
    comment => !comment?._deleted,
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching comment"
        message={error?.message}
      />
    );
  }
  return (
    <View style={styles.commentsScreenView}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={styles.flatListStyle}
        inverted
        ListEmptyComponent={() => (
          <Text>No comment, be the first Comment </Text>
        )}
      />
      <InputComment postId={postId} />
    </View>
  );
};

export default CommentsScreen;
