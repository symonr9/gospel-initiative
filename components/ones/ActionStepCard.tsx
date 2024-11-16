
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, mapActionStepTypeToDetails, mapActionStepTypeToIcon, mapActionStepTypeToTitle } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';

export type IActionStepCard = ViewProps & {
  actionStep: ActionStep;
  handleOnPress?: Function;
  selected?: Boolean;
};

export function ActionStepCard({ actionStep, handleOnPress, selected = false, style }: IActionStepCard) {

  const onPress = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  }

  const icon = actionStep.isComplete ? AppIcon.Checkmark : mapActionStepTypeToIcon(actionStep.type);

  return (
    <TouchableOpacity onPress={onPress}>
      <PageRow style={[styles.card, actionStep.isComplete && styles.completed, selected && styles.selected, style]}>
        <Image source={icon} style={styles.icon} />
        <PageColumn style={styles.actionStepTextContainer}>
        <AppText type={TextType.Prefix}>{getAppTimeAgoText(actionStep.targetDate)}</AppText>        

          <PageColumn style={{ flexShrink: 1, width: '100%'}}>
            <AppText type={TextType.DefaultSemiBold} style={{ fontSize: 20 }}>{mapActionStepTypeToTitle(actionStep.type)}</AppText>
            <AppText type={TextType.Default} style={{}}>{mapActionStepTypeToDetails(actionStep.type)}</AppText>
          </PageColumn>

            {
              actionStep.notes && (
                <PageRow style={{ flexShrink: 1, width: '90%'}}>
                  <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{actionStep.notes}</AppText>
                </PageRow>
              )
            }

          {
            selected && (
              <AppText type={TextType.Italic}>{formatDateTime(actionStep.targetDate)}</AppText>
            )
          }
        </PageColumn>
      </PageRow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#FFF8DE',
    borderColor: 'lightgray',
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
  },
  completed: {
    backgroundColor: Colors.success,
  },
  selected: {
    backgroundColor: '#a2c4c9',
  },
  actionStepTextContainer: {
    flexShrink: 1
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginEnd: 12
  }
});