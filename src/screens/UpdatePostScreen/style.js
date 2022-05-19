import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
  },
});
