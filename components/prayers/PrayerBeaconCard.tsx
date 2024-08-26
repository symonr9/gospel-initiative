import React from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

import PrayerBeacon from '@/models/prayerBeacon';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { AppIcon } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { cardStyles, flexStyles } from '@/styles/Styles';
import { useSelector } from 'react-redux';
import { selectPrayerBeaconDetailsById } from '@/redux/selectors';
import { PrayerBeaconDetails } from './PrayerBeaconDetails';

export type IPrayerBeaconCard = ViewProps & {
  prayerBeacon: PrayerBeacon;
  selectedBeaconId: string | null;
  setSelectedBeaconId: Function;
};

export function PrayerBeaconCard({ prayerBeacon, selectedBeaconId, setSelectedBeaconId }: IPrayerBeaconCard) {
  if (selectedBeaconId != null) {
    if (prayerBeacon.id !== selectedBeaconId) {
      return <></>;
    }
    return (
      <PrayerBeaconDetails prayerBeacon={prayerBeacon} 
                           selectedBeaconId={selectedBeaconId}/>
    );
  }

  const onPress = () => {
    setSelectedBeaconId(prayerBeacon.id);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[cardStyles.container, flexStyles.row]}>
        <Image source={AppIcon.NetworkPeople}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn>
          <ThemedText type={ThemedTextType.Subtitle}>
            {prayerBeacon.name}
          </ThemedText>
          <ThemedText type={ThemedTextType.Default}>
            {prayerBeacon.message}
          </ThemedText>
        </PageColumn>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    height: 800,
  },
  icon: {
    margin: 8,
    width: 48,
    height: 48,
    marginEnd: 8,
  },
});