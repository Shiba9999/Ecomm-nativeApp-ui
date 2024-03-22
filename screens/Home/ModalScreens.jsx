import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios';
const ModalScreens = ({
  modalVisible,
  toggleModdalVisible,
  setSelectedAddress,
  userId,
}) => {

  console.log("userId from modal screen",userId);
  const navigation = useNavigation();

  const [address, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
        const response = await axios.get(
          `http://192.168.29.16:8000/addresses/${userId}`,
        );
        const data = await response.data;
        console.log("data from modal screen",data);
        setAddresses(data);
        setLoading(false);
      
    } catch (error) {
      console.log('error from modal screen', error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (modalVisible) {
      fetchData();
    }
  }, [modalVisible]);



  
  return (
    <BottomModal
      onBackdropPress={() => toggleModdalVisible(!modalVisible)}
      visible={modalVisible}
      swipeDirection={['up', 'down']}
      swipeThreshold={100}
      modalAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }
      onHardwareBackPress={() => toggleModdalVisible(!modalVisible)}
      onTouchOutside={() => toggleModdalVisible()}>
      <ModalContent
        style={{
          width: '100%',
          height: 400,
        }}>
        <View className="flex-row justify-between">
          <Text className="text-black font-bold">Choose Your Location</Text>
          <Entypo
            onPress={() => toggleModdalVisible()}
            name="cross"
            size={24}
            color="black"
          />
        </View>
        <View className="mb-5">
          <Text className="text-black mt-3 text-base ">
            Select a delivery location to see availability{' '}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 5,
            paddingRight: 10,
          }}>
          {loading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16}}>Loading....</Text>
            </View>
          ) : (
            <>
              {address.addresses.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedAddress(item)}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginHorizontal: 5,
                    marginRight:
                      index !== address.addresses.length - 1 ? 10 : 5,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{color: 'black', fontSize: 14, marginRight: 5}}>
                      {item.name}
                    </Text>
                    <Entypo name="location-pin" size={20} color="red" />
                  </View>
                  <Text style={{color: 'black', marginBottom: 5}}>
                    {item.houseNo}, {item.landmark}
                  </Text>
                  <Text style={{color: 'black', marginBottom: 5}}>
                    {item.street}
                  </Text>
                  <Text style={{color: 'black', marginBottom: 5}}>
                    {item.country}
                  </Text>
                </Pressable>
              ))}
            </>
          )}

          <Pressable
            onPress={() => {
              toggleModdalVisible(false);
              navigation.navigate('Address');
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              borderColor: 'gray',
              borderWidth: 1,
              marginHorizontal: 5,
              marginRight: 5,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#007bff', fontSize: 16, textAlign: 'center'}}>
              Add an Address or pick up view
            </Text>
          </Pressable>
        </ScrollView>

        <View className="flex-col  ">
          <View className="flex-row items-center gap-2">
            <Entypo name="location-pin" size={24} color="black" />
            <Text className="text-sky-600">Enter an pincode</Text>
          </View>

          <View className="flex-row items-center gap-2 mt-1">
            <MaterialIcons name="location-searching" size={24} color="black" />
            <Text className="text-sky-600">use my current location</Text>
          </View>

          <View className="flex-row items-center gap-2 mt-1">
            <Fontisto name="world-o" size={24} color="black" />
            <Text className="text-sky-600">Deliver outside india</Text>
          </View>
        </View>
      </ModalContent>
    </BottomModal>
  );
};

export default ModalScreens;
