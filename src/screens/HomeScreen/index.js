import {useState, useRef} from 'react';
import {FlatList} from 'react-native';
import posts from '../../assets/data/posts.json';
import {FeedPost} from '../../components';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState(null);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    setActivePostId(changed[0].item?.id);
  });

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
