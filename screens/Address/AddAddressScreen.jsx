import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderScreen from '../Home/HeaderScreen';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddresses] = useState([]);

  const userId = useSelector(state => state.user.userId);

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
      console.log('error address', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mt-1">
      <HeaderScreen />
      <View className="p-2">
        <Text className="font-bold text-lg text-black ml-5">Your Address</Text>

        <Pressable
          onPress={() => navigation.navigate('Add')}
          className="mt-4 flex-row items-center justify-between py-2 px-4 border-2 m-5 border-blue-300 ">
          <Text className="text-black">Add New Address</Text>
          <Feather name="arrow-right" size={24} color="blue" />
        </Pressable>

        <Pressable className="mt-9 flex-1 flex ">
          {address && address.addresses && address.addresses.length > 0 ? (
            address.addresses.map((item, index) => (
              <View
                key={index}
                className=" rounded-lg overflow-hidden m-5 border-2 border-blue-400 ">
                <View className="p-2 ml-3">
                  <Text className="text-xl font-bold text-gray-800 mb-4">
                    {item.name}
                  </Text>
                  <Text className="text-gray-600 mb-6">
                    {' '}
                    {item.houseNo} , {item.landmark}
                  </Text>
                  <Text className="text-base font-bold text-gray-800 mb-6">
                    {item.street}
                  </Text>
                  <Text className="text-base font-bold text-gray-800 mb-6">
                    {item.country}
                  </Text>
                  <Text className="text-base font-bold text-gray-800 mb-6">
                    {item.mobileNo}
                  </Text>
                  <Text className="text-base  text-gray-800 mb-6">
                    {item.postalCode}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text className="text-black">Loading....</Text>
            </View>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
