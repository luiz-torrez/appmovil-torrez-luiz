import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';

const ItemList = ({ product }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const handleRestar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleSumar = () => {
    if (cantidad < product.stock) setCantidad(cantidad + 1);
  };

  return (
    <View style={styles.card}>
      {/* Imagen a la izquierda */}
      <Image source={{ uri: product.img }} style={styles.image} />
      
      {/* Detalles a la derecha */}
      <View style={styles.details}>
        <Text style={styles.title}>{product.nombre}</Text>
        <Text>Categoría: {product.category}</Text>
        <Text>Precio: ${product.precio}</Text>
        <ItemCount
          cantidad={cantidad}
          handleSumar={handleSumar}
          handleRestar={handleRestar}
          handleAgregar={() => agregarAlCarrito(product, cantidad)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // 👈 cambia a diseño horizontal
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center', // centra verticalmente la imagen y los detalles
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
    borderColor: 'grey',
    backgroundColor: '#dcdcdc',
    borderWidth: 1,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
});

export default ItemList; 