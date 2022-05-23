import {useQuery} from '@apollo/client';
import {useState, useRef} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {ApiErrorMessage, FeedPost} from '../../components';
import {postsByDate} from './queries';

const HomeScreen = () => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {data, loading, error, refetch, fetchMore} = useQuery(postsByDate, {
    variables: {
      type: 'POST',
      sortDirection: 'DESC',
      limit: 10,
    },
  });

  const posts = (data?.postsByDate?.items || []).filter(
    post => !post?._deleted,
  );

  const [activePostId, setActivePostId] = useState(posts?.length - 1);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    setActivePostId(changed[0].item?.id);
  });

  const nextToken = data?.postsByDate?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={item.id === activePostId} />
      )}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      onRefresh={() => refetch()}
      refreshing={loading}
      onEndReached={loadMore}
    />
  );
};

export default HomeScreen;
