import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemListContainer from '../items/ItemListContainer';
import CarritoScreen from './CarritoScreen';
import MiPerfil from './MiPerfil';

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="MiPerfil" component={MiPerfil} />
      
      {/* Aquí puedes agregar más tabs si lo necesitas */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:1,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
