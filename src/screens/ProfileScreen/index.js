import {useRoute} from '@react-navigation/native';
import user from '../../assets/data/user.json';
import {FeedGridView} from '../../components';
import ProfileHeader from './ProfileHeader';

const ProfileScreen = () => {
  const {params} = useRoute();
  console.log('🚀 ~ params', params);
  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
