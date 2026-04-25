import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef<any>(null);

  if (!permission || !mediaPermission) return <View />;

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Потрібен дозвіл на використання камери та галереї
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => { requestPermission(); requestMediaPermission(); }}
        >
          <Text style={styles.permissionButtonText}>Надати дозволи</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Робимо фото
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsCameraOpen(false);
      
      // Зберігаємо в галерею
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      Alert.alert('Успіх', 'Фото збережено у галерею!');
    }
  };

  // Вибираємо з галереї
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  if (isCameraOpen) {
    return (
      <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>Зробити фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraOpen(false)}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Немає фото</Text>
        </View>
      )}

      <TouchableOpacity style={styles.primaryButton} onPress={() => setIsCameraOpen(true)}>
        <Text style={styles.primaryButtonText}>Відкрити камеру</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
        <Text style={styles.primaryButtonText}>Вибрати з галереї</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  permissionButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  captureButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 50,
  },
  captureButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 16,
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: '50%',
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6b7280',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#22c55e',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});