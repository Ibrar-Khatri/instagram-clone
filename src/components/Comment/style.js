import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {weight} from '../../theme/fonts';

export default StyleSheet.create({
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
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  middleColumn: {flex: 1},
  footer: {flexDirection: 'row', marginBottom: 10},
  footerText: {marginRight: 10},
});
