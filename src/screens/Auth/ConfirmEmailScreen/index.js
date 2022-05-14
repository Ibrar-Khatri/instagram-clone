import {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {FormInput, CustomButton} from '../components/index';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route.params.username},
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onConfirmPressed = async ({username, code}) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oops', e?.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const usr = watch('username');
  console.log('🚀 ~ usr', usr);
  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(usr);
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Oops', e?.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text="Confirm"
          loading={loading}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
