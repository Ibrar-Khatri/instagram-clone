import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Image, Text, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAuthContext} from '../../contexts/AuthContext';
import {deleteUser, GetUser, updateUser, usersByUsername} from './queries';
import {ApiErrorMessage} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import CustomInput from './CustomInput';
import styles from './style';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const {userId, user: authUser} = useAuthContext();
  const {data, loading, error} = useQuery(GetUser, {
    variables: {
      id: userId,
    },
  });
  const [
    doUpdateUser,
    {data: updateData, loading: updateLoading, error: updateError},
  ] = useMutation(updateUser);
  const [
    doDeleteUser,
    {data: deleteData, loading: deleteLoading, error: deleteError},
  ] = useMutation(deleteUser);
  const [getUsersByUsername] = useLazyQuery(usersByUsername);

  const {control, handleSubmit, setValue} = useForm();
  const navigation = useNavigation();
  const user = data?.getUser;

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('username', user?.username);
      setValue('bio', user?.bio);
      setValue('website', user?.website);
    }
  }, []);

  const onSubmit = async val => {
    await doUpdateUser({
      variables: {
        input: {
          id: userId,
          ...val,
          _version: user._version,
        },
      },
    });

    navigation.goBack();
  };
  const changePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets.length > 0)
          setSelectedPhoto(assets[0]);
      },
    );
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };
  const startDeleting = async () => {
    // console.log('Deleting');
    if (!user) {
      return;
    }
    await doDeleteUser({
      variables: {
        input: {
          id: userId,
          _version: user._version,
        },
      },
    });
    authUser.deleteUser(err => {
      if (err) {
        console.log(err);
      }
      Auth.signOut();
    });
  };

  const validateUsername = async username => {
    try {
      const response = await getUsersByUsername({
        variables: {username},
      });
      if (response?.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      const users = response?.data?.usersByUsername?.items;
      if (users && users?.length > 0 && users?.[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to fetch username');
    }
    return true;
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating the user"
        message={error?.message || updateError?.message || deleteError?.message}
      />
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user.image}}
        style={styles.avatar}
      />
      <Text style={styles.textButton} onPress={changePhoto}>
        Change profile button
      </Text>
      <CustomInput
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
        }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minlength: {
            value: 3,
            message: 'Username should be more than 3 character',
          },
          validate: validateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          require: 'Website is required',
          pattern: {
            value: URL_REGEX,
            message: 'Invalid url',
          },
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          required: 'Bio is required',
          maxlength: {
            value: 200,
            message: 'Bio should be more than 200 character',
          },
        }}
        label="Bio"
        multiline
      />
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        {updateLoading ? 'Submiting...' : 'Submit'}
      </Text>
      <Text style={styles.textButtonDanger} onPress={confirmDelete}>
        {deleteLoading ? 'Deleting...' : 'Delete'}
      </Text>
    </ScrollView>
  );
};

export default EditProfileScreen;
