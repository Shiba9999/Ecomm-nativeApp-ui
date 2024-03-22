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

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post('http://192.168.29.16:8000/register', user);
      const val = await res.data;
      if (val) {
        Alert.alert('Registration Succesfull');
        setEmail('');
        setName('');
        setPassword('');
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
            Create New Account
          </Text>
        </View>

        <View className="mt-10 ">
          <View className=" flex-row items-center gap-2  border border-black-100 mt-5  ">
            <Fontisto
              name="person"
              className="ml-3 text-gray-400"
              size={20}
              color="black"
            />
            <TextInput
              value={name}
              placeholderTextColor="black"
              onChangeText={setName}
              className="text-black  w-64"
              placeholder="Enter your Name"
            />
          </View>
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
              secureTextEntry={true}
              className="text-black mt-2 w-64"
              placeholder="Enter your password"
            />
          </View>
        </View>

        <View className="flex  flex-row items-center justify-between mt-5 ">
          <Text className="text-black">Keep me logged in</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleRegister()}
          className="w-72 mt-16 bg-yellow-500 ml-auto mr-auto px-5 py-5 rounded-full">
          <Text className="text-white text-center text-base font-bold">
            Signup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Login')}
          className="w-72 mt-7  ml-auto mr-auto px-5 py-5 ">
          <Text className="text-black text-center text-base ">
            Already Have An account ?{' '}
            <Text className="text-blue-800 text-base font-bold ml-2">
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
