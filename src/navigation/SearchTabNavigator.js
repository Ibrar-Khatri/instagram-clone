import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommentsScreen from '../screens/CommentsScreen';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../theme/colors';
import UserSearchScreen from '../screens/UserSearchScreen';
const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: insets.top,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
        title: 'Coming Soon',
      }}>
      <Tab.Screen name="coming_soon" component={Default} />
      {/* <Tab.Screen name="Users" component={UserSearchScreen} /> */}
      {/* <Tab.Screen name="Posts" component={CommentsScreen} /> */}
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;

const Default = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text
        style={{
          color: colors.black,
        }}>
        Coming Soon
      </Text>
    </View>
  );
};
