import {ActivityIndicator, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {likesForPostByUser} from './queries';
import {ApiErrorMessage, UserListItem} from '../../components';

const PostLikeScreen = () => {
  const route = useRoute();
  const {id} = route.params;
  const {data, loading, error, refetch} = useQuery(likesForPostByUser, {
    variables: {
      postID: id,
    },
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching likes" message={error.message} />
    );
  }
  const likes =
    data?.likesForPostByUser?.items.filter(like => !like?._deleted) || [];

  return (
    <FlatList
      data={likes}
      renderItem={({item}) => <UserListItem user={item.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikeScreen;
