import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  videoStyle: {
    width: '100%',
    aspectRatio: 1,
  },
  mutedButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
