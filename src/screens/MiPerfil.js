import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function MiPerfil() {
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      Alert.alert('No hay usuario logueado');
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      try {
        const userRef = doc(db, 'miperfil', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setImageBase64(docSnap.data().photoBase64);
        }
      } catch (e) {
        Alert.alert('Error al cargar la imagen', e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [user]);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso para usar la cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.4,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      saveImage(base64Image);
    }
  };

  const saveImage = async (base64) => {
    try {
      setLoading(true);
      const userRef = doc(db, 'miperfil', user.uid);
      await setDoc(userRef, { photoBase64: base64 });
      setImageBase64(base64);
      Alert.alert('Foto guardada con éxito');
    } catch (e) {
      Alert.alert('Error al guardar la imagen', e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Mi Perfil</Text>

      {imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
        />
      ) : (
        <Text>No tienes foto guardada</Text>
      )}

      <Button title="Sacar Foto con Cámara" onPress={takePhoto} />
    </View>
  );
}