import {Pressable, Text} from 'react-native';
import styles from './style';

const Button = ({onPress, text, inline = false}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, inline ? {flex: 1} : {}]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
