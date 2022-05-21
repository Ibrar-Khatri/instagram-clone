import {Storage} from 'aws-amplify';
import {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {DoublePressable, Carousel, VideoPlayer} from '../../index';
import styles from '../style';

const Content = ({post, isVisible, toggleLike}) => {
  const [imageUri, setImageUri] = useState(null);
  const [imagesUri, setImagesUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

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
      setVideoUri(uri);
    }
  };

  if (imageUri) {
    return (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (imagesUri) {
    return <Carousel images={imagesUri} onDoublePress={toggleLike} />;
  } else if (videoUri) {
    return <VideoPlayer uri={videoUri} paused={!isVisible} />;
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Content;
