import {useState} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {Comment, DoublePressable, Carousel, VideoPlayer} from '../index';
import {useNavigation} from '@react-navigation/native';
import FeedPostMenu from './FeedPostMenu';
import useLikeService from '../../services/LikeService';

const FeedPost = ({post, isVisible}) => {
  console.log('🚀 ~ post', post);
  const [isDescExpended, setIsDescExpended] = useState(false);
  const navigation = useNavigation();

  const {toggleLike, isLiked} = useLikeService(post);

  const postLikes = post?.Likes?.items?.filter(like => !like._deleted) || [];

  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.User.id});
  };
  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const goToLikesScreen = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };
  const toggleDescExpanded = () => {
    setIsDescExpended(v => !v);
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

  console.log(post?.Comments?.items, 'post?.Comments?.items');

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
          <FeedPostMenu post={post} />
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
          {postLikes?.length === 0 ? (
            <Text style={styles.text}>Be the first to like the post</Text>
          ) : (
            <Text style={styles.text} onPress={goToLikesScreen}>
              Liked by{' '}
              <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>{' '}
              {postLikes.length > 1 && (
                <>
                  and{' '}
                  <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
                </>
              )}
            </Text>
          )}
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
          {(post?.Comments?.items || []).map((com, i) => (
            <Comment key={i} comment={com} />
          ))}
          <Text>{post?.createdAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedPost;
