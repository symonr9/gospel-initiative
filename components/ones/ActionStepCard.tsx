
import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
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
      <AppText type={TextType.Link}>
        {actionStep.notes}
      </AppText>
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