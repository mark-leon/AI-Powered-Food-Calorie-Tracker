import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NutritionScreen({ navigation, route }) {
  const { food } = route.params || {};
  const [servings, setServings] = useState(1);

  const cal = Math.round((food?.calories || 330) * servings);
  const protein = Math.round((food?.protein || 8) * servings);
  const carbs = Math.round((food?.carbs || 20) * servings);
  const fat = Math.round((food?.fat || 18) * servings);

  const ingredients = food?.ingredients || [
    { name: 'Lettuce', calories: 20, amount: '1.5 cups' },
    { name: 'Cherry Tomatoes', calories: 35, amount: '6 pieces' },
    { name: 'Croutons', calories: 80, amount: '0.5 cups' },
    { name: 'Parmesan', calories: 110, amount: '2 tbsp' },
    { name: 'Caesar Dressing', calories: 85, amount: '2 tbsp' },
  ];

  const handleDone = () => {
    Alert.alert('Logged!', `${food?.name || 'Meal'} has been added to your diary.`, [
      { text: 'OK', onPress: () => navigation.navigate('Main') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Image Area */}
      <View style={styles.heroArea}>
        <View style={styles.heroPlaceholder}>
          <Text style={{ fontSize: 80 }}>🥗</Text>
        </View>
        {/* Overlay header */}
        <View style={styles.heroHeader}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Nutrition</Text>
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="share-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="ellipsis-horizontal" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Food Name + Servings */}
        <View style={styles.nameCard}>
          <View style={styles.nameRow}>
            <View style={styles.bookmarkRow}>
              <Ionicons name="bookmark-outline" size={16} color="#888" />
              <Text style={styles.mealTime}>
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </Text>
            </View>
            <View style={styles.servingsControl}>
              <TouchableOpacity
                style={styles.servingBtn}
                onPress={() => setServings(Math.max(0.5, servings - 0.5))}
              >
                <Text style={styles.servingBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.servingCount}>{servings}</Text>
              <TouchableOpacity
                style={styles.servingBtn}
                onPress={() => setServings(servings + 0.5)}
              >
                <Text style={styles.servingBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.foodTitle}>{food?.name || 'Caesar Salad with Cherry Tomatoes'}</Text>
        </View>

        {/* Calories Big Card */}
        <View style={styles.caloriesBig}>
          <Text style={styles.calIcon}>🔥</Text>
          <View>
            <Text style={styles.calLabel}>Calories</Text>
            <Text style={styles.calValue}>{cal}</Text>
          </View>
        </View>

        {/* Macros Row */}
        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>🍗</Text>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>{protein}g</Text>
          </View>
          <View style={styles.macroDivider} />
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>🌾</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>{carbs}g</Text>
          </View>
          <View style={styles.macroDivider} />
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>💧</Text>
            <Text style={styles.macroLabel}>Fats</Text>
            <Text style={styles.macroValue}>{fat}g</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.ingredientsSection}>
          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <TouchableOpacity>
              <Text style={styles.addMore}>+ Add more</Text>
            </TouchableOpacity>
          </View>
          {ingredients.map((ing, i) => (
            <View key={i} style={styles.ingredientRow}>
              <View>
                <Text style={styles.ingName}>{ing.name}</Text>
                <Text style={styles.ingCal}>{Math.round(ing.calories * servings)} cal</Text>
              </View>
              <Text style={styles.ingAmount}>{ing.amount}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.fixBtn}>
          <Ionicons name="sparkles" size={16} color="#1a1a1a" />
          <Text style={styles.fixBtnText}>Fix Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroArea: {
    height: 240,
    backgroundColor: '#2d4a3e',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroHeader: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  heroActions: { flexDirection: 'row', gap: 8 },
  content: { flex: 1 },
  nameCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookmarkRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  mealTime: { fontSize: 13, color: '#888' },
  foodTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 26,
  },
  servingsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 24,
    overflow: 'hidden',
  },
  servingBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  servingBtnText: { fontSize: 18, color: '#1a1a1a', fontWeight: '500' },
  servingCount: {
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  caloriesBig: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    margin: 16,
    padding: 20,
    backgroundColor: '#fafafa',
    borderRadius: 16,
  },
  calIcon: { fontSize: 32 },
  calLabel: { fontSize: 14, color: '#888', marginBottom: 2 },
  calValue: { fontSize: 40, fontWeight: '800', color: '#1a1a1a', letterSpacing: -1 },
  macrosRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    padding: 16,
  },
  macroItem: { flex: 1, alignItems: 'center', gap: 4 },
  macroIcon: { fontSize: 20 },
  macroLabel: { fontSize: 12, color: '#888' },
  macroValue: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  macroDivider: { width: 1, backgroundColor: '#e8e8e8', marginVertical: 4 },
  ingredientsSection: { padding: 20 },
  ingredientsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientsTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  addMore: { fontSize: 14, color: '#555', fontWeight: '500' },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  ingName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  ingCal: { fontSize: 12, color: '#888', marginTop: 2 },
  ingAmount: { fontSize: 14, color: '#555' },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 32,
  },
  fixBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#1a1a1a',
  },
  fixBtnText: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  doneBtn: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  doneBtnText: { color: 'white', fontSize: 15, fontWeight: '700' },
});
