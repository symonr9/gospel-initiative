import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { ShareChristPageState } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { cardStyles, flexStyles } from '@/styles/Styles';
import { BeaconTemplateDetails } from './BeaconTemplateDetails';
import BeaconTemplate from '@/models/beaconTemplate';

export type IBeaconCard = ViewProps & {
  template: BeaconTemplate;
  selectedTemplateId: string | null;
  setSelectedTemplateId?: Function;
  shareChristPageState: ShareChristPageState;
};

export function BeaconTemplateCard({ template, selectedTemplateId, setSelectedTemplateId,
  shareChristPageState }: IBeaconCard) {
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
      <BeaconTemplateDetails template={template}
                     shareChristPageState={shareChristPageState}
                     selectedTemplateId={selectedTemplateId} />
    );
  }

  const onPress = () => {
    if (setSelectedTemplateId) {
      setSelectedTemplateId(template.id);
    }
  };

  const titleTextType = TextType.Subtitle;

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[cardStyles.container, flexStyles.row, { backgroundColor: interpolatedBgColor }]}>
        <Image source={template.icon}
          style={styles.icon}
          contentFit="contain" />

        <PageColumn style={{ width: '80%'}}>
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