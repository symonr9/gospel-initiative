import React from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

import PrayerBeacon from '@/models/prayerBeacon';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { AppIcon } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { cardStyles } from '@/styles/Styles';
import { useSelector } from 'react-redux';
import { selectPrayerBeaconDetailsById } from '@/redux/selectors';

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

    const details = useSelector((state: any) => selectPrayerBeaconDetailsById(state, selectedBeaconId));
    if (!details) {
      console.error("Something went wrong");
      return <></>;
    }

    const settings = details.settings;
    console.log(details);

    return (
      <ThemedView style={[cardStyles.container, styles.selectedContainer]}>
        <Image source={AppIcon.NetworkPeople}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn spaceBetween style={{ height: 450}}>
          <PageColumn>
            <ThemedText type={ThemedTextType.Subtitle}>
              {prayerBeacon.name}
            </ThemedText>
            <ThemedText type={ThemedTextType.Default}>
              {prayerBeacon.message}
            </ThemedText>
          </PageColumn>

          {
            settings && (
              <PageColumn style={{ marginTop: 4 }}>
                <ThemedText type={ThemedTextType.Subtitle}>
                  {settings.name}
                </ThemedText>
                <ThemedText type={ThemedTextType.DefaultSemiBold}>
                  Share One Name: {settings.shareOneName ? "True" : 'False'}
                </ThemedText>
                <ThemedText type={ThemedTextType.DefaultSemiBold}>
                  Share Own Name: {settings.shareOwnName ? 'True' : 'False'}
                </ThemedText>
              </PageColumn>
            )
          }
        </PageColumn>
      </ThemedView>
    );
  }

  const onPress = () => {
    setSelectedBeaconId(prayerBeacon.id);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[cardStyles.container]}>
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