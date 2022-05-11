import {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import styles from './style';
const InputComment = () => {
  const [newComment, setNewComment] = useState('');
  const onPost = () => {
    console.log('Posting');
    setNewComment('');
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
