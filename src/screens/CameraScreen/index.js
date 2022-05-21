import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {View, Pressable} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import styles from './style';

const flashModeToIcon = {
  [RNCamera.Constants.FlashMode.off]: 'flash-off',
  [RNCamera.Constants.FlashMode.on]: 'flash-on',
  [RNCamera.Constants.FlashMode.torch]: 'highlight',
  [RNCamera.Constants.FlashMode.auto]: 'flash-auto',
};

const CameraScreen = () => {
  let [flash, setFlash] = useState(0);
  let [type, setType] = useState(RNCamera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  let cameraRef = useRef(null);

  const inset = useSafeAreaInsets();

  const toggleType = () => {
    setType(v =>
      v === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };
  const toggleFlash = () => {
    setFlash(v => (v === RNCamera.Constants.FlashMode.auto ? 0 : v + 1));
  };

  const startRecording = async () => {
    if (!isCameraReady || !cameraRef.current || isRecording) {
      return;
    }
    const options = {
      quality: RNCamera.Constants.VideoQuality['640:480'],
      maxDuraion: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };
    setIsRecording(true);
    try {
      const data = await cameraRef.current.recordAsync(options);
      navigation.navigate('Create', {
        video: data.uri,
      });
    } catch (e) {
      console.log('🚀 ~ e', e);
    }
    setIsRecording(false);
  };
  const stopRecording = () => {
    if (isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'mixed', selectionLimit: 3},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets.length > 0) {
          const params = {};
          if (assets.length === 1) {
            const field = assets[0].type?.startsWith('video')
              ? 'video'
              : 'image';
            params[field] = assets[0].uri;
          } else if (assets.length > 1) {
            params.images = assets?.map(asset => asset.uri);
          }
          navigation.navigate('Create', params);
        }
      },
    );
  };

  const takePicture = async () => {
    if (!cameraRef.current || !isCameraReady || isRecording) {
    }
    const options = {quality: 0.5, base64: false, skipProcessing: true};
    const data = await cameraRef.current.takePictureAsync(options);
    navigation.navigate('Create', {
      image: data.uri,
    });
  };

  return (
    <View style={styles.page}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flash}
        aspectRatio={4 / 3}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonsContainer, {top: inset.top + 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons
          name={flashModeToIcon[flash]}
          size={30}
          color={colors.white}
          onPress={toggleFlash}
        />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons
          name="photo-library"
          size={30}
          color={colors.white}
          onPress={openImageGallery}
        />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.accent : colors.white},
              ]}
            />
          </Pressable>
        )}
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

export default CameraScreen;
