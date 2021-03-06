import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {size, weight} from '../../theme/fonts';

export default StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: size.md,
    fontWeight: weight.semi,
    margin: 10,
  },
  textButtonDanger: {
    color: colors.error,
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
    color: colors.black,
  },
  input: {
    borderBottomWidth: 1,
    color: colors.black,
    minHeight: 50,
  },
  errorText: {
    color: colors.error,
  },
});
