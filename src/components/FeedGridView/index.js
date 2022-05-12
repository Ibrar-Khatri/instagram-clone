import {FlatList, Text, Image} from 'react-native';
import React from 'react';
import FeedGridItem from './FeedGridItem';

const FeedGridView = ({data, ListHeaderComponent}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(_, i) => i}
      style={{marginHorizontal: -1}}
    />
  );
};

export default FeedGridView;
