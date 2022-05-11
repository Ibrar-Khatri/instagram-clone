import {View, Text, Image, FlatList} from 'react-native';
import user from '../../assets/data/user.json';
import {Button} from '../../components';
import styles from './style';
const ProfileScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>198</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>298</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      <View style={styles.buttonView}>
        <Button text={'Edit Profile'} onPress={() => console.warn('Edit')} />
        <Button
          text={'Another Button'}
          onPress={() => console.warn('Another Button')}
        />
      </View>
      <FlatList
        data={user.posts}
        renderItem={({item}) => (
          <Image
            source={{uri: item.image || item.images[0]}}
            style={{flex: 1, margin: 1, maxWidth: '33%', aspectRatio: 1}}
          />
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;
