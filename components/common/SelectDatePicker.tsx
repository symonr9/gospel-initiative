import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AppText, TextType } from './AppText';
import { PageColumn } from './PageColumn';
import { formatDateTime, formatDateTimeSimple, getDaysDifference, getNextWeek } from '@/utils/appUtils';
import DetailsSection from './DetailsSection';
import { AppIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { ButtonType, SimpleButton } from './SimpleButton';

export enum MarkingType {
    MultiDot = 'multi-dot',
    Period = 'period',
    MultiPeriod = 'multi-period',
    Dot = 'dot',
};

export type ISelectDatePicker = {
    events: Date[];
    variation?: DatePickerVariation;
    onDateSelected: (date: Date) => void;
};

export function createSimpleMarkedDates(events: Date[]) {
    return events.reduce((acc: any, event: Date, currentIndex: number) => {
        const date = event.toISOString().split('T')[0]; // Ensure the date is in YYYY-MM-DD format        
        acc[date] = {
            marked: true,
            selected: true,
            selectedColor: '#1f77b4',
            color: 'green',
            textColor: 'white',
            startingDay: currentIndex === 0,
            endingDay: currentIndex === events.length - 1
        };
        return acc;
    }, {});
}

export enum DatePickerVariation {
    Goal,
    KnownSince,
    Simple
};

function SelectDatePicker({ events, variation = DatePickerVariation.Simple, onDateSelected }: ISelectDatePicker) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(getNextWeek());
    const markedDates = createSimpleMarkedDates(events);

    const toggleModal = () => setModalVisible(!isModalVisible);

    const isGoal = variation === DatePickerVariation.Goal;
    const isKnownSince = variation === DatePickerVariation.KnownSince;

    const onDayPress = (day: any) => {
        const dayDate = new Date(day.dateString);
        setSelectedDate(dayDate);
        onDateSelected(dayDate);
        toggleModal(); // Close the modal after selecting a date
    };

    let Details;
    if (variation === DatePickerVariation.Goal) {
        Details = (
            <PageColumn style={{ marginVertical: 8 }}>
                <AppText type={TextType.Subtitle}>
                    Goal: Complete in {getDaysDifference(new Date(), selectedDate)} days
                </AppText>
                <AppText type={TextType.Default} style={{ marginBottom: 8 }}>
                    Target Date: {formatDateTime(selectedDate)}
                </AppText>

                <PageRow center>
                    <SimpleButton type={ButtonType.Edit}
                        text={'Set Goal'}
                        onPress={toggleModal} />
                </PageRow>
            </PageColumn>
        );
    } else if (variation === DatePickerVariation.KnownSince) {
        Details = (
            <PageColumn style={{ marginVertical: 8 }}>
                <AppText type={TextType.Body} style={{ marginBottom: 8 }}>
                    {formatDateTimeSimple(selectedDate)}
                </AppText>
                <PageRow center>
                    <DetailsSection iconSrc={AppIcon.Calendar}
                        prefix={'Known For'}
                        title={`${getDaysDifference(new Date(), selectedDate)} Days`}
                    />
                </PageRow>

                <PageRow center>
                    <SimpleButton type={ButtonType.Edit}
                        text={'Set Date'}
                        onPress={toggleModal} />
                </PageRow>
            </PageColumn>
        );
    } else {
        Details = (
            <PageColumn style={{ marginVertical: 8 }}>
                <AppText type={TextType.Subtitle2} style={{ marginBottom: 8 }}>
                    Date: {formatDateTime(selectedDate)}
                </AppText>
                <PageRow center>
                    <SimpleButton type={ButtonType.Edit}
                        text={'Set Date'}
                        onPress={toggleModal} />
                </PageRow>
            </PageColumn>
        );
    }

    return (
        <View>
            {Details}

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={toggleModal}>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.calendarWrapper}>
                            <AppText type={TextType.BodyBold} style={styles.calendarTitle}>
                                Select a Date
                            </AppText>

                            <Calendar
                                markedDates={markedDates}
                                markingType={MarkingType.Dot}
                                onDayPress={onDayPress}
                                initialDate={getNextWeek()}
                                minDate={isGoal ? new Date() : null}
                                maxDate={isKnownSince ? new Date() : null}
                                current={new Date()}
                                theme={calendarTheme}
                                enableSwipeMonths={true}
                                style={styles.calendar}
                            />

                            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                                <AppText type={TextType.BodyBold} style={styles.closeButtonText}>
                                    Close
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    calendarWrapper: {
        padding: 10,
        marginHorizontal: 8,
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
        shadowRadius: 6,
        elevation: 4,
    },
    closeButton: {
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 16,
    },
    closeButtonText: {
        color: '#007aff',
        fontSize: 16,
    },
});

export default SelectDatePicker;
