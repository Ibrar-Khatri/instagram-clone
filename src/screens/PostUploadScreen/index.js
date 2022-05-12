import React, {PureComponent, useState, useEffect, useRef} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';

const PostUploadScreen = () => {
  let [flash, setFlash] = useState(0);

  let [zoom, setZoom] = useState(0);
  let [autoFocus, setAutoFocus] = useState('on');
  let [depth, setDepth] = useState(0);
  let [type, setType] = useState(RNCamera.Constants.Type.back);
  let [permission, setPermission] = useState('undetermined');
  let cameraRef = useRef(null);

  const toggleFlash = () => {
    setFlash(v =>
      v === RNCamera.Constants.FlashMode.torch
        ? 0
        : RNCamera.Constants.FlashMode.torch,
    );
  };
  const zoomOut = () => {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
  };
  const zoomIn = () => {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(soptions);
      console.log(data.uri);
    }
  };

  const toggleType = () => {
    setType(v =>
      v === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };
  return (
    <View style={styles.page}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flash}
        aspectRatio={4 / 3}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons
          name="flash-off"
          size={30}
          color={colors.white}
          onPress={toggleFlash}
        />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <View style={styles.circle} />
        <MaterialIcons
          name="flip-camera-ios"
          size={30}
          color={colors.white}
          onPress={toggleType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});

export default PostUploadScreen;
