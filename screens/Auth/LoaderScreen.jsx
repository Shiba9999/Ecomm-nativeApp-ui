import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const LoaderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);

  return (
    <View className=" w-full h-full items-center justify-center">
      <Image
        className="w-48 h-16 mt-8"
        source={{
          uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
        }}
      />
    </View>
  );
};

export default LoaderScreen;
