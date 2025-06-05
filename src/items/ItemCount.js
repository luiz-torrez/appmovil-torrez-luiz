import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ItemCount = ({ cantidad, handleRestar, handleSumar, handleAgregar }) => {
  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <TouchableOpacity onPress={handleRestar} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>{cantidad}</Text>

        <TouchableOpacity onPress={handleSumar} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleAgregar} style={styles.addToCart}>
        <Text style={styles.addToCartText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCart: {
    backgroundColor: '#2e86de',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ItemCount;
