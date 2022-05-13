import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
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
  },
});
