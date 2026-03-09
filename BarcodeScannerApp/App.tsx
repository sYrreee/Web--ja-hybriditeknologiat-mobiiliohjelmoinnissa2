import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('No barcode scanned yet');

 
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

 
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setBarcodeData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"], 
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Barcode: {barcodeData}</Text>
        {scanned && (
          <Button title={'SCAN AGAIN'} onPress={() => setScanned(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 4,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});