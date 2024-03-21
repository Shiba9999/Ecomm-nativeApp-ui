import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions } from 'react-native';

const ImageCarousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.floor(contentOffset / viewSize);
    setActiveImage(activeIndex);
  };

  const handleAutoScroll = () => {
    if (activeImage === images.length - 1) {
      setActiveImage(0);
    } else {
      flatListRef.current.scrollToIndex({
        index: activeImage + 1,
        animated: true,
      });
    }
  };

  const renderImage = ({ item }) => {
    return <Image source={{ uri: item.uri }} style={styles.image} />;
  };

  // Start autoscroll on component mount
  useEffect(() => {
    const timer = setInterval(handleAutoScroll, 3000); // Adjust the interval as needed (e.g., 3000ms = 3 seconds)
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderImage}
        keyExtractor={item => item.uri}
      />
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: activeImage === index ? '#fff' : '#ccc',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover', // Ensure the image covers the entire width
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ImageCarousel;
