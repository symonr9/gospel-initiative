
import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';

export type IActionStepCard = ViewProps & {
  actionStep: ActionStep;
};

export function ActionStepCard({ actionStep }: IActionStepCard) {

  return (
    <View style={styles.container}>
      <Image source={AppIcon.ArrowBack} style={styles.icon} />
      <ThemedText type={ThemedTextType.Link}>
        {actionStep.notes}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});