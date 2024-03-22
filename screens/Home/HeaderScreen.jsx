import {View, TextInput, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const HeaderScreen = () => {
  return (
    <View className="bg-teal-200 w-full h-16  rounded-md flex-row items-center">
      <Pressable className="flex-row items-center rounded-full bg-white w-80 ml-6">
        <AntDesign
          name="search1"
          size={20}
          color="black"
          style={{
            marginLeft: 10,
          }}
        />

        <TextInput
          placeholder="Search Amazon.in"
          placeholderTextColor="black"
          className="ml-5 "
        />
      </Pressable>
      <Feather
        name="mic"
        size={20}
        color="black"
        style={{
          marginLeft: 10,
          paddingRight: 10,
        }}
      />
    </View>
  );
};

export default HeaderScreen;
