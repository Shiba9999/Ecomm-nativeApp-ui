import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React from 'react';
import HeaderScreen from './HeaderScreen';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  function HandleIncrease(item){
    dispatch(incrementQuantity(item))
  }
  function HandleDecrease(item){
    dispatch(decrementQuantity(item))
  }
  function handleRemoveItem(item){
    dispatch(removeFromCart(item))
  }
  return (
    <ScrollView className="mt-1">
      <HeaderScreen />
      <View className=" mt-3 ml-3 ">
        <Text className="text-black text-lg">SubTotal: ${getTotalPrice()}</Text>
        <Text className="text-black mt-2">Emi Details Available</Text>
        <Pressable
        onPress={()=>navigation.navigate('Confirm')}
        className="bg-yellow-500 rounded-lg w-auto  flex items-center justify-center mt-5 h-10">
          <Text className="text-white">
            Proceed to Buy ({cart.length}) items
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 w-full  bg-white">
        {cart.map((item, index) => (
          <View className="bg-white mt-2 ml-3" key={index}>
            <Pressable className="flex-row items-center">
              <View>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                  }}
                  source={{uri: item?.image}}
                />
              </View>

              <View>
                <Text className="text-black w-36 ml-3">{item.title}</Text>
                <Text className="text-black w-36 ml-3 mt-2 font-bold">
                  ${item.price}
                </Text>
              </View>

              <Pressable className="flex-1 items-center justify-center gap-3">
             

                <Pressable className="mr-6">
                  <View className="flex-row items-center justify-center gap-2 ">
                    <AntDesign
                        onPress={()=>HandleDecrease(item)}
                    name="minus" size={24} color="black" />
                    <Text className="text-black"> {item.quantity}</Text>
                    <AntDesign
                    onPress={()=>HandleIncrease(item)}
                      name="plus"
                      size={24}
                      color="black"
                      className="mr-2"
                    />
                  </View>
                </Pressable>


                <Pressable
                onPress={()=>handleRemoveItem(item)}
                
                className="mr-6">
                  <View>
                    <AntDesign name="delete" size={24} color="black" />
                  </View>
                </Pressable>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
