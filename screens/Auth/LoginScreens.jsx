import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreens = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.navigate('Main');
        } else {
          navigation.navigate('Register');
        }
      } catch (err) {
        console.log('my err', err);
      }
    };
    checkLoginStatus();
  }, []);

  async function handleLogin() {
    const user = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post('http://192.168.29.16:8000/login', user);
      const val = await res.data;
      const {token} = val;
      await AsyncStorage.setItem('authToken', token);
      setEmail('');
      setPassword('');
      navigation.navigate('Main');
    } catch (err) {
      console.log('my err', err);
    }
  }

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
            Login into your account
          </Text>
        </View>

        <View className="mt-10 ">
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
          <View className=" flex-row items-center gap-2  border mt-5  ">
            <Feather
              name="lock"
              className="ml-3 text-gray-400"
              size={20}
              color="black"
            />
            <TextInput
              value={password}
              placeholderTextColor="black"
              onChangeText={setPassword}
              className="text-black mt-2 w-64"
              placeholder="Enter your password"
            />
          </View>
        </View>

        <View className="flex  flex-row items-center justify-between mt-5 ">
          <Text className="text-black">Keep me logged in</Text>
          <Text
            onPress={() => navigation.navigate('UpdatePassword')}
            className="text-blue-600">
            Forget password
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleLogin()}
          className="w-72 rounded-full mt-16 bg-yellow-500 ml-auto mr-auto px-5 py-5 ">
          <Text className="text-white text-center text-base font-bold">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Register')}
          className="w-72 mt-7  ml-auto mr-auto px-5 py-5 ">
          <Text className="text-black text-center text-base ">
            Don't Have An account ?{' '}
            <Text className="text-blue-800 text-base font-bold">Signup</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreens;
