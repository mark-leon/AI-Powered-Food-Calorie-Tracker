import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SETTINGS_SECTIONS = [
  {
    title: 'Goals',
    items: [
      { icon: '🎯', label: 'Daily Calorie Goal', value: '2500 cal', type: 'navigate' },
      { icon: '⚖️', label: 'Target Weight', value: '140 lbs', type: 'navigate' },
      { icon: '🏃', label: 'Activity Level', value: 'Moderate', type: 'navigate' },
    ],
  },
  {
    title: 'Nutrition',
    items: [
      { icon: '🍗', label: 'Protein Goal', value: '150g', type: 'navigate' },
      { icon: '🌾', label: 'Carbs Goal', value: '275g', type: 'navigate' },
      { icon: '💧', label: 'Fat Goal', value: '70g', type: 'navigate' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: '🔔', label: 'Meal Reminders', value: true, type: 'toggle' },
      { icon: '📊', label: 'Weekly Report', value: true, type: 'toggle' },
      { icon: '🌙', label: 'Dark Mode', value: false, type: 'toggle' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Profile', type: 'navigate' },
      { icon: '🔒', label: 'Privacy', type: 'navigate' },
      { icon: '💬', label: 'Feedback', type: 'navigate' },
      { icon: '⭐', label: 'Rate Cal AI', type: 'navigate' },
    ],
  },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState({
    'Meal Reminders': true,
    'Weekly Report': true,
    'Dark Mode': false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Settings</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 32 }}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileSub}>Goal: Lose Weight · 2500 cal/day</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <TouchableOpacity style={styles.settingRow} activeOpacity={item.type === 'toggle' ? 1 : 0.7}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={toggles[item.label]}
                        onValueChange={(val) =>
                          setToggles((t) => ({ ...t, [item.label]: val }))
                        }
                        trackColor={{ false: '#e0e0e0', true: '#1a1a1a' }}
                        thumbColor="white"
                      />
                    ) : (
                      <View style={styles.settingRight}>
                        {item.value && (
                          <Text style={styles.settingValue}>{item.value}</Text>
                        )}
                        <Ionicons name="chevron-forward" size={16} color="#bbb" />
                      </View>
                    )}
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Version */}
        <Text style={styles.version}>Cal AI v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  profileSub: { fontSize: 12, color: '#aaa', marginTop: 2 },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  editBtnText: { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
  section: { marginHorizontal: 16, marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingIcon: { fontSize: 18 },
  settingLabel: { flex: 1, fontSize: 15, color: '#1a1a1a' },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingValue: { fontSize: 14, color: '#aaa' },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 48 },
  version: { textAlign: 'center', fontSize: 12, color: '#ccc', marginBottom: 12 },
});
