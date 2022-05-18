import {StyleSheet, Text, View, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import colors from '../../../theme/colors';
import {deletePost} from '../queries';
import {useAuthContext} from '../../../contexts/AuthContext';

const FeedPostMenu = ({post}) => {
  const {userId} = useAuthContext();
  const [doDeletePost] = useMutation(deletePost, {
    variables: {
      input: {
        id: post.id,
        _version: post._version,
      },
    },
  });

  const startDeleting = async () => {
    const response = await doDeletePost();
    console.log('🚀 ~ response', response);
  };
  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete Post',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };
  const onEditOptionPressed = () => {};
  const isMyPost = userId === post.userID;
  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} color={colors.black} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert('Repoerting')}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {!isMyPost && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: colors.accent}]}>
                Delete
              </Text>
            </MenuOption>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default FeedPostMenu;

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});
