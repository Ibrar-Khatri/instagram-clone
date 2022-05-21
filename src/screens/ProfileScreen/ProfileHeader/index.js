import {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {Button, UserImage} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Auth, Storage} from 'aws-amplify';
import {useAuthContext} from '../../../contexts/AuthContext';

const ProfileHeader = ({user}) => {
  const navigation = useNavigation();
  const {userId} = useAuthContext();

  navigation.setOptions({
    title: user?.username || 'Profile',
  });
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <UserImage imageKey={user.image} width={100} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofPosts}</Text>
          <Text style={styles.text}>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofFollowers}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user?.nofFollowings}</Text>
          <Text style={styles.text}>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.text}>{user.bio}</Text>
      {userId === user.id && (
        <View style={styles.buttonView}>
          <Button
            text={'Edit Profile'}
            onPress={() => navigation.navigate('EditProfile')}
            inline
          />
          <Button text={'Sign Out'} onPress={() => Auth.signOut()} inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
