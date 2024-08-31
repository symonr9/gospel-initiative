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
import BeaconTemplate from '@/models/beaconTemplate';

export type IBeaconCard = ViewProps & {
  template: BeaconTemplate;
  selectedTemplateId: string | null;
  setSelectedTemplateId: Function;
  shareChristPageState: ShareChristPageState;
  onlyActive: boolean;
};

export function BeaconTemplateCard({ template, selectedTemplateId, setSelectedTemplateId: setSelectedTemplateId,
  shareChristPageState, onlyActive }: IBeaconCard) {
  const [bgColor, setBgColor] = useState(new Animated.Value(0));

  useEffect(() => {
    const isMatch = selectedTemplateId != null && template.id !== selectedTemplateId;
    Animated.timing(bgColor, {
      toValue: isMatch ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [selectedTemplateId]);

  const interpolatedBgColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'whitesmoke']
  });

  if (selectedTemplateId != null) {
    if (template.id !== selectedTemplateId) {
      return <></>;
    }

    return (
      <View>
        TEST
      </View>
    );

    // return (
    //   <BeaconDetails beacon={beacon}
    //     shareChristPageState={shareChristPageState}
    //     selectedTemplateId={selectedTemplateId} />
    // );
  }

  const onPress = () => {
    setSelectedTemplateId(template.id);
  };

  const titleTextType = onlyActive ? TextType.DefaultSemiBold : TextType.Subtitle;

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[cardStyles.container, flexStyles.row, { backgroundColor: interpolatedBgColor }]}>
        <Image source={template.icon}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn>
          <AppText type={titleTextType}>
            {template.name}
          </AppText>
          <AppText type={TextType.Default}>
            {template.message}
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
    width: 36,
    height: 36,
    marginTop: 8,
    marginEnd: 8,
  },
});