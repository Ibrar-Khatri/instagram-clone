import {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../theme/colors';
import style from './style';
import {Storage} from 'aws-amplify';

const FeedGridItem = ({post}) => {
  const [imageUri, setImageUri] = useState(null);
  const [imagesUri, setImagesUri] = useState(null);

  useEffect(() => {
    donwloadMedia();
  }, []);

  const donwloadMedia = async () => {
    if (post.image) {
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    } else if (post.images) {
      const uris = await Promise.all(post.images.map(img => Storage.get(img)));
      setImagesUri(uris);
    }
  };
  return (
    (imageUri || imagesUri) && (
      <View style={style.mainGridView}>
        <Image
          source={{uri: imageUri || imagesUri[0]}}
          style={style.imageStyle}
        />
        {post?.images && (
          <MaterialIcons
            name="collections"
            color={colors.white}
            style={style.iconStyle}
          />
        )}
      </View>
    )
  );
};

export default FeedGridItem;
