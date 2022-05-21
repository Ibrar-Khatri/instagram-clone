import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
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
  progressContainer: {
    backgroundColor: colors.lightgrey,
    width: '95%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: colors.primary,
    position: 'absolute',
    height: '100%',
    width: '30%',
    alignSelf: 'flex-start',
    borderRadius: 25,
  },
});
