import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleUpdatePassword = async () => {
    const user = {
      email: email,

      newPassword: newPassword,
    };

    try {
      const res = await axios.post(
        'http://192.168.29.16:8000/forgotPassword',
        user,
      );
      const val = await res.data;
  
        if (val) {
          Alert.alert('Password changed Successfully'); 
          setEmail('');
          setNewPassword('');
          navigation.navigate('Login');
        }
    } catch (err) {
      console.log('my err', err);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View>
        <Image
          className="w-44 h-10 mt-8"
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View className="items-center">
          <Text className="text-xl text-black font-sans mt-7 ">
            Update Your Password
          </Text>
        </View>

        <View className="mt-4 ">
          <View className=" flex-row items-center gap-2  border mt-5  ">
            <MaterialCommunityIcons
              name="gmail"
              className="ml-3 text-gray-400"
              size={20}
              color="black"
            />
            <TextInput
              value={email}
              placeholderTextColor="black"
              onChangeText={setEmail}
              className="text-black mt-2 w-64"
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View className="mt-2 ">
          <View className=" flex-row items-center gap-2  border border-black-100 mt-5  ">
            <Fontisto
              name="person"
              className="ml-3 text-gray-400"
              size={20}
              color="black"
            />
            <TextInput
              value={newPassword}
              placeholderTextColor="black"
              onChangeText={setNewPassword}
              className="text-black  w-64"
              placeholder="Enter your New Password"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleUpdatePassword()}
          className="w-72 mt-16 bg-yellow-500 ml-auto mr-auto px-5 py-5 rounded-full">
          <Text className="text-white text-center text-base font-bold">
            Update Password
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
