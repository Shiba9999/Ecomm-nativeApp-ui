import {View, Text, Pressable, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {cleanCart} from '../../redux/CartReducer';
const ConfirmtionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [address, setAddresses] = useState([]);
  const userId = useSelector(state => state.user.userId);
  const [selectedAddress, setSelectedAddress] = useState('');
  const steps = [
    {title: 'Address', content: 'Address Form'},
    {title: 'Delivery', content: 'Delivery Options'},
    {title: 'Payment', content: 'Payment Details'},
    {title: 'Place Order', content: 'Order Summary'},
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const [option, setOption] = useState(false);
  const cart = useSelector(state => state.cart.cart);

  const [currentStep, setCurrentStep] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.16:8000/addresses/${userId}`,
      );
      if (response) {
        const data = await response.data;

        setAddresses(data);
      }
    } catch (error) {
      console.log('error from confirmation', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handlePlaceOrder() {
    try {
      const orderData = {
        userId,
        cartItems: cart,
        shippingAddress: selectedAddress,
        totalPrice: getTotalPrice(),
        paymentMethod: selectedOption,
      };
      const response = await axios.post(
        'http://192.168.29.16:8000/orders',
        orderData,
      );
      const data = await response.data;

      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  return (
    <ScrollView className="mt-4">
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {steps.map((step, index) => (
            <View
              style={{justifyContent: 'center', alignItems: 'center'}}
              key={index}>
              {index > 0 && (
                <View
                  style={[
                    {flex: 1, height: 2, backgroundColor: 'green'},
                    index <= currentStep && {backgroundColor: 'green'},
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    {index + 1}
                  </Text>
                )}
              </View>

              <Text className="text-black mt-2">{step.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View>
          <Text className="text-black font-bold text-lg mt-4 ml-2">
            Select Delivery Address
          </Text>

          <Pressable className="mt-9 flex-1 flex ">
            {address && address.addresses && address.addresses.length > 0 ? (
              address.addresses.map((item, index) => (
                <Pressable
                  key={index}
                  className="border-2 border-gray-300 rounded-lg flex-row h-72 items-center mx-2 mb-4">
                  <View className="ml-1">
                    {selectedAddress && selectedAddress._id === item._id ? (
                      <FontAwesome6 name="circle-dot" size={24} color="black" />
                    ) : (
                      <Entypo
                        onPress={() => setSelectedAddress(item)}
                        name="circle"
                        size={24}
                        color="black"
                      />
                    )}
                  </View>

                  <View>
                    <View className="flex-row items-center gap-3 mt-2 ml-9">
                      <Text className="text-black">{item.name}</Text>
                    </View>

                    <Text className="text-black ml-12">
                      {item.houseNo} , {item.landmark}
                    </Text>

                    <Text className="text-black ml-12">{item.street}</Text>

                    <Text className="text-black ml-12">{item.country}</Text>

                    <Text className="text-black ml-12">{item.mobileNo}</Text>

                    <Text className="text-black ml-12">
                      pin code: {item.postalCode}
                    </Text>

                    <View className="mt-3 ml-12 w-24 items-center  flex-row">
                      <Pressable className=" px-3 border-2  p-2 rounded-full border-gray-300">
                        <Text className="text-black text-center">Edit</Text>
                      </Pressable>

                      <Pressable className=" px-3 border-2 p-2 rounded-full border-gray-300  ml-4">
                        <Text className="text-black text-center">Remove</Text>
                      </Pressable>

                      <Pressable className=" px-3 border-2 w-32 p-2  rounded-full border-gray-300  ml-4">
                        <Text className="text-black text-center">
                          {' '}
                          Set as Default
                        </Text>
                      </Pressable>
                    </View>
                    <View>
                      {selectedAddress && selectedAddress._id === item._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          className="bg-emerald-800  mt-4 ml-14 rounded-full border-gray-400 border-2 items-center  p-2 w-48">
                          <Text className="text-white font-bold mb-2 text-center">
                            Deliver To this Address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <View>
                <Text className="text-black">Loading....</Text>
              </View>
            )}
          </Pressable>
        </View>
      )}

      {currentStep === 1 && (
        <View>
          <Text className="text-black font-bold mt-4 ml-3 text-lg">
            Choose Your Delivery Options
          </Text>
          <View className="flex-1 bg-white p-3 flex-row mt-5  ml-4 items-center justify-between mr-2">
            {option ? (
              <FontAwesome6
                onPress={() => setOption(!option)}
                name="circle-dot"
                size={24}
                color="black"
              />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={24}
                color="black"
              />
            )}

            <Text className="text-black ml-2">
              <Text className=" text-green-500">Tommorow by 10pm {''}</Text>
              Free Delivery with your prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            className="bg-yellow-500  mt-4 ml-14 rounded-full  border-1 items-center  p-2 w-48">
            <Text className="text-black  mb-2 text-center">
              Deliver To this Address
            </Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text
            className="text-black"
            style={{fontSize: 20, fontWeight: 'bold'}}>
            Select your payment Method
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'cash' ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption('cash')}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text className="text-black">Cash on Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'card' ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption('card');
                  Alert.alert('UPI/Debit card', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      // onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text className="text-black">UPI / Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text className="text-black">Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text
            className="text-black"
            style={{fontSize: 20, fontWeight: 'bold'}}>
            Order Now
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <View>
              <Text
                className="text-black"
                style={{fontSize: 17, fontWeight: 'bold'}}>
                Save 5% and never run out
              </Text>
              <Text
                className="text-black"
                style={{fontSize: 15, color: 'gray', marginTop: 5}}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text className="text-black">
              Shipping to {selectedAddress?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text
                className="text-black"
                style={{fontSize: 16, fontWeight: '500'}}>
                Items
              </Text>

              <Text className="text-black" style={{fontSize: 16}}>
                ₹{getTotalPrice()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text
                className="text-black"
                style={{fontSize: 16, fontWeight: '500'}}>
                Delivery
              </Text>

              <Text className="text-black" style={{fontSize: 16}}>
                ₹ 0
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text
                className="text-black"
                style={{fontSize: 20, fontWeight: 'bold'}}>
                Order Total
              </Text>

              <Text
                style={{color: '#C60C30', fontSize: 17, fontWeight: 'bold'}}>
                ₹{getTotalPrice()}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text className="text-black" style={{fontSize: 16}}>
              Pay With
            </Text>

            <Text
              className="text-black"
              style={{fontSize: 16, fontWeight: '600', marginTop: 7}}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text className="text-black">Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmtionScreen;
