import {Pressable, Text} from 'react-native';
import styles from './style';

const Button = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
