
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText } from '@/utils/appUtils';
import { mapActionStepTypeToDetails } from "@/utils/textUtils";
import { mapActionStepTypeToTitle } from "@/utils/textUtils";
import { mapActionStepTypeToIcon } from "@/utils/iconUtils";
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import { gridStyles } from '@/styles/Styles';

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
      <PageRow style={[gridStyles.itemCard, actionStep.isComplete && styles.completed, selected && styles.selected, style]}>
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