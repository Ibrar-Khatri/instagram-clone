import {useQuery} from '@apollo/client';
import {FlatList, ActivityIndicator} from 'react-native';
import {ApiErrorMessage, UserListItem} from '../../components';
import {listUsers} from './queries';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery(listUsers);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (loading) {
    return (
      <ApiErrorMessage title="Error fetching users" message={error?.message} />
    );
  }
  const users = (data?.listUsers?.items || []).filter(
    user => user && !user._deleted,
  );
  return (
    <FlatList
      data={users}
      renderItem={({item}) => item && <UserListItem user={item} />}
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
