import {Alert, Pressable} from 'react-native';
import {View, Text, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
const Address = () => {
  const [country, setCountry] = useState('India');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandMark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const userId = useSelector(state => state.user.userId);

  const navigation = useNavigation();
  async function handleAddAddress() {
    const address = {
      country,
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    try {
      const res = await axios.post('http://192.168.29.16:8000/address', {
        address,
        userId,
      });
      if (res) {
        Alert.alert('Address Added Successfully');
        const val = await res.data;
        setName('');
        setStreet('');
        setPostalCode('');

        setLandMark('');
        setMobileNo('');
        setHouseNo('');

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (err) {
      console.log('my err', err);
    }
  }
  return (
    <ScrollView className="mt-2 ">
      <View className="p-3">
        <Text className="text-black text-lg font-bold font-sans">
          Add a new Address
        </Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          placeholder="India"
          placeholderTextColor={'gray'}
          className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
        />

        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            Full name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter Your Name"
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>

        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            Mobile Number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholder="Enter Your Mobile Number"
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>

        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            Flat,House no,Building ,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={setHouseNo}
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>

        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            Area,Street,Sector,Village
          </Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>
        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            LandMark
          </Text>
          <TextInput
            value={landmark}
            onChangeText={setLandMark}
            placeholder="Eg near school"
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>

        <View className="mt-2">
          <Text className="text-black text-md  font-bold font-sans">
            Enter Pincode
          </Text>
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter Pincode"
            placeholderTextColor={'gray'}
            className="p-2 mt-4 border-2 border-gray-500 rounded-md text-black"
          />
        </View>
        <Pressable
          onPress={handleAddAddress}
          className="bg-yellow-500 rounded-full p-2 mt-6 items-center justify-center w-full h-12 ">
          <Text className="text-white text-md font-bold font-sans">
            Add Address
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Address;
