import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommentsScreen from '../screens/CommentsScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from '../contexts/AuthContext';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, userId} = useAuthContext();

  const {data, loading, error} = useQuery(getUser, {
    variables: {
      id: userId,
    },
  });

  const userData = data?.getUser;

  if (user == null || loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreen = null;
  if (!user) {
    stackScreen = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{headerShown: false}}
      />
    );
  } else if (!userData?.username) {
    stackScreen = (
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Setup Profile'}}
      />
    );
  } else {
    stackScreen = (
      <>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>{stackScreen}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
