import {View, Text, Image, Pressable} from 'react-native';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import styles from './style';
import dayjs from 'dayjs';
import UserImage from '../UserImage';

const Comment = ({comment, isNew, includeDetails = false}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => setIsLiked(v => !v);
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <UserImage imageKey={comment?.User?.image} width={40} />
      )}

      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment?.User?.username} </Text>
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            {isNew && <Text style={styles.new}>new</Text>}
            <Text style={styles.footerText}>
              {dayjs(comment?.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={14}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
