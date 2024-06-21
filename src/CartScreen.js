import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "./utils/fonts";

const CartScreen = ({ cartItems, deleteCartItem, updateQuantity }) => {
  const handleQuantityChange = async (id, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
          deleteCartItem(id);
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null);

    updateQuantity(updatedItems); 
  };

  const handleCheckout = () => {

    console.log("Proceed to checkout!");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Giá: {(item.price * item.quantity).toFixed(2)}</Text>
              <Text style={styles.quantity}>Số lượng: </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.button}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.button}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => deleteCartItem(item.id)}>
                <Image source={require("./components/delete.png")} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng Tiền: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    marginVertical: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.medium,
    color: "#444444",
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: "#797979",
    fontWeight: "700",
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#E96E6E',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  deleteIcon: {
    height: 30,
    width: 30,
    marginTop: 10,
  },
  totalContainer: {
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#E96E6E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
