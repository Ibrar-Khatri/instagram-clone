import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const PostUploadScreen = () => {
  //   const [hasPermission, setHasPermission] = useState(null);
  //   useEffect(() => {
  //     (async function () {
  //       const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //       const microphonePermission =
  //         await Camera.requestMicrophonePermissionsAsyncF();
  //       setHasPermission(
  //         cameraPermission.status === 'granted' &&
  //           microphonePermission.status === 'granted',
  //       );
  //     })();
  //   }, []);
  //   if (hasPermission === null) {
  //     return <Text>Loading</Text>;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to the camera</Text>;
  //   }
  return (
    <View>
      <Text>PostUploadScreen</Text>
    </View>
  );
};

export default PostUploadScreen;
