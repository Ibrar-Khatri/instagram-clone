import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {size, weight} from '../../theme/fonts';

export default StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: size.md,
    fontWeight: weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
    textAlignVertical: 'center',
  },
  input: {
    borderBottomWidth: 1,
  },
  errorText: {
    color: colors.error,
  },
});
