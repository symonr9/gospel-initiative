import React from 'react';
import { View, StyleSheet } from 'react-native';
import MissionsTrip from '@/models/missionsTrip';
import { ListDetails } from '../common/ListDetails';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { formatDateTime, getDatesInRange } from '@/utils/appUtils';
import EventCalendar, { MarkingType } from '../common/EventCalendar';
import AddToCalendarButton from '../common/AddToCalendarButton';
import { PageRow } from '../common/PageRow';

export type IReachWorldDetails = {
    missionsTrips: MissionsTrip[];
    activeItemId: string | null;
    setActiveItemId: Function;
};

export function ReachWorldDetails({ missionsTrips, activeItemId, setActiveItemId }: IReachWorldDetails) {
    if (activeItemId === null) {
        return <></>;
    }

    const missionsTrip = missionsTrips.find((trip) => trip.id === activeItemId);
    if (missionsTrip) {
        const events = missionsTrip.startDate && missionsTrip.endDate
            ? getDatesInRange(missionsTrip.startDate, missionsTrip.endDate) : [];

        const Body = (
            <PageColumn>
                <View style={styles.section}>
                    <AppText type={TextType.DefaultSemiBold}>
                        Details
                    </AppText>
                    <PageRow style={{ flexShrink: 1, width: '90%'}}>
                        <AppText type={TextType.Default}>
                            {missionsTrip.details}
                        </AppText>
                    </PageRow>
                </View>

                {
                    missionsTrip.location && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Location
                            </AppText>
                            <AppText type={TextType.Default}>
                                {missionsTrip.location}
                            </AppText>
                        </View>
                    )
                }

                {
                    missionsTrip.startDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Start Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(missionsTrip.startDate)}
                            </AppText>
                        </View>
                    )
                }

                {
                    missionsTrip.endDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                End Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(missionsTrip.endDate)}
                            </AppText>
                        </View>
                    )
                }

                {
                    events.length > 0 && (
                        <PageRow center>
                            <PageColumn>
                                <EventCalendar events={events}
                                    markingType={MarkingType.Period}
                                    initialDate={missionsTrip.startDate} />
                                <AddToCalendarButton startDate={missionsTrip.startDate}
                                    endDate={missionsTrip.endDate}
                                    title={missionsTrip.title}
                                    details={missionsTrip.details}
                                    location={missionsTrip.location} />
                            </PageColumn>
                        </PageRow>
                    )
                }

            </PageColumn>
        );

        return (
            <ListDetails title={missionsTrip.title}
                icon={missionsTrip.icon}
                Body={Body}
                setActiveItemId={setActiveItemId} />
        );
    }

    return <></>;
}

const styles = StyleSheet.create({
    body: {
        padding: 8,
    },
    details: {

    },
    section: {
        marginVertical: 6,
    }
});