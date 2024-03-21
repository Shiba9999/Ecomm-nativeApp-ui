// import {
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   TextInput,
//   ImageBackground,
//   Dimensions,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useRoute} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {useSelector, useDispatch} from 'react-redux';
// import {addToCart} from '../redux/CartReducer';
// const ProductInfoScreen = () => {
//   const route = useRoute();
//   console.log(route.params);
//   const {
//     title,
//     color, //
//     size, //
//     offer,//
//     price,
//     oldPrice,//
//     id,
//     carouselImages ,//
//     image,
//   } = route.params;
//   const {width} = Dimensions.get('window');
//   const height = (width * 100) / 100;
//   const [addedToCart, setAddedToCart] = useState(false);
//   const dispatch = useDispatch();

//   const addItemToCart = item => {
//     dispatch(addToCart(item));
//     setAddedToCart(true);
//     setTimeout(() => {
//       setAddedToCart(false);
//     }, 1000);
//   };
//   return (
//     <ScrollView
//       className="mt-1 flex-1 bg-white"
//       showsVerticalScrollIndicator={false}>
//       <View className="bg-green-600 w-full h-20 rounded-md flex-row items-center">
//         <Pressable className="flex-row items-center bg-white w-80 ml-6">
//           <AntDesign
//             name="search1"
//             size={20}
//             color="black"
//             style={{
//               marginLeft: 10,
//             }}
//           />

//           <TextInput
//             placeholder="Search Amazon.in"
//             placeholderTextColor="black"
//             className="ml-5"
//           />
//         </Pressable>
//         <Feather
//           name="mic"
//           size={20}
//           color="black"
//           style={{
//             marginLeft: 10,
//             paddingRight: 10,
//           }}
//         />
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {carouselImages.map((item, index) => (
//           <ImageBackground
//             style={{
//               width,
//               height,
//               marginTop: 25,
//               resizeMode: 'contain',
//             }}
//             source={{uri: item}}
//             key={index}>
//             <View className="p-5 flex-row items-center justify-between">
//               <View className="w-10 h-10 rounded-full ml-2 bg-red-500 justify-center items-center flex-row">
//                 <Text className="text-white text-center">{offer}</Text>
//               </View>
//               <View>
//                 <AntDesign name="sharealt" size={20} color="black" />
//               </View>
//             </View>
//             <View className="mt-64 ml-10 w-8 h-8 rounded-full bg-gray-100 items-center justify-center ">
//               <AntDesign name="hearto" size={20} color="black" />
//             </View>
//           </ImageBackground>
//         ))}
//       </ScrollView>
//       <View className="p-3 mt-3">
//         <Text className="text-black text-base font-sans ">{title}</Text>
//         <Text className="text-black text-base font-bold mt-4 ">${price}</Text>

//         <View className="flex-row items-center mt-2 ">
//           <Text className="text-black font-bold">Color:</Text>
//           <Text className="text-black ">{color}</Text>
//         </View>

//         <View className="mt-3">
//           <Text className="text-black font-bold">Total:{price}</Text>
//           <Text className="text-black font-mono text-lg">
//             Free delivery by 3pm .Order within 10hrs
//           </Text>
//         </View>

//         <View className="flex-row mt-3">
//           <Entypo name="location" size={20} color="black" />
//           <Text className="text-black"> Deliver To mono -banglore 50029</Text>
//         </View>

//         <Text className="text-green-500 mt-4 ml-1 font-bold">IN STOCK</Text>

//         <Pressable
//           onPress={() => addItemToCart(route.params)}
//           className="bg-yellow-500 rounded-lg w-auto flex items-center justify-center mt-5 h-10">
//           {addedToCart ? (
//             <Text className="text-white">Added to cart</Text>
//           ) : (
//             <Text className="text-white">Add To Cart</Text>
//           )}
//         </Pressable>

//         <Pressable className="bg-yellow-600 rounded-lg w-auto flex items-center justify-center mt-5 h-10">
//           <Text className="text-white">Buy Now</Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProductInfoScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import HeaderScreen from './HeaderScreen';

const ProductInfoScreen = () => {
  const route = useRoute();
  const {
    title,
    color,
    size,
    offer,
    price,
    oldPrice,
    id,
    carouselImages,
    image,
  } = route.params;
  const {width} = Dimensions.get('window');
  const height = (width * 100) / 100;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = item => {
    dispatch(addToCart(item));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  return (
    <ScrollView
      className="mt-1 flex-1 bg-white"
      showsVerticalScrollIndicator={false}>
      <HeaderScreen />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {carouselImages ? (
          carouselImages.map((item, index) => (
            <ImageBackground
              style={{width, height, marginTop: 25, resizeMode: 'contain'}}
              source={{uri: item}}
              key={index}>
              <View className="p-5 flex-row items-center justify-between">
                {offer && (
                  <View className="w-10 h-10 rounded-full ml-2 bg-red-500 justify-center items-center flex-row">
                    <Text className="text-white text-center">{offer}</Text>
                  </View>
                )}
                <View>
                  <AntDesign name="sharealt" size={20} color="black" />
                </View>
              </View>
              <View className="mt-64 ml-10 w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                <AntDesign name="hearto" size={20} color="black" />
              </View>
            </ImageBackground>
          ))
        ) : (
          <Image
            style={{marginTop: 25, width, height, resizeMode: 'contain'}}
            source={{uri: image}}></Image>
        )}
      </ScrollView>

      <View className="p-3 mt-3">
        <Text className="text-black text-base font-sans">{title}</Text>
        <Text className="text-black text-base font-bold mt-4">${price}</Text>

        {color && (
          <View className="flex-row items-center mt-2">
            <Text className="text-black font-bold">Color:</Text>
            <Text className="text-black">{color}</Text>
          </View>
        )}

        <View className="mt-3">
          <Text className="text-black font-bold">Total:{price}</Text>
          <Text className="text-black font-mono text-lg">
            Free delivery by 3pm. Order within 10hrs
          </Text>
        </View>

        <View className="flex-row mt-3">
          <Entypo name="location" size={20} color="black" />
          <Text className="text-black"> Deliver To mono -banglore 50029</Text>
        </View>

        <Text className="text-green-500 mt-4 ml-1 font-bold">IN STOCK</Text>

        <Pressable
          onPress={() => addItemToCart(route.params)}
          className="bg-yellow-500 rounded-lg w-auto flex items-center justify-center mt-5 h-10">
          {addedToCart ? (
            <Text className="text-white">Added to cart</Text>
          ) : (
            <Text className="text-white">Add To Cart</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;
