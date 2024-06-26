import {Text, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';

const ListScreen = () => {
  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },

    {
      id: '6',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];
  return (
    <ScrollView
      horizontal
      className=" h-32 w-full "
      showsHorizontalScrollIndicator={false}>
      {list.map(item => (
        <Pressable key={item?.id} className="bg-white rounded-md p-3 m-2 ">
          <Image source={{uri: item.image}} style={{width: 50, height: 50}} />
          <Text className="text-black text-base font-sans text-center   ">
            {item?.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default ListScreen;
