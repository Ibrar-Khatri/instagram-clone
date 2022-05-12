import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Image, Text, TextInput, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import user from '../../assets/data/user.json';
import colors from '../../theme/colors';
import styles from './style';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const CustomInput = ({label, multiline, control, name, rules}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flex: 1}}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={label}
            multiline={multiline}
            style={[
              styles.input,
              {borderColor: error ? colors.error : colors.border},
            ]}
          />
          {error && (
            <Text style={styles.errorText}>{error?.message || 'required'}</Text>
          )}
        </View>
      </View>
    )}
  />
);

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });

  const onSubmit = data => {
    console.log('🚀 ~ data', data);
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
        Submit
      </Text>
    </ScrollView>
  );
};

export default EditProfileScreen;
