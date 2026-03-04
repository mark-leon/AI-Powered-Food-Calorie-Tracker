import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WEIGHT_DATA_6M = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    data: [121, 123, 125, 124, 127, 131],
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    strokeWidth: 2,
  }, {
    data: [121, 124, 126, 132, 135, 137],
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    withDots: false,
  }],
};

export default function ProgressScreen({ navigation }) {
  const [timeRange, setTimeRange] = useState('6M');
  const [weight, setWeight] = useState(132.1);
  const goalWeight = 140;

  const streakDays = [true, true, false, false, false, false, false];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Progress</Text>

        {/* Top Cards Row */}
        <View style={styles.topRow}>
          {/* Weight Card */}
          <View style={styles.weightCard}>
            <Text style={styles.weightCardLabel}>Your Weight</Text>
            <Text style={styles.weightValue}>{weight} lbs</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min((weight / goalWeight) * 100, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.goalLabel}>Goal {goalWeight} lbs</Text>
            <TouchableOpacity style={styles.logWeightBtn}>
              <Text style={styles.logWeightText}>Log Weight</Text>
              <Ionicons name="arrow-forward" size={14} color="white" />
            </TouchableOpacity>
          </View>

          {/* Streak Card */}
          <View style={styles.streakCard}>
            <Text style={{ fontSize: 40 }}>🔥</Text>
            <Text style={styles.streakNum}>21</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
            <View style={styles.weekRow}>
              {WEEK_DAYS.map((d, i) => (
                <View key={i} style={styles.dayItem}>
                  <Text style={styles.dayLetter}>{d}</Text>
                  <View
                    style={[
                      styles.dayDot,
                      streakDays[i] && styles.dayDotActive,
                    ]}
                  >
                    {streakDays[i] && (
                      <Ionicons name="checkmark" size={10} color="white" />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Weight Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weight Progress</Text>
            <View style={styles.goalBadge}>
              <Ionicons name="flag" size={12} color="#555" />
              <Text style={styles.goalBadgeText}>80% of goal</Text>
            </View>
          </View>

          <LineChart
            data={WEIGHT_DATA_6M}
            width={width - 64}
            height={180}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#4caf50',
              },
              propsForBackgroundLines: {
                stroke: '#f0f0f0',
                strokeDasharray: '5,5',
              },
            }}
            bezier
            style={{ marginLeft: -16 }}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={false}
          />

          {/* Time Range Selector */}
          <View style={styles.rangeRow}>
            {['90D', '6M', '1Y', 'ALL'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.rangeBtn, timeRange === r && styles.rangeBtnActive]}
                onPress={() => setTimeRange(r)}
              >
                <Text style={[styles.rangeBtnText, timeRange === r && styles.rangeBtnTextActive]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.motivationBadge}>
            <Text style={styles.motivationText}>
              🌟 Great job! Consistency is key, and you're mastering it!
            </Text>
          </View>
        </View>

        {/* Calories Section */}
        <View style={styles.caloriesCard}>
          <Text style={styles.chartTitle}>Daily Average Calories</Text>
          <View style={styles.caloriesRow}>
            <Text style={styles.caloriesNum}>2861</Text>
            <Text style={styles.caloriesUnit}>cal</Text>
            <View style={styles.trendBadge}>
              <Ionicons name="arrow-up" size={12} color="#4caf50" />
              <Text style={styles.trendText}>90%</Text>
            </View>
          </View>
          <View style={styles.calBarContainer}>
            <View style={styles.calBarFill} />
          </View>
          <View style={styles.calBarLabel}>
            <Text style={styles.calBarNum}>0</Text>
            <Text style={styles.calBarNum}>4000</Text>
          </View>
        </View>

        {/* Compare Button */}
        <TouchableOpacity
          style={styles.compareBtn}
          onPress={() => navigation.navigate('Compare')}
        >
          <Ionicons name="images-outline" size={20} color="#1a1a1a" />
          <Text style={styles.compareBtnText}>Compare Progress Photos</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

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
  container: { flex: 1, backgroundColor: '#fafafa' },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  weightCard: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  weightCardLabel: { fontSize: 12, color: '#aaa', marginBottom: 4 },
  weightValue: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
  },
  goalLabel: { fontSize: 11, color: '#aaa', marginBottom: 12 },
  logWeightBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  logWeightText: { color: 'white', fontSize: 13, fontWeight: '600' },
  streakCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  streakNum: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f57c00',
    marginTop: -4,
  },
  streakLabel: { fontSize: 13, color: '#f57c00', fontWeight: '600', marginBottom: 10 },
  weekRow: { flexDirection: 'row', gap: 4 },
  dayItem: { alignItems: 'center', gap: 2 },
  dayLetter: { fontSize: 9, color: '#aaa' },
  dayDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotActive: { backgroundColor: '#f57c00' },
  chartCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  goalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  goalBadgeText: { fontSize: 12, color: '#555', fontWeight: '500' },
  rangeRow: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 4,
  },
  rangeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  rangeBtnActive: { backgroundColor: '#fff' },
  rangeBtnText: { fontSize: 13, color: '#aaa', fontWeight: '500' },
  rangeBtnTextActive: { color: '#1a1a1a', fontWeight: '700' },
  motivationBadge: {
    backgroundColor: '#f0fff4',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },
  motivationText: { fontSize: 12, color: '#388e3c', textAlign: 'center' },
  caloriesCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  caloriesRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 6, marginBottom: 12 },
  caloriesNum: { fontSize: 42, fontWeight: '800', color: '#1a1a1a', letterSpacing: -1 },
  caloriesUnit: { fontSize: 16, color: '#999' },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#f0fff4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: { fontSize: 12, color: '#4caf50', fontWeight: '700' },
  calBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 4,
  },
  calBarFill: {
    width: '72%',
    height: 6,
    backgroundColor: '#ff5252',
    borderRadius: 3,
  },
  calBarLabel: { flexDirection: 'row', justifyContent: 'space-between' },
  calBarNum: { fontSize: 11, color: '#aaa' },
  compareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  compareBtnText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
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
