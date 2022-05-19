import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Logo from '../assets/images/logo.png';
import UpdatePostScreen from '../screens/UpdatePostScreen';

const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          headerTitle: HeaderTitle,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{title: 'Update Post'}}
      />
    </Stack.Navigator>
  );
};

const HeaderTitle = () => (
  <Image source={Logo} style={{width: 150, height: 40}} />
);

export default HomeStackNavigator;
