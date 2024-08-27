import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';

import PrayerBeacon from '@/models/prayerBeacon';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { AppIcon, PrayerBeaconType, ShareChristPageState } from '@/enums/enums';
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
  shareChristPageState: ShareChristPageState;
  onlyActive: boolean;
};

export function PrayerBeaconCard({ prayerBeacon, selectedBeaconId, setSelectedBeaconId,
  shareChristPageState, onlyActive }: IPrayerBeaconCard) {
  const [bgColor, setBgColor] = useState(new Animated.Value(0));

  const isActive = prayerBeacon.type == PrayerBeaconType.Active;

  useEffect(() => {
    Animated.timing(bgColor, {
      toValue: isActive ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const interpolatedBgColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'whitesmoke']
  });

  if (selectedBeaconId != null) {
    if (prayerBeacon.id !== selectedBeaconId) {
      return <></>;
    }
    return (
      <PrayerBeaconDetails prayerBeacon={prayerBeacon}
        shareChristPageState={shareChristPageState}
        selectedBeaconId={selectedBeaconId} />
    );
  }

  const onPress = () => {
    setSelectedBeaconId(prayerBeacon.id);
  };

  const titleTextType = onlyActive ? ThemedTextType.DefaultSemiBold : ThemedTextType.Subtitle;

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[cardStyles.container, flexStyles.row, { backgroundColor: interpolatedBgColor }]}>
        <Image source={AppIcon.NetworkPeople}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn>
          <ThemedText type={titleTextType}>
            {prayerBeacon.name} {isActive && "(Active)"}
          </ThemedText>
          <ThemedText type={ThemedTextType.Default}>
            {prayerBeacon.message}
          </ThemedText>
        </PageColumn>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    height: 800,
    flex: 1,
  },
  icon: {
    margin: 8,
    width: 48,
    height: 48,
    marginEnd: 8,
  },
});