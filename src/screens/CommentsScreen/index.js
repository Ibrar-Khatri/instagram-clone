import {useState} from 'react';
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
  const {data, loading, error, fetchMore} = useQuery(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: 'DESC',
      limit: 10,
    },
  });
  const comments = data?.commentsByPost?.items?.filter(
    comment => !comment?._deleted,
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const nextToken = data?.commentsByPost?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };
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
        inverted={true}
        ListEmptyComponent={() => <Text>No comment, be the first Comment</Text>}
        onEndReached={loadMore}
      />
      <InputComment postId={postId} />
    </View>
  );
};

export default CommentsScreen;
