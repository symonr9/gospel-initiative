import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import LocalMinistry from '@/models/localMinistry';
import MissionsTrip from '@/models/missionsTrip';

export type IMissionsTripCard = {
  missionsTrip: MissionsTrip;
  activeItemId: string | null;
  setActiveItemId: Function;
};

export function MissionsTripCard({ missionsTrip, activeItemId, setActiveItemId }: IMissionsTripCard) {
  if (activeItemId !== null && missionsTrip.id !== activeItemId) {
    return <></>;
  }

  const onPress = () => {
    setActiveItemId(missionsTrip.id);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.iconContainer}>
        <Image source={missionsTrip.icon} style={styles.icon} contentFit="contain" />
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.Text entering={FadeInUp.duration(400).delay(600)} style={styles.titleText}>
          <AppText type={TextType.BodyBold} style={styles.title}>
            {missionsTrip.title}
          </AppText>
          <AppText type={TextType.Body} style={styles.details}>
            {missionsTrip.details}
          </AppText>
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Lighter neutral color for a sleek look
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    display: 'flex'
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0', // Light gray background for a clean feel
    borderRadius: 16, // Circular for a modern design
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333', // Dark gray for modern, professional typography
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666', // Light gray for secondary text
  },
});

