import {View, FlatList} from 'react-native';
import React from 'react';
import comments from '../../assets/data/comments.json';
import {Comment} from '../../components';
import styles from './style';
import InputComment from './InputComment';

const CommentsScreen = () => {
  return (
    <View style={styles.commentsScreenView}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={styles.flatListStyle}
      />
      <InputComment />
    </View>
  );
};

export default CommentsScreen;
