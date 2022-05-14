import {View, Text, Image} from 'react-native';
import styles from './style';
import user from '../../../assets/data/user.json';
import {Button} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ProfileHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text style={styles.text}>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>198</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>298</Text>
          <Text style={styles.text}>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.text}>{user.bio}</Text>
      <View style={styles.buttonView}>
        <Button
          text={'Edit Profile'}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <Button text={'Sign Out'} onPress={() => Auth.signOut()} />
      </View>
    </View>
  );
};

export default ProfileHeader;
