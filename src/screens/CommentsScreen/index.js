import {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {ApiErrorMessage, Comment} from '../../components';
import styles from './style';
import InputComment from './InputComment';
import {useRoute} from '@react-navigation/native';
import {useQuery, useSubscription} from '@apollo/client';
import {commentsByPost, onCreateCommentByPostId} from './queries';

const CommentsScreen = () => {
  const route = useRoute();
  const {postId} = route.params;
  const [newComments, setNewComments] = useState([]);
  const {data, loading, error, fetchMore, refetch} = useQuery(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: 'ASC',
      limit: 20,
    },
    fetchPolicy: 'network-only',
  });

  const {data: newCommentsData} = useSubscription(onCreateCommentByPostId, {
    variables: {postID: postId},
  });
  useEffect(() => {
    if (newCommentsData?.onCreateCommentByPostId) {
      setNewComments(existing => [
        ...existing,
        newCommentsData?.onCreateCommentByPostId,
      ]);
    }
  }, [newCommentsData]);

  const comments =
    data?.commentsByPost?.items?.filter(
      (comment, index, self) =>
        !comment?._deleted &&
        index === self.findIndex(t => t.id === comment.id),
    ) || [];

  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const nextToken = data?.commentsByPost?.nextToken;

  const isNewComment = coment => {
    return newComments.some(c => c.id === coment.id);
  };

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
        data={[...comments, ...newComments]}
        keyExtractor={it => it?.id}
        renderItem={({item}) =>
          item && (
            <Comment comment={item} includeDetails isNew={isNewComment(item)} />
          )
        }
        style={styles.flatListStyle}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center'}}>
            No comment, be the first Comment
          </Text>
        )}
        onEndReached={loadMore}
      />
      <InputComment postId={postId} />
    </View>
  );
};

export default CommentsScreen;
