import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {decode} from 'base-64';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCarousel from './ImageCarousel';
import axios from 'axios';
import ProductItem from './ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DealScreen from './DealScreen';
import ListScreen from './ListScreen';
import {useSelector, useDispatch} from 'react-redux';
import ModalScreens from './ModalScreens';
import HeaderScreen from './HeaderScreen';
import {setUserId} from '../../redux/UserReducer';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);

  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.userId);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  async function fetchProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (err) {
      console.log('err', err);
    }
  }

  async function fetchUser() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(decode(tokenParts[1]));
        const userId = payload.id;
        dispatch(setUserId(userId));
      } else {
        console.log('Token not found');
      }
    } catch (error) {
      console.log('Error decoding token:', error);
    }
  }

  console.log('userId from home', userId);

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  const images = [
    {
      uri: 'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    },
    {
      uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    },
    {
      uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    },
  ];
  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
      offer: '72% off',
      price: 4500,
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
      offer: '72% off',
      price: 4500,
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
      offer: '72% off',
      price: 4500,
    },
    {
      id: '50',
      offer: '72% off',
      price: 4500,
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  function handleAddressChange(newAddress) {
    setSelectedAddress(newAddress);
  }
  return (
    <>
      <SafeAreaView className="flex-1 bg-white pt-1 ">
        <ScrollView>
          <HeaderScreen />
          <Pressable
            onPress={toggleModal}
            className="bg-teal-100 rounded-md flex-row  p-3  ">
            <EvilIcons name="location" size={24} color="black" />
            <Pressable onPress={toggleModal} className="ml-3">
              {selectedAddress ? (
                <Text className="text-black text-sm font-sans ">
                  {selectedAddress.name} - {selectedAddress.street}
                </Text>
              ) : (
                <Text className="text-black text-sm font-sans ">
                  Deliver to mano bengaluru 560021
                </Text>
              )}
            </Pressable>
            <MaterialIcons
              name="arrow-drop-down"
              size={24}
              color="black"
              style={{
                marginLeft: 10,
              }}
            />
          </Pressable>

          <ListScreen />

          <ImageCarousel images={images} />

          <Text className="text-black text-lg ml-3 font-bold font-sans">
            Trending Deal of the week
          </Text>
          <View className="flex-row items-center flex-wrap">
            {deals.map((item, index) => (
              <Pressable
                onPress={() => navigation.navigate('Info', item)}
                key={item?.id}
                className="bg-white rounded-md p-3 m-2 ">
                <Image
                  source={{uri: item.image}}
                  style={{width: 150, height: 150}}
                />
              </Pressable>
            ))}
          </View>
          <Text className="h-1 border-gray-200 border-2 mt-4" />

          <Text className="p-3 text-black text-lg font-bold ">
            Today's Deal
          </Text>

          <DealScreen />

          <Text className="h-1 border-gray-200 border-2 mt-4" />

          <SafeAreaView className="w-44 flex-1 ml-6 mt-8">
            <DropDownPicker
              open={open}
              value={category}
              items={items}
              placeholder="choose category"
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
            />
          </SafeAreaView>

          <View>
            {products.length > 0 ? (
              <View className=" flex-row items-center  flex-wrap">
                {products
                  ?.filter(item => item.category === category)
                  .map((item, index) => (
                    <ProductItem item={item} key={index} />
                  ))}
              </View>
            ) : (
              <Text className="text-black font-bold ml-10">Loading...</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <View>
        <ModalScreens
          selectedAddress={selectedAddress}
          setSelectedAddress={handleAddressChange}
          modalVisible={modalVisible}
          toggleModdalVisible={toggleModal}
          userId={userId}
          
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
});
