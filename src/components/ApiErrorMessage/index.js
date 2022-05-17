import {View, Text, StyleSheet, Image} from 'react-native';
import image from './error.png';
import {Button} from '../index';
import colors from '../../theme/colors';

const ApiErrorMessage = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button text="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '70%',
    height: 200,
  },
  title: {
    fontSize: 18,
    margin: 20,
  },
  message: {
    color: colors.grey,
    marginBottom: 10,
  },
});

export default ApiErrorMessage;
