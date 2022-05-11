import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './style';

const Comment = ({comment}) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>{comment.user.username} </Text>
        {comment.comment}
      </Text>
      <AntDesign
        name="hearto"
        size={14}
        style={styles.icon}
        color={colors.black}
      />
    </View>
  );
};

export default Comment;
