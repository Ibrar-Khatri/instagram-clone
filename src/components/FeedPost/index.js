import {View, Text, Image, ScrollView} from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import {Comment} from '../index';

const FeedPost = ({post}) => {
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
        <Image
          source={{
            uri: post?.image,
          }}
          style={styles.image}
        />
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <AntDesign
              // name="heart"
              name="hearto"
              size={24}
              style={styles.icon}
              color={colors.black}
            />
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
          <Text style={styles.text}>
            <Text style={styles.bold}>{post.userName}</Text>
            {post.description}
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
