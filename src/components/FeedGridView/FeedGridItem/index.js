import {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../theme/colors';
import style from './style';
import {Storage} from 'aws-amplify';
import VideoPlayer from '../../VideoPlayer';

const FeedGridItem = ({post}) => {
  const [imageUri, setImageUri] = useState(null);
  const [imagesUri, setImagesUri] = useState(null);
  const [videoUri, setvideoUri] = useState(null);

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
    } else if (post.video) {
      const uri = await Storage.get(post.video);
      setvideoUri(uri);
    }
  };

  return (
    (imageUri || imagesUri || videoUri) && (
      <View style={style.mainGridView}>
        {post.video ? (
          <VideoPlayer
            uri={videoUri}
            paused={false}
            style={style.imageStyle}
            isMutedShow={false}
          />
        ) : (
          <Image
            source={{uri: imageUri || imagesUri[0]}}
            style={style.imageStyle}
          />
        )}
        {post?.video ? (
          <MaterialIcons
            name="play-circle-fill"
            color={colors.black}
            style={style.iconStyle}
            size={20}
          />
        ) : (
          post?.images && (
            <MaterialIcons
              name="collections"
              color={colors.white}
              style={style.iconStyle}
            />
          )
        )}
      </View>
    )
  );
};

export default FeedGridItem;
