import {useState} from 'react';
import {View, Text, Image, TextInput, Alert} from 'react-native';
import useCommentsServices from '../../../services/CommentsServices';
import styles from './style';
const InputComment = ({postId}) => {
  const [newComment, setNewComment] = useState('');
  const {onCreateComment} = useCommentsServices(postId);

  const onPost = async () => {
    if (newComment) {
      onCreateComment(newComment);
      setNewComment('');
    }
  };
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        placeholder="write your comment..."
        onChangeText={setNewComment}
        style={styles.input}
        multiline
      />
      <Text onPress={onPost} style={styles.postButton}>
        POST
      </Text>
    </View>
  );
};

export default InputComment;
