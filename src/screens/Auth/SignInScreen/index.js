import {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {CustomButton, FormInput, SocialSignInButtons} from '../components';
import {Auth} from 'aws-amplify';
import {useAuthContext} from '../../../contexts/AuthContext';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, reset} = useForm();
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();

  const onSignInPressed = async ({username, password}) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const cognitoUser = await Auth.signIn(username, password);
      setUser(cognitoUser);
    } catch (e) {
      if (e?.name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {username});
      } else {
        Alert.alert('Ooops', e?.message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(onSignInPressed)}
          loading={loading}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
