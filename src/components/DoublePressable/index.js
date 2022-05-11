import {Pressable} from 'react-native';

const DoublePressable = ({children, onDoublePress}) => {
  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 300) onDoublePress();
    lastTap = now;
  };
  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default DoublePressable;
