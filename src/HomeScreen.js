import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../src/data/data.json';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from './components/ProductCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleMenu = () => {
    console.log('Menu Pressed');
    navigation.navigate('Menu');

  };
 const [data, setData] = useState([
    { id: '1', image: require('../assets/images/Home.png') },
    { id: '2', image: require('../assets/images/Home.png') },
    { id: '3', image: require('../assets/images/Home.png') },
    { id: '4', image: require('../assets/images/Home.png') },
    { id: '5', image: require('../assets/images/Home.png') },
  ]);

  const [products, setProducts] = useState(data.products);

  const handleProductDetails = item => {
    navigation.navigate('PRODUCT_DETAILS', { item });
  };

  const toggleFavorite = item => {
    setProducts(
      products.map(prod => {
        if (prod.id === item.id) {
          console.log('prod: ', prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      }),
    );
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOrder = () => {
    console.log('Order Pressed');
    navigation.navigate('Oder');
    
  };
  const handleCart = () => {
    console.log('Cart Pressed');
    navigation.navigate('Cart');
  };
  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.kIcon}>
        <Image
            source={require('../assets/images/Thongbao.png')}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'center',
            }}
          />
          <TouchableOpacity onPress={handleCart} >
          <Image
            source={require('../assets/images/shopping-cart.png')}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'center',
            }}
          />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../img/img.png')}
          style={[styles.ViewImg, { height: 70, borderRadius: 50 }]}
        />
        <Text style={styles.headerText}>Bá Lợi</Text>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.navigationButtons}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentIndex(currentIndex - 1)}
          >
            <Text>Previous</Text>
          </TouchableOpacity>
        )}
        {currentIndex < data.length - 1 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentIndex(currentIndex + 1)}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Image style={styles.image} source={require('../img/image9.png')} />
          <Text style={styles.menuText}>Khuyến Mãi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleMenu}>
          <Image style={styles.image} source={require('../img/image11.png')} />
          <Text style={styles.menuText}>Thực Đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image style={styles.image} source={require('../img/image10.png')} />
          <Text style={styles.menuText}>Đơn Hàng Gần Đây</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image style={styles.image} source={require('../img/store.png')} />
          <Text style={styles.menuText}>Cửa Hàng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.promotion}>
        <Text style={styles.promotionText}>
          Combo 02 Người 145K(02 Gà + 02 Mỳ ...)
        </Text>
        <Image style={styles.image} source={require('../img/mon_an_phu.png')} />
        <Text style={styles.promotionPrice}>145,000 ₫</Text>
        <TouchableOpacity style={styles.buyButton} onPress={handleOrder}>
          <Text style={styles.buyButtonText}>Mua Ngay</Text>
        </TouchableOpacity>
      </View>
       <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        shorizontalScrollIndicator={false}
      /> 
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5BF34',
  },
  header: {
    backgroundColor: '#C72A2A',
    position: 'absolute',
    height: 500,
    width: 400 * 2,
    borderRadius: width * 20,
    top: -width / 2,
    left: -width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: -180,
    marginTop: -40,
    fontWeight: 'bold',
    marginStart: -160,
  },
  kIcon: {
    flexDirection: 'row',
    paddingTop: 5,
    marginRight: -350,
  },
  ViewImg: {
    width: 120,
    marginLeft: -200,
    marginTop: -60,
  },
  sliderContainer: {
    marginTop: width / 2 - 135,
    alignItems: 'center',
  },
  sliderItem: {
    width: width - 20,
    height: height / 2.3,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
  },
  indicatorContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 9,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  activeIndicator: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  navigationButtons: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  navButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuItem: {
    backgroundColor: '#ED0B0B',
    width: '45%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: 60,
    height: 55,
    zIndex: 100,
  },
  menuText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  promotion: {
    backgroundColor: '#FFF',
    padding: 10,
    display: 'flex',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#ffff',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promotionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promotionPrice: {
    fontSize: 16,
    color: '#C72A2A',
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: '#ED0B0B',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default HomeScreen;
