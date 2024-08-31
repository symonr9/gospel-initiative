import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { AppIcon, BeaconType, ShareChristPageState } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { cardStyles, flexStyles } from '@/styles/Styles';
import { BeaconDetails } from './BeaconDetails';
import { isBeaconActive } from '@/utils/appUtils';
import Beacon from '@/models/beacon';

export type IBeaconCard = ViewProps & {
  beacon: Beacon;
  selectedBeaconId: string | null;
  setSelectedBeaconId: Function;
  shareChristPageState: ShareChristPageState;
  onlyActive: boolean;
};

export function BeaconCard({ beacon, selectedBeaconId, setSelectedBeaconId,
  shareChristPageState, onlyActive }: IBeaconCard) {
  const [bgColor, setBgColor] = useState(new Animated.Value(0));

  const isActive = isBeaconActive(beacon);

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
    if (beacon.id !== selectedBeaconId) {
      return <></>;
    }
    return (
      <BeaconDetails beacon={beacon}
        shareChristPageState={shareChristPageState}
        selectedBeaconId={selectedBeaconId} />
    );
  }

  const onPress = () => {
    setSelectedBeaconId(beacon.id);
  };

  const titleTextType = onlyActive ? TextType.DefaultSemiBold : TextType.Subtitle;

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[cardStyles.container, flexStyles.row, { backgroundColor: interpolatedBgColor }]}>
        <Image source={AppIcon.NetworkPeople}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn>
          <AppText type={titleTextType}>
            {beacon.name} {isActive && "(Active)"}
          </AppText>
          <AppText type={TextType.Default}>
            {beacon.message}
          </AppText>
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