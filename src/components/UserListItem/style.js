import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {weight} from '../../theme/fonts';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  userDet: {
    marginLeft: 5,
  },
  name: {
    fontWeight: weight.bold,
    color: colors.black,
    marginBottom: 5,
  },
  username: {
    color: colors.grey,
  },
});
