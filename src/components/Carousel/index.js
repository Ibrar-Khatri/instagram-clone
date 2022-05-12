import {View, FlatList, Image, useWindowDimensions} from 'react-native';
import {useRef, useState} from 'react';
import styles from './style';
import colors from '../../theme/colors';
import {DoublePressable} from '../index';

const Carousel = ({images, onDoublePress}) => {
  const {width} = useWindowDimensions();
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const [activeImage, setActiveImage] = useState(0);

  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    setActiveImage(changed[0].index);
  });

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image style={{width, aspectRatio: 1}} source={{uri: item}} />
          </DoublePressable>
        )}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />
      <View style={styles.dotView}>
        {images?.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dotStyle,
              {
                backgroundColor:
                  activeImage === i ? colors.primary : colors.white,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
