import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';

const ProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addItemToCart = item => {
    dispatch(addToCart(item));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };


  return (
    <Pressable
    onPress={() => navigation.navigate('Info', item)}
      style={{
        marginHorizontal: 20,
        marginVertical: 25,
      }}>
      <Image
        source={{uri: item?.image}}
        style={{width: 150, height: 150, resizeMode: 'contain'}}
      />
      <Text className="w-28 text-black ml-7" numberOfLines={3}>
        {item?.title}
      </Text>

      <View className="mt-3 flex  ">
        <Text className="text-black font-semibold ml-7">${item?.price}</Text>
        <Text className="text-yellow-500 ml-7">
          {item?.rating?.rate} Rating
        </Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        className="bg-yellow-500 rounded-lg w-auto flex items-center justify-center mt-5 h-10">
        {addedToCart ? (
          <Text className="text-white">Added to cart</Text>
        ) : (
          <Text className="text-white">Add To Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
