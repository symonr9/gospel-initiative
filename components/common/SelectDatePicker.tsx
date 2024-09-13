import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { AppText, TextType } from './AppText';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { formatDateTime } from '@/utils/appUtils';

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
    onDateSelected: (date: string) => void; // Callback to send the selected date
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

function SelectDatePicker({ title, events, markingType = MarkingType.Dot, currentDate = new Date(), initialDate = new Date(), onDateSelected }: ISelectDatePicker) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to store the selected date
    const markedDates = createSimpleMarkedDates(events);

    const onDayPress = (day: DateObject) => {
        setSelectedDate(day.dateString);
        onDateSelected(day.dateString);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                {title && (
                    <AppText type={TextType.BodyBold} style={styles.calendarTitle}>
                        {title}
                    </AppText>
                )}
                {selectedDate && (
                    <View style={styles.selectedDateWrapper}>
                        <AppText type={TextType.DefaultSemiBold}>
                            Selected Deadline: {selectedDate}
                        </AppText>
                    </View>
                )}
                <Calendar
                    markedDates={markedDates}
                    markingType={markingType}
                    onDayPress={onDayPress}
                    initialDate={initialDate}
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
    selectedDateWrapper: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 8,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
});

export default SelectDatePicker;
