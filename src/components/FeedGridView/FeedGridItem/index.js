import {View, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../theme/colors';
import style from './style';

const FeedGridItem = ({post}) => {
  return (
    <View style={style.mainGridView}>
      <Image
        source={{uri: post?.image || post?.images[0]}}
        style={style.imageStyle}
      />
      {post?.images && (
        <MaterialIcons
          name="collections"
          color={colors.white}
          style={style.iconStyle}
        />
      )}
    </View>
  );
};

export default FeedGridItem;
