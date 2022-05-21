import {Storage} from 'aws-amplify';
import {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const UserImage = ({imageKey, width = 50}) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (imageKey) {
      Storage.get(imageKey).then(setImageUri);
    }
  }, [imageKey]);
  return (
    <Image
      source={
        imageUri
          ? {uri: imageUri}
          : require('../../assets/images/noUserImage.png')
      }
      style={[styles.image, {width: width}]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    aspectRatio: 1,
  },
});

export default UserImage;
