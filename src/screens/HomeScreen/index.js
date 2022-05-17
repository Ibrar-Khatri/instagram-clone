import {useQuery} from '@apollo/client';
import {useState, useRef} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import posts from '../../assets/data/posts.json';
import {ApiErrorMessage, FeedPost} from '../../components';
import {listPost} from './queries';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState(null);
  const {data, loading, error} = useQuery(listPost);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    setActivePostId(changed[0].item?.id);
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }
  // const posts = data?.listPost?.items || [];
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={item.id === activePostId} />
      )}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

export default HomeScreen;
