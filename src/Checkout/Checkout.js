import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Asegúrate de que tu archivo db.js exporta correctamente `db`

const Checkout = () => {
  const [pedidoId, setPedidoId] = useState('');
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const comprar = async () => {
    if (!form.nombre || !form.email || !form.telefono) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const pedido = {
      cliente: form,
      productos: carrito,
      total: precioTotal(),
      date: new Date(),
    };

    try {
      const pedidosRef = collection(db, 'orders');
      const doc = await addDoc(pedidosRef, pedido);
      setPedidoId(doc.id);
      vaciarCarrito();
      Alert.alert('¡Compra realizada!', `ID de pedido: ${doc.id}`);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al realizar la compra.');
      console.error(error);
    }
  };

  if (pedidoId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Gracias por tu compra!</Text>
        <Text>Tu número de pedido es: {pedidoId}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar compra</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={form.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        placeholder="Teléfono"
        style={styles.input}
        value={form.telefono}
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange('telefono', text)}
      />

      <Button title="Comprar" onPress={comprar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
});

export default Checkout;
