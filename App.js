import {StyleSheet, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const App = () => {
  return (
    <View style={styles.app}>
      {/* <CommentsScreen /> */}
      {/* <HomeScreen /> */}
      {/* <ProfileScreen />
       */}
      <EditProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {flex: 1},
});

export default App;
