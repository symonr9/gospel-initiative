import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AppText, TextType } from './AppText';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { PageColumn } from './PageColumn';
import { formatDateTime, getDaysDifference, getNextWeek } from '@/utils/appUtils';

export enum MarkingType {
    MultiDot = 'multi-dot',
    Period = 'period',
    MultiPeriod = 'multi-period',
    Dot = 'dot',
};

export type ISelectDatePicker = ViewProps & {
    events: Date[];
    markingType?: MarkingType;
    title?: string;
    currentDate?: Date;
    initialDate?: Date;
    onDateSelected: (date: Date) => void;
};

export function createSimpleMarkedDates(events: Date[]) {
    return events.reduce((acc: any, event: Date, currentIndex: number) => {
        const date = event.toISOString().split('T')[0]; // Ensure the date is in YYYY-MM-DD format        
        acc[date] = {
            marked: true,
            selected: true, // Optional: highlight the selected date
            selectedColor: '#1f77b4',
            color: 'green',
            textColor: 'white',
            startingDay: currentIndex === 0,
            endingDay: currentIndex === events.length - 1
        };
        return acc;
    }, {});
}

function SelectDatePicker({ title, events, markingType = MarkingType.Dot, currentDate = new Date(), initialDate = getNextWeek(), onDateSelected }: ISelectDatePicker) {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate); // State to store the selected date
    const markedDates = createSimpleMarkedDates(events);

    const onDayPress = (day: any) => {
        const dayDate = new Date(day.dateString);
        setSelectedDate(dayDate);
        onDateSelected(dayDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                {title && (
                    <AppText type={TextType.BodyBold} style={styles.calendarTitle}>
                        {title}
                    </AppText>
                )}

                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText type={TextType.Subtitle}>
                        Goal: Complete in {getDaysDifference(new Date(), selectedDate)} days
                    </AppText>
                    <AppText type={TextType.Default}>
                        Target Date: {formatDateTime(selectedDate)}
                    </AppText>
                </PageColumn>

                <Calendar
                    markedDates={markedDates}
                    markingType={markingType}
                    onDayPress={onDayPress}
                    initialDate={initialDate}
                    minDate={currentDate}
                    current={currentDate}
                    theme={calendarTheme}
                    enableSwipeMonths={true}
                    style={styles.calendar}
                />
            </View>
        </View>
    );
}

const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#f0f0f0',
    textSectionTitleColor: '#b6c1cd',
    todayTextColor: '#00adf5',
    dayTextColor: 'gray',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: 'bold',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',
    textDayFontSize: 18,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarWrapper: {
        padding: 10,
        marginHorizontal: 8
    },
    calendarTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
    },
});

export default SelectDatePicker;
