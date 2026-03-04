import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PHOTO_THUMBNAILS = [
  { id: '1', emoji: '🏖️', weight: 355, date: 'Sep 20, 2023' },
  { id: '2', emoji: '🍂', weight: 320, date: 'Dec 1, 2023' },
  { id: '3', emoji: '❄️', weight: 290, date: 'Feb 15, 2024' },
  { id: '4', emoji: '🌸', weight: 250, date: 'Apr 22, 2024' },
  { id: '5', emoji: '☀️', weight: 220, date: 'Jun 30, 2024' },
  { id: '6', emoji: '🌿', weight: 200, date: 'Sep 5, 2024' },
  { id: '7', emoji: '🏠', weight: 182, date: 'Jul 7, 2025' },
];

export default function CompareScreen({ navigation }) {
  const [hideWeight, setHideWeight] = useState(false);
  const [beforeIdx, setBeforeIdx] = useState(0);
  const [afterIdx, setAfterIdx] = useState(6);

  const before = PHOTO_THUMBNAILS[beforeIdx];
  const after = PHOTO_THUMBNAILS[afterIdx];

  const diff = before.weight - after.weight;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Compare Photos */}
        <View style={styles.photosRow}>
          {/* Before */}
          <View style={styles.photoCard}>
            <View style={styles.photoPlaceholder}>
              <Text style={{ fontSize: 64 }}>{before.emoji}</Text>
              <View style={styles.photoOverlay}>
                {!hideWeight && (
                  <>
                    <Text style={styles.photoWeight}>{before.weight} lbs</Text>
                    <Text style={styles.photoDate}>{before.date}</Text>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* After */}
          <View style={[styles.photoCard, styles.photoCardActive]}>
            <View style={styles.photoPlaceholder}>
              <Text style={{ fontSize: 64 }}>{after.emoji}</Text>
              <View style={styles.photoOverlay}>
                {!hideWeight && (
                  <>
                    <Text style={styles.photoWeight}>{after.weight} lbs</Text>
                    <Text style={styles.photoDate}>{after.date}</Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Diff Badge */}
        {!hideWeight && (
          <View style={styles.diffBadge}>
            <Ionicons name="trending-down" size={18} color="#4caf50" />
            <Text style={styles.diffText}>
              -{diff} lbs lost in your journey! 🎉
            </Text>
          </View>
        )}

        {/* Hide Weight Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Hide weight</Text>
          <Switch
            value={hideWeight}
            onValueChange={setHideWeight}
            trackColor={{ false: '#e0e0e0', true: '#ccc' }}
            thumbColor={hideWeight ? '#fff' : '#fff'}
          />
        </View>

        {/* Thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbsRow}
        >
          {PHOTO_THUMBNAILS.map((photo, i) => {
            const isSelected = i === beforeIdx || i === afterIdx;
            const isAfter = i === afterIdx;
            return (
              <TouchableOpacity
                key={photo.id}
                style={[
                  styles.thumb,
                  isSelected && styles.thumbSelected,
                  isAfter && styles.thumbAfter,
                ]}
                onPress={() => {
                  if (i !== afterIdx) setBeforeIdx(i);
                  else setAfterIdx(i);
                }}
              >
                <Text style={{ fontSize: 28 }}>{photo.emoji}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Share Button */}
      <View style={styles.shareContainer}>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => Alert.alert('Share', 'Your progress photo has been shared!')}
        >
          <Ionicons name="share-outline" size={20} color="white" />
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#1a1a1a' },
  photosRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  photoCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  photoCardActive: {
    borderWidth: 3,
    borderColor: '#1a1a1a',
    borderRadius: 16,
  },
  photoPlaceholder: {
    height: (width - 40) / 2,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  photoWeight: { color: 'white', fontSize: 18, fontWeight: '800' },
  photoDate: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 1 },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    backgroundColor: '#f0fff4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  diffText: { fontSize: 14, color: '#388e3c', fontWeight: '600', flex: 1 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  toggleLabel: { fontSize: 16, color: '#1a1a1a' },
  thumbsRow: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbSelected: {
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  thumbAfter: {
    borderColor: '#1a1a1a',
    backgroundColor: '#f0f0f0',
  },
  shareContainer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  shareBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
