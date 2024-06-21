// MenuApp/components/MenuScreen.js
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const MenuScreen = () => {
  const navigation = useNavigation();
  const handleCombo = () => {
    console.log('Combo Pressed');
    navigation.navigate('Combo');
  };
  const handleCart = () => {
    navigation.navigate('Cart');
  };
  return (
    <ScrollView contentContainerStyle={styles.menuContainer}>
      <View
        style={{
          backgroundColor: '#ED0B0B',
          flex: 1,
          height: 150,
          width: 412,
          top: -20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View style={styles.kIcon}>
          <View>
            <Image
              source={require('./components/Thongbao.png')}
              style={styles.icon}
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleCart}>
              <Image
                source={require('./components/shopping-cart.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.Textheader}>Thực Đơn</Text>
        </View>
      </View>
      <View style={styles.menuGrid}>
        <View style={[styles.menuItem, styles.orange]}>
          <Image style={styles.image} source={require('../img/ga_ran.png')} />
          <Text style={styles.text}>Gà rán</Text>
        </View>
        <TouchableOpacity
          style={[styles.menuItem, styles.red]}
          onPress={handleCombo}>
          <Image
            style={styles.image}
            source={require('../img/combo_ban_chay.png')}
          />
          <Text style={styles.text}>Combo bán chạy</Text>
        </TouchableOpacity>
        <View style={[styles.menuItem, styles.red]}>
          <Image style={styles.image} source={require('../img/my_y.png')} />
          <Text style={styles.text}>Mỳ ý</Text>
        </View>
        <View style={[styles.menuItem, styles.orange]}>
          <Image
            style={styles.image}
            source={require('../img/mon_an_phu.png')}
          />
          <Text style={styles.text}>Món ăn phụ</Text>
        </View>
        <View style={[styles.menuItem, styles.orange]}>
          <Image
            style={styles.image}
            source={require('../img/hamburger.png')}
          />
          <Text style={styles.text}>Hamburger</Text>
        </View>
        <View style={[styles.menuItem, styles.red]}>
          <Image style={styles.image} source={require('../img/drink.png')} />
          <Text style={styles.text}>Thức uống</Text>
        </View>
        <View style={[styles.menuItem, styles.red]}>
          <Image
            style={styles.image}
            source={require('../img/mon_trang_mieng.png')}
          />
          <Text style={styles.text}>Món tráng miệng</Text>
        </View>
        <View style={[styles.menuItem, styles.orange]}>
          <Text style={styles.text}>Khác ...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 133,
    height: 90,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
  orange: {
    backgroundColor: 'orange',
  },
  red: {
    backgroundColor: 'red',
  },
  Textheader: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  kIcon: {
    flexDirection: 'row',
    left: 320,
    top: -7,
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 10,
    marginTop: 25,
  },
});

export default MenuScreen;
