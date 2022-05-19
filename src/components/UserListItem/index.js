import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './style';

const UserListItem = ({user}) => {
  const navigation = useNavigation();
  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {user: user.id});
  };
  return (
    <Pressable style={styles.root} onPress={goToUserScreen}>
      <Image
        source={
          user.image
            ? {uri: user.image}
            : require('../../assets/images/noUserImage.png')
        }
        style={styles.image}
      />
      <View style={styles.userDet}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
