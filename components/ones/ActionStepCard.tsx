import React from 'react';
import { ViewProps, StyleSheet, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import { Image } from 'expo-image';
import * as Calendar from 'expo-calendar';

import { AppText, TextType } from '../common/AppText';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';
import { addOneHour, formatDateTime, getAppTimeAgoText } from '@/utils/appUtils';
import { mapActionStepTypeToDetails } from "@/utils/textUtils";
import { mapActionStepTypeToTitle } from "@/utils/textUtils";
import { mapActionStepTypeToIcon } from "@/utils/iconUtils";
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import { useGridStyles } from '@/styles/Styles';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import { standardPaddedWidth } from '@/constants/Dimensions';

export type IActionStepCard = ViewProps & {
  actionStep: ActionStep;
  handleOnPress?: Function;
  selected?: Boolean;
  oneName: String;
};

export function ActionStepCard({ actionStep, handleOnPress, selected = false, oneName, style }: IActionStepCard) {
  const themeColors = useThemeColors();
  const gridStyles = useGridStyles(themeColors);

  const onPress = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  };

  const icon = actionStep.isComplete ? AppIcon.Checkmark : mapActionStepTypeToIcon(actionStep.type);

  const addToCalendar = async (calendarName: string) => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Calendar permissions are required to add events.');
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      let calendar = calendars.find((cal, idx) => idx === 0);

      if (!calendar) {
        let defaultCalendarSource = null;
        if (Platform.OS === 'ios') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          console.log("calendarscalendarscalendars: ", calendars);
          defaultCalendarSource = calendars.find((cal) => cal.source && cal.source.isLocalAccount)?.source;

          if (!defaultCalendarSource) {
            Alert.alert('Error', 'No valid calendar source found on iOS.');
            return;
          }
        } else {
          // For Android, create a local source
          defaultCalendarSource = { isLocalAccount: true, name: calendarName };
        }

        // Find or create the calendar
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        let calendar = calendars.find((cal) => cal.title === calendarName);

        if (!calendar) {
          const calendarId = await Calendar.createCalendarAsync({
            title: calendarName,
            color: Colors.info,
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
          });

          calendar = await Calendar.getCalendarAsync(calendarId);
        }
      }

      const targetDate = actionStep.targetDate ? new Date(actionStep.targetDate) : new Date();
      const eventTitle = `[Action Step] ${mapActionStepTypeToTitle(actionStep.type)} (${oneName})`;
      const eventNotes = `Action Step for the Gospel Initiative.\n\nAction Step Description:\n${mapActionStepTypeToDetails(actionStep.type)}\n\nPersonal Notes:\n${actionStep.notes || ''}`;

      const eventId = await Calendar.createEventInCalendarAsync({
        title: eventTitle,
        startDate: targetDate.toISOString(),
        endDate: addOneHour(targetDate).toISOString(),
        notes: eventNotes,
        alarms: [
          { relativeOffset: -1440 }, // 1 day before (negative for before start time)
          { relativeOffset: -2880 }, // 2 days before
        ]
      });
    } catch (error) {
      Alert.alert('Error', `Could not add event to calendar: ${error}`);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <PageRow style={[gridStyles.itemCard, actionStep.isComplete && styles.completed, selected && styles.selected, style]}>
        <Image source={icon} style={styles.icon} />
        <PageColumn style={styles.actionStepTextContainer}>
          <AppText type={TextType.Prefix}>{getAppTimeAgoText(actionStep.targetDate)}</AppText>

          <PageColumn style={{ flexShrink: 1, width: standardPaddedWidth }}>
            <AppText type={TextType.DefaultSemiBold} style={{ fontSize: 20, width: standardPaddedWidth }}>
              {mapActionStepTypeToTitle(actionStep.type)}
            </AppText>
            <AppText type={TextType.Default} style={{ width: standardPaddedWidth }}>
              {mapActionStepTypeToDetails(actionStep.type)}
            </AppText>
          </PageColumn>

          {actionStep.notes && (
            <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
              <AppText type={TextType.Default} style={{ marginBottom: 0 }}>
                {actionStep.notes}
              </AppText>
            </PageRow>
          )}

          {selected && <AppText type={TextType.Italic}>{formatDateTime(actionStep.targetDate)}</AppText>}

          {
            !actionStep.isComplete && (
              <PageRow style={{ marginTop: 10 }}>
                <SimpleButton text={'Add to Calendar'}
                  type={ButtonType.Save}
                  onPress={addToCalendar} />
              </PageRow>
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
    flexShrink: 1,
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginEnd: 12,
  },
});
