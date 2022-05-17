import {useState} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {Comment, DoublePressable, Carousel, VideoPlayer} from '../index';
import {useNavigation} from '@react-navigation/native';

const FeedPost = ({post, isVisible}) => {
  const [isDescExpended, setIsDescExpended] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.User.id});
  };
  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };
  const toggleDescExpanded = () => {
    setIsDescExpended(v => !v);
  };
  const toggleLike = () => {
    setIsLiked(v => !v);
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post?.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = <VideoPlayer uri={post.video} paused={!isVisible} />;
  }

  return (
    <ScrollView>
      <View style={styles.post}>
        <View style={styles.header}>
          <Image
            source={
              post.User.image
                ? {
                    uri: post?.user?.image,
                  }
                : require('../../assets/images/noUserImage.png')
            }
            style={styles.avatarStyle}
          />
          <Text style={styles.userName} onPress={navigateToUser}>
            {post?.User?.name}
          </Text>
          <Entypo
            name="dots-three-horizontal"
            size={16}
            style={styles.threeDots}
            color={colors.black}
          />
        </View>
        {content}
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Pressable onPress={toggleLike}>
              <AntDesign
                name={isLiked ? 'heart' : 'hearto'}
                size={24}
                style={styles.icon}
                color={isLiked ? colors.accent : colors.black}
              />
            </Pressable>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              style={styles.icon}
              color={colors.black}
            />
            <Feather
              name="send"
              size={24}
              style={styles.icon}
              color={colors.black}
            />
            <Feather
              name="bookmark"
              size={24}
              color={colors.black}
              style={{marginLeft: 'auto'}}
            />
          </View>
          <Text style={styles.text}>
            Liked by <Text style={styles.bold}>Tommy</Text> and{' '}
            <Text style={styles.bold}>{post.nofLikes} others</Text>
          </Text>
          <Text style={styles.text} numberOfLines={isDescExpended ? 0 : 3}>
            <Text style={styles.bold}>{post.User.username}</Text>
            {post.description}
          </Text>
          <Text onPress={toggleDescExpanded}>
            {isDescExpended ? 'less' : 'more'}
          </Text>

          <Text onPress={navigateToComments}>
            View all {post?.nofComments} comments
          </Text>
          {post?.comments?.map((com, i) => (
            <Comment key={i} comment={com} />
          ))}
          <Text>{post?.createdAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedPost;
