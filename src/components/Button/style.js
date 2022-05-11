import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {weight} from '../../theme/fonts';
export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  text: {
    color: colors.black,
    fontWeight: weight.semi,
  },
});
