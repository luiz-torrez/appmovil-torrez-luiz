import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';

const CarritoScreen = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const navigation = useNavigation();

  const handleVaciar = () => {
    Alert.alert('Carrito', 'Productos eliminados del carrito.');
    vaciarCarrito();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Carrito</Text>

      {carrito.length > 0 ? (
        <>
          {carrito.map((prod) => (
            <View key={prod.id} style={styles.productCard}>
              <Text style={styles.productName}>{prod.nombre}</Text>
              <Text>Precio unit: ${prod.precio}</Text>
              <Text>Precio total: ${prod.precio * prod.cantidad}</Text>
              <Text>Cantidad: {prod.cantidad}</Text>
            </View>
          ))}

          <Text style={styles.total}>Precio total: ${precioTotal()}</Text>
          <Button title="Vaciar carrito" onPress={handleVaciar} color="red" />
          <Button title="Finalizar compra" onPress={() => navigation.navigate('Checkout')} />

        </>
      ) : (
        <Text style={styles.empty}>El carrito está vacío :(</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productCard: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  total: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 18,
    color: 'gray',
  },
});

export default CarritoScreen;
