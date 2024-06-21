import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-left" size={30} color="#000" />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="map-marker" size={30} color="#000" />
          <Icon name="shopping-cart" size={30} color="#000" />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      
      <View style={styles.productContainer}>
        <Image source={require('../assets/images/Home.png')} style={styles.image} />
        <Text style={styles.title}>Combo No Căng Bụng :</Text>
        <Text style={styles.subtitle}>02 Hamburger + 02 Khoai Tây.</Text>
        <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => setQuantity(Math.max(0, quantity - 1))} />
  <Text style={styles.quantity}>{quantity}</Text>
  <Button title="+" onPress={() => setQuantity(quantity + 1)} />
  <Text style={styles.price}>
    <Text style={{ textDecorationLine: 'line-through' }}>160,000Đ</Text>-145,000Đ
  </Text>
        </View>
      
        <Text style={styles.label}></Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Ghi chú"
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tổng Cộng:</Text>
          <View style={styles.buttonContainer}>
            <Button title="Thêm Vào Giỏ" color="#FFD700" onPress={() => {}} />
            <Button title="Thanh Toán Ngay" color="#FF0000" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 384,
    height: 45,
    left: 5,
    top: 60,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    backgroundColor: 'white',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
     width: '100%'
  },
  searchInput: {
    marginLeft: 5,
    flex: 1
  },
  productContainer: {
    padding: 10,
  },
  image: {
    width: 384,
    height: 318,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    
  },
  input: {
    width: 353,
    height: 63,
    width: '100%',
    
    
  },
  labelContainer: {
    backgroundColor: '#FFC0CB',
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  label: {
    fontSize: 20,
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default App;
