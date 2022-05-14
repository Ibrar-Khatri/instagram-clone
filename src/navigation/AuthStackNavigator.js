import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SignInScreen,
  SignUpScreen,
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  NewPasswordScreen,
} from '../screens/Auth';
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign in"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
      <Stack.Screen name="Confirm email" component={ConfirmEmailScreen} />
      <Stack.Screen name="Forgot password" component={ForgotPasswordScreen} />
      <Stack.Screen name="New password" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
