import {StyleSheet} from 'react-native';
import colors from '../../../theme/colors';
import {size, weight} from '../../../theme/fonts';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    paddingRight: 50,
  },
  postButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    fontSize: size.s,
    fontWeight: weight.full,
    color: colors.primary,
  },
});
