import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import data from '../src/data/data.json';
import ProductCard from './components/ProductCard';


const ComboScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(data.products);

  const handleProductDetails = item => {
    navigation.navigate('PRODUCT_DETAILS', {item});
  };

  const toggleFavorite = item => {
    setProducts(
      products.map(prod => {
        if (prod.id === item.id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      }),
    );
  };

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.gradient}>
      <ImageBackground
        source={require('../img/img1.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.kIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("./components/arrowback.png")}
            style={styles.appBackIcon}
          />
          </TouchableOpacity>
          <View>
          <Image
            source={require("./components/Thongbao.png")}
            style={styles.appBackIcon}
          />
          </View>
          <TouchableOpacity onPress={handleCart}>
          <Image
            source={require("./components/shopping-cart.png")}
            style={styles.appBackIcon}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Combo bán chạy</Text>
        </View>
        <View style={styles.productListContainer}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={({item}) => (
              <ProductCard
                item={item}
                handleProductClick={handleProductDetails}
                toggleFavorite={toggleFavorite}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default ComboScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60, // Adjust marginTop for better alignment
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    top: 50,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  iconMenu: {
    position: 'absolute',
    left: 15,
  },
  kIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    position: 'absolute',
    top: 20,
  },
  icon: {
    padding: 10,
  },
  iconBack: {
    padding: 10,
  },
  productListContainer: {
    flex: 1,
    width: '100%',
    marginTop: 180, // Adjust marginTop to ensure it's below the header
  },
});
