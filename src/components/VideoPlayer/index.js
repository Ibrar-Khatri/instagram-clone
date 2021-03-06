import {useState} from 'react';
import {View, Pressable} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

const VideoPlayer = ({uri, paused, style, isMutedShow = true}) => {
  const [muted, setMuted] = useState(true);
  return (
    <View>
      {uri && (
        <Video
          source={{uri}}
          style={styles.videoStyle}
          resizeMode="cover"
          repeat
          muted={muted}
          paused={paused}
        />
      )}
      {isMutedShow && (
        <Pressable
          style={[styles.mutedButton, style]}
          onPress={() => setMuted(v => !v)}>
          <Ionicons
            name={muted ? 'volume-mute' : 'volume-medium'}
            size={14}
            color="white"
          />
        </Pressable>
      )}
    </View>
  );
};

export default VideoPlayer;
