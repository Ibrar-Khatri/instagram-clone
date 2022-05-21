import {useState} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {Comment} from '../index';
import {useNavigation} from '@react-navigation/native';
import FeedPostMenu from './FeedPostMenu';
import useLikeService from '../../services/LikeService';
import dayjs from 'dayjs';
import Content from './Content';
import UserImage from '../UserImage';

const FeedPost = ({post, isVisible}) => {
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

  return (
    <ScrollView>
      <View style={styles.post}>
        <View style={styles.header}>
          <UserImage imageKey={post?.User?.image} />
          <Text style={styles.userName} onPress={navigateToUser}>
            {post?.User?.name}
          </Text>
          <FeedPostMenu post={post} />
        </View>
        <Content post={post} isVisible={isVisible} toggleLike={toggleLike} />

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
          <Text>{dayjs(post?.createdAt).fromNow()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedPost;
