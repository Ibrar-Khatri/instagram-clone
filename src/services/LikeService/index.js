import {useMutation, useQuery} from '@apollo/client';
import {useAuthContext} from '../../contexts/AuthContext';
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from './queries';

const useLikeService = post => {
  const {userId} = useAuthContext();
  const [doUpdatePost] = useMutation(updatePost);
  const [doDeleteLike] = useMutation(deleteLike);
  const [doCrateLike] = useMutation(createLike, {
    variables: {
      input: {userID: userId, postID: post.id},
    },
    refetchQueries: ['LikesForPostByUser'],
  });

  const {data: usersLikeData} = useQuery(likesForPostByUser, {
    variables: {
      postID: post.id,
      userID: {
        eq: userId,
      },
    },
  });

  const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(
    like => !like._deleted,
  )?.[0];

  const incrementNofLikes = amount => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post?._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  const onAddLike = () => {
    doCrateLike();
    incrementNofLikes(1);
  };
  const onDeleteLike = () => {
    if (!userLike) {
      return;
    }
    doDeleteLike({
      variables: {
        input: {
          id: userLike.id,
          _version: userLike._version,
        },
      },
    });
    incrementNofLikes(-1);
  };
  const toggleLike = () => {
    if (userLike) {
      onDeleteLike();
    } else {
      onAddLike();
    }
  };

  return {
    toggleLike,
    isLiked: !!userLike,
  };
};

export default useLikeService;
