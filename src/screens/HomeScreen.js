// import React, {useEffect} from 'react';
// import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons'; 
// import ItemListContainer from '../items/ItemListContainer';
// import CarritoScreen from './CarritoScreen';
// import MiPerfil from './MiPerfil';
// import OrdersScreen from './OrdersScreen';

// function HomeTab() {

//   useEffect(() => {
//     Alert.alert('¡Bienvenido!', 'Estás autenticado.');
//   }, []);


//   return (
//     <SafeAreaView style={styles.container}>
//       <ItemListContainer />
//     </SafeAreaView>
//   );
// }

// const Tab = createBottomTabNavigator();

// const HomeScreen = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Carrito') {
//             iconName = focused ? 'cart' : 'cart-outline';
//           } else if (route.name === 'MiPerfil') {
//             iconName = focused ? 'person' : 'person-outline';
//           }else if (route.name === 'Pedidos') {
//             iconName = focused ? 'list' : 'list-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#007AFF',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeTab} />
//       <Tab.Screen name="Carrito" component={CarritoScreen} />
//       <Tab.Screen name="MiPerfil" component={MiPerfil} />
//       <Tab.Screen name="Pedidos" component={OrdersScreen} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 1,
//   },
//   welcomeText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ItemListContainer from '../items/ItemListContainer';
import CarritoScreen from './CarritoScreen';
import MiPerfil from './MiPerfil';
import OrdersScreen from './OrdersScreen';

import { getItems } from '../firebase/config'; // Asegúrate que la ruta esté bien

// 🏠 HomeTab con buscador y productos de Firestore
function HomeTab() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Alert.alert('¡Bienvenido!', 'Estás autenticado.');
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getItems();
        setProducts(items);
        setFiltered(items);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        Alert.alert('Error', 'No se pudieron cargar los productos.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredItems = products.filter(product =>
      product.nombre?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredItems);
  }, [search, products]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar productos..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ItemListContainer productos={filtered} />
      )}
    </SafeAreaView>
  );
}

// Navegación principal
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Carrito') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'MiPerfil') iconName = focused ? 'person' : 'person-outline';
          else if (route.name === 'Pedidos') iconName = focused ? 'list' : 'list-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="MiPerfil" component={MiPerfil} />
      <Tab.Screen name="Pedidos" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;