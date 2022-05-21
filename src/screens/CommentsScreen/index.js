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
  const {data, loading, error, fetchMore} = useQuery(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: 'DESC',
      limit: 10,
    },
  });

  const {data: newCommentsData} = useSubscription(onCreateCommentByPostId, {
    variables: {postID: postId},
  });
  console.log('🚀 ~ newCommentsData', newComments);
  useEffect(() => {
    if (newCommentsData?.onCreateCommentByPostId) {
      setNewComments(existing => [
        newCommentsData?.onCreateCommentByPostId,
        ...existing,
      ]);
    }
  }, [newCommentsData]);

  console.log('🚀 ~ comments', newComments);
  const comments =
    data?.commentsByPost?.items?.filter(comment => !comment?._deleted) || [];
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
        data={[...newComments, ...comments]}
        renderItem={({item}) =>
          item && (
            <Comment comment={item} includeDetails isNew={isNewComment(item)} />
          )
        }
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
