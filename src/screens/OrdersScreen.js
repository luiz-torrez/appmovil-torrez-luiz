import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns'; // Asegurate de instalar esto con `npm install date-fns`

// 🛒 Función para obtener pedidos
const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return [];
  }
};

// 🗓 Formatear fecha desde Firebase Timestamp
const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return 'Sin fecha';
  return format(timestamp.toDate(), 'dd/MM/yyyy HH:mm');
};

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>🆔 Pedido ID: {item.id}</Text>
            <Text style={styles.orderText}>👤 Cliente: {item.email || 'Sin nombre'}</Text>
            <Text style={styles.orderText}>💰 Total: ${item.total || '0.00'}</Text>
            <Text style={styles.orderText}>📅 Fecha: {formatDate(item.date)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default OrdersScreen;