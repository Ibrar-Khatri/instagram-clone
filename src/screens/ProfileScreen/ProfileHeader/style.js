import {StyleSheet} from 'react-native';
import colors from '../../../theme/colors';
import {size, weight} from '../../../theme/fonts';
export default StyleSheet.create({
  root: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  avatar: {width: 100, aspectRatio: 1, borderRadius: 50},

  numberContainer: {alignItems: 'center'},
  numberText: {
    fontSize: size.md,
    fontWeight: weight.full,
    color: colors.black,
  },
  name: {
    fontWeight: weight.semi,
    color: colors.black,
  },
  buttonView: {flexDirection: 'row'},
});
