import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../utils/fonts";

const CartCard = ({ item, handleDelete }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.details}>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
            <Image
              source={require("../components/delete.png")}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",  // Centering items vertically within the card
  },
  image: {
    height: 125,
    width: 100,  // Adjust width to fit content better
    resizeMode: "contain",
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingLeft: 10,  // Space between image and content
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.medium,
    color: "#444444",
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#797979",
    marginVertical: 5,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",  // Ensuring size and delete button are aligned vertically
  },
  sizeContainer: {
    backgroundColor: "#FFFFFF",
    height: 32,
    width: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,  
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fonts.medium,
  },
  deleteButton: {
    padding: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});
