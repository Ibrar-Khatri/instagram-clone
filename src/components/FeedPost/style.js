import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {weight} from '../../theme/fonts';

export default StyleSheet.create({
  post: {},
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarStyle: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: colors.black,
    fontWeight: weight.bold,
  },
  threeDots: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {color: colors.black, lineHeight: 18},
  bold: {fontWeight: weight.bold},
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: colors.black,
    flex: 1,
    lineHeight: 18,
  },
});
