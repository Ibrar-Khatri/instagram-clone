import {ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import {ApiErrorMessage, FeedGridView} from '../../components';
import ProfileHeader from './ProfileHeader';
import {GetUser} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const {params} = useRoute();
  const {userId: authUserId} = useAuthContext();

  const userId = params?.userId || authUserId;
  const {data, loading, error, refetch} = useQuery(GetUser, {
    variables: {
      id: userId,
    },
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  const user = data?.getUser;

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={() => refetch()}
      />
    );
  }

  console.log('🚀 ~ user.Posts.items', user.Posts.items);
  return (
    <FeedGridView
      data={user?.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
