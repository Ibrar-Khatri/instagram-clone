import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {CustomButton, FormInput} from '../components';
import {Auth} from 'aws-amplify';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState();

  const onSendPressed = async ({username}) => {
    // console.warn(data);
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.forgotPassword(username);
      Alert.alert(
        `Check your email",'The code has been sent to ${response.CodeDeliveryDetails.Destination}`,
      );
      navigation.navigate('New password');
    } catch (e) {
      Alert.alert('Oops', e?.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <CustomButton
          text="Send"
          onPress={handleSubmit(onSendPressed)}
          loading={loading}
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

export default ForgotPasswordScreen;
