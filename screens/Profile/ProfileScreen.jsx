import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import HeaderScreen from '../Home/HeaderScreen';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const userId = useSelector(state => state.user.userId);
  const [profileName, setProfileName] = useState(' ');
  const [myOrders, setMyOrders] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');

      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.16:8000/profile/${userId}`,
      );
      setProfileName(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.16:8000/orders/${userId}`,
      );
      setMyOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchOrder();
  }, []);
  return (
    <ScrollView>
      <HeaderScreen />
      {profileName ? (
        <View
          onPress={fetchUserProfile}
          className=" rounded-lg w-auto flex ml-3 mt-4 h-10">
          <Text className="text-black font-bold text-lg">
            {' '}
            welcome {profileName?.name}
          </Text>
        </View>
      ) : null}
      <View>
        <Text className="text-black font-bold text-lg mt-3 ml-12">
          Your Orders
        </Text>
      </View>

      <View>
        {loading ? (
          <View>
            <Text className="text-black">Loading</Text>
          </View>
        ) : (
          <View className="mt-10">
            {myOrders.length > 0 ? (
              myOrders.map((eachOrder, index) =>
                eachOrder.products.map((eachProduct, index) => (
                  <View
                    key={index}
                    className="mx-auto mt-1 mb-5 w-80 rounded-lg overflow-hidden shadow-md duration-300  bg-white">
                    <Image
                      source={{uri: eachProduct.image}}
                      className="h-48 w-full object-cover object-center"
                      style={{resizeMode: 'contain'}}
                      alt="Product Image"
                    />
                    <View className="p-4 bg-white">
                      <Text className="mb-2 text-lg font-medium text-black">
                        {eachProduct.name}
                      </Text>
                      <Text className="mb-2 text-base text-black ">
                        ${eachProduct.price}
                      </Text>
                    </View>
                  </View>
                )),
              )
            ) : (
              <View>
                <Text>No orders to show</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <Pressable
        onPress={handleLogout}
        className="bg-yellow-500 rounded-lg w-[50%] ml-24  flex items-center justify-center mt-9  h-10">
        <Text className="text-white ">Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;
