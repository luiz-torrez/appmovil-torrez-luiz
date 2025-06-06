import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // ✅ Importa íconos de Expo
import ItemListContainer from '../items/ItemListContainer';
import CarritoScreen from './CarritoScreen';
import MiPerfil from './MiPerfil';
import OrdersScreen from './OrdersScreen';

function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido! Estás autenticado.</Text>
      <ItemListContainer />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'MiPerfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

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
    padding: 1,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;