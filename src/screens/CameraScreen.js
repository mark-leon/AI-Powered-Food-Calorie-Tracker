import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const SCAN_MODES = [
  { id: 'scan', label: 'Scan Food', icon: 'scan' },
  { id: 'barcode', label: 'Barcode', icon: 'barcode' },
  { id: 'label', label: 'Food Label', icon: 'list' },
  { id: 'library', label: 'Library', icon: 'images' },
];

const MOCK_DETECTIONS = [
  { label: 'Lettuce', x: '15%', y: '35%' },
  { label: 'Parmesan', x: '65%', y: '20%' },
  { label: 'Cherry Tomatoes', x: '10%', y: '72%' },
  { label: 'Croutons', x: '60%', y: '72%' },
];

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState('scan');
  const [scanning, setScanning] = useState(false);
  const [detections, setDetections] = useState([]);
  const cameraRef = useRef(null);

  const handleCapture = async () => {
    setScanning(true);
    setDetections([]);

    // Simulate AI detection
    await new Promise((r) => setTimeout(r, 1200));
    setDetections(MOCK_DETECTIONS);

    await new Promise((r) => setTimeout(r, 800));
    setScanning(false);

    const mockFood = {
      name: 'Caesar Salad with Cherry Tomatoes',
      calories: 330,
      protein: 8,
      carbs: 20,
      fat: 18,
      ingredients: [
        { name: 'Lettuce', calories: 20, amount: '1.5 cups' },
        { name: 'Cherry Tomatoes', calories: 35, amount: '6 pieces' },
        { name: 'Croutons', calories: 80, amount: '0.5 cups' },
        { name: 'Parmesan', calories: 110, amount: '2 tbsp' },
        { name: 'Caesar Dressing', calories: 85, amount: '2 tbsp' },
      ],
    };

    navigation.navigate('Nutrition', { food: mockFood });
  };

  const handleLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setScanning(true);
      await new Promise((r) => setTimeout(r, 1500));
      setScanning(false);

      const mockFood = {
        name: 'Grilled Salmon Bowl',
        calories: 550,
        protein: 35,
        carbs: 40,
        fat: 28,
        ingredients: [
          { name: 'Salmon', calories: 280, amount: '150g' },
          { name: 'Brown Rice', calories: 150, amount: '1 cup' },
          { name: 'Broccoli', calories: 55, amount: '1 cup' },
          { name: 'Olive Oil', calories: 65, amount: '1.5 tbsp' },
        ],
      };
      navigation.navigate('Nutrition', { food: mockFood });
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permTitle}>Camera Access Needed</Text>
        <Text style={styles.permSubtitle}>
          Cal AI needs your camera to scan food and estimate calories.
        </Text>
        <TouchableOpacity style={styles.permButton} onPress={requestPermission}>
          <Text style={styles.permButtonText}>Grant Access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <Text style={styles.logoIcon}>🍎</Text>
            <Text style={styles.logoText}>Cal AI</Text>
          </View>
          <TouchableOpacity style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>?</Text>
          </TouchableOpacity>
        </View>

        {/* Detections overlay */}
        {detections.map((d, i) => (
          <View
            key={i}
            style={[styles.detectionLabel, { left: d.x, top: d.y }]}
          >
            <View style={styles.dot} />
            <Text style={styles.detectionText}>{d.label}</Text>
          </View>
        ))}

        {/* Scanning indicator */}
        {scanning && (
          <View style={styles.scanningOverlay}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.scanningText}>Analyzing food...</Text>
          </View>
        )}
      </CameraView>

      {/* Bottom Controls */}
      <View style={styles.bottomPanel}>
        {/* Mode Selector */}
        <View style={styles.modeRow}>
          {SCAN_MODES.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.modeBtn, mode === m.id && styles.modeBtnActive]}
              onPress={() => {
                setMode(m.id);
                if (m.id === 'library') handleLibrary();
              }}
            >
              <Ionicons
                name={m.icon}
                size={18}
                color={mode === m.id ? '#1a1a1a' : '#888'}
              />
              <Text style={[styles.modeBtnText, mode === m.id && styles.modeBtnTextActive]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Capture Row */}
        <View style={styles.captureRow}>
          <TouchableOpacity style={styles.flashBtn}>
            <Ionicons name="flash-off" size={22} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
            <View style={styles.captureBtnInner} />
          </TouchableOpacity>
          <View style={{ width: 44 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 16,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoIcon: { fontSize: 18 },
  logoText: { color: 'white', fontSize: 18, fontWeight: '700' },
  detectionLabel: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
  },
  detectionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  scanningText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPanel: {
    backgroundColor: '#fff',
    paddingBottom: 36,
    paddingTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  modeBtn: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 3,
  },
  modeBtnActive: {
    backgroundColor: '#f0f0f0',
  },
  modeBtnText: {
    fontSize: 10,
    color: '#888',
    fontWeight: '500',
  },
  modeBtnTextActive: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 40,
  },
  flashBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a1a1a',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  permTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  permSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 16,
  },
  permButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  backBtn: {
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  backBtnText: {
    color: '#888',
    fontSize: 15,
  },
});
