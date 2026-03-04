import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();

const MOCK_FOODS = [
  {
    id: '1',
    name: 'Grilled Salmon',
    calories: 550,
    protein: 35,
    carbs: 40,
    fat: 28,
    time: '12:37pm',
    emoji: '🐟',
  },
  {
    id: '2',
    name: 'Pancakes with Blueberries',
    calories: 420,
    protein: 12,
    carbs: 65,
    fat: 14,
    time: '8:15am',
    emoji: '🥞',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    calories: 330,
    protein: 8,
    carbs: 20,
    fat: 18,
    time: '6:21pm',
    emoji: '🥗',
  },
];

function MacroRing({ value, max, color, label, icon }) {
  const pct = Math.min(value / max, 1);
  const size = 72;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct);

  return (
    <View style={styles.macroCard}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>{icon}</Text>
        </View>
      </View>
      <Text style={styles.macroValue}>
        <Text style={[styles.macroHighlight, { color }]}>{value}</Text>/{max}g
      </Text>
      <Text style={styles.macroLabel}>{label} eaten</Text>
    </View>
  );
}

function CalorieRing({ eaten, goal }) {
  const pct = Math.min(eaten / goal, 1);
  const size = 80;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e8e8e8"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>🔥</Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(today.getDay());
  const caloriesEaten = 1250;
  const calorieGoal = 2500;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDates = DAYS.map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.getDate();
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={styles.logo}>🍎 Cal AI</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 15</Text>
            </View>
          </View>

          {/* Week Selector */}
          <View style={styles.weekRow}>
            {DAYS.map((day, i) => {
              const isToday = i === today.getDay();
              const isSelected = i === selectedDay;
              const isPast = i < today.getDay();
              return (
                <TouchableOpacity
                  key={day}
                  style={styles.dayItem}
                  onPress={() => setSelectedDay(i)}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>{day}</Text>
                  <View
                    style={[
                      styles.dayCircle,
                      isSelected && styles.dayCircleSelected,
                      isToday && !isSelected && styles.dayCircleToday,
                      isPast && !isSelected && styles.dayCirclePast,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNum,
                        isSelected && styles.dayNumSelected,
                        isPast && !isSelected && styles.dayNumPast,
                      ]}
                    >
                      {weekDates[i]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Calorie Card */}
        <View style={styles.calorieCard}>
          <View style={styles.calorieLeft}>
            <Text style={styles.calorieMain}>
              {caloriesEaten.toLocaleString()}
              <Text style={styles.calorieGoal}>/{calorieGoal.toLocaleString()}</Text>
            </Text>
            <Text style={styles.calorieLabel}>Calories eaten</Text>
          </View>
          <CalorieRing eaten={caloriesEaten} goal={calorieGoal} />
        </View>

        {/* Macros */}
        <View style={styles.macrosRow}>
          <MacroRing value={75} max={150} color="#e85555" label="Protein" icon="🍗" />
          <MacroRing value={138} max={275} color="#e8a030" label="Carbs" icon="🌾" />
          <MacroRing value={35} max={70} color="#5588e8" label="Fat" icon="💧" />
        </View>

        {/* Recent Foods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently uploaded</Text>
          {MOCK_FOODS.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodCard}
              onPress={() => navigation.navigate('Nutrition', { food })}
            >
              <View style={styles.foodEmoji}>
                <Text style={{ fontSize: 32 }}>{food.emoji}</Text>
              </View>
              <View style={styles.foodInfo}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodTime}>{food.time}</Text>
                </View>
                <Text style={styles.foodCals}>🔥 {food.calories} Calories</Text>
                <Text style={styles.foodMacros}>
                  🍗 {food.protein}g   🌾 {food.carbs}g   💧 {food.fat}g
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Camera')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  streakBadge: {
    backgroundColor: '#fff5e6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ffe0b2',
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f57c00',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#aaa',
    fontWeight: '500',
  },
  dayLabelSelected: {
    color: '#1a1a1a',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  dayCirclePast: {
    backgroundColor: '#ffebee',
  },
  dayNum: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  dayNumSelected: {
    color: '#1a1a1a',
  },
  dayNumPast: {
    color: '#e53935',
  },
  calorieCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  calorieLeft: {
    flex: 1,
  },
  calorieMain: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -1,
  },
  calorieGoal: {
    fontSize: 22,
    fontWeight: '400',
    color: '#999',
  },
  calorieLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  macrosRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  macroValue: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  macroHighlight: {
    fontWeight: '700',
    fontSize: 13,
  },
  macroLabel: {
    fontSize: 10,
    color: '#bbb',
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  foodEmoji: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodInfo: {
    flex: 1,
    padding: 12,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  foodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  foodTime: {
    fontSize: 12,
    color: '#aaa',
  },
  foodCals: {
    fontSize: 13,
    color: '#555',
    marginTop: 3,
    fontWeight: '500',
  },
  foodMacros: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
