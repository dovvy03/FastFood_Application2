import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../src/utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductDetailsScreen = ({ cartItems, setCartItems }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState("M");

  const calculatePrice = (basePrice, size) => {
    if (size === "L") {
      return basePrice + 10;
    }
    return basePrice;
  };

  const handleAddToCart = () => {
    const price = calculatePrice(product.price, selectedSize);
    const existingProductIndex = cartItems.findIndex(item => 
      item.id === product.id && item.size === selectedSize);

    if (existingProductIndex !== -1) {
    
      let updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      updatedCartItems[existingProductIndex].price = updatedCartItems[existingProductIndex].quantity * price;
      setCartItems(updatedCartItems);
    } else {
      const productToAdd = { ...product, size: selectedSize, price: price, quantity: 1 };
      setCartItems([...cartItems, productToAdd]);
    }
    navigation.navigate("Cart", { cartItems: cartItems });
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.coverImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fontText}>{product.title}</Text>
          <Text style={styles.fontText}>${calculatePrice(product.price, selectedSize)}</Text>
        </View>
        <Text style={[styles.fontText, styles.sizeText]}>Size</Text>
        <View style={styles.sizeContainer}>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("M")}
          >
            <Text style={[styles.sizeValueText, selectedSize === "M" && styles.selectedText]}>
              Vừa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("L")}
          >
            <Text style={[styles.sizeValueText, selectedSize === "L" && styles.selectedText]}>
              Lớn(+10$)
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});
