import {useState} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {Comment, DoublePressable, Carousel, VideoPlayer} from '../index';

const FeedPost = ({post, isVisible}) => {
  const [isDescExpended, setIsDescExpended] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
            source={{
              uri: post?.user?.image,
            }}
            style={styles.avatarStyle}
          />
          <Text style={styles.userName}>{post?.user?.username}</Text>
          <Entypo
            name="dots-three-horizontal"
            size={16}
            style={styles.threeDots}
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
            <Text style={styles.bold}>{post.userName}</Text>
            {post.description}
          </Text>
          <Text onPress={toggleDescExpanded}>
            {isDescExpended ? 'less' : 'more'}
          </Text>

          <Text>View all {post.nofComments} comments</Text>
          {post.comments.map((com, i) => (
            <Comment key={i} comment={com} />
          ))}
          <Text>{post?.createdAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedPost;
