import React from 'react';
import LocalEvent from '@/models/localEvent';
import LocalMinistry from '@/models/localMinistry';
import { View, StyleSheet } from 'react-native';
import { ListDetails } from '../common/ListDetails';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { formatDateTime, getDatesInRange } from '@/utils/appUtils';
import EventCalendar, { MarkingType } from '../common/EventCalendar';
import AddToCalendarButton from '../common/AddToCalendarButton';
import { PageRow } from '../common/PageRow';

export type ILoveCityDetails = {
    localMinistries?: LocalMinistry[];
    localEvents?: LocalEvent[];
    activeItemId: string | null;
    setActiveItemId: Function;
};

export function LoveCityDetails({ localMinistries, localEvents, activeItemId, setActiveItemId }: ILoveCityDetails) {
    if (activeItemId === null) {
        return <></>;
    }

    const localMinistry = localMinistries ? localMinistries.find((ministry) => ministry.id === activeItemId) : null;
    if (localMinistry) {
        const events = localMinistry.startDate && localMinistry.endDate
            ? getDatesInRange(localMinistry.startDate, localMinistry.endDate) : [];

        const Body = (
            <PageColumn>
                <View style={styles.section}>
                    <AppText type={TextType.DefaultSemiBold}>
                        Details
                    </AppText>
                    
                    <PageRow style={{ flexShrink: 1, width: '90%'}}>
                        <AppText type={TextType.Default}>
                            {localMinistry.details}
                        </AppText>
                    </PageRow>
                </View>

                {
                    localMinistry.location && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Location
                            </AppText>
                            <AppText type={TextType.Default}>
                                {localMinistry.location}
                            </AppText>
                        </View>
                    )
                }

                {
                    localMinistry.startDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Start Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(localMinistry.startDate)}
                            </AppText>
                        </View>
                    )
                }

                {
                    localMinistry.endDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                End Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(localMinistry.endDate)}
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
                                initialDate={localMinistry.startDate} />
                            <AddToCalendarButton startDate={localMinistry.startDate}
                                endDate={localMinistry.endDate}
                                title={localMinistry.title}
                                details={localMinistry.details}
                                location={localMinistry.location} />
                            </PageColumn>
                        </PageRow>
                    )
                }

            </PageColumn>
        );

        return (
            <ListDetails title={localMinistry.title}
                icon={localMinistry.icon}
                Body={Body}
                setActiveItemId={setActiveItemId} />
        );
    }

    const localEvent = localEvents ? localEvents.find((event) => event.id === activeItemId) : null;
    if (localEvent) {
        const events = localEvent.startDate && localEvent.endDate
            ? getDatesInRange(localEvent.startDate, localEvent.endDate) : [];

        const Body = (
            <PageColumn>
                <View style={styles.section}>
                    <AppText type={TextType.DefaultSemiBold}>
                        Details
                    </AppText>

                    <PageRow style={{ flexShrink: 1, width: '90%'}}>
                        <AppText type={TextType.Default}>
                            {localEvent.details}
                        </AppText>
                    </PageRow>
                </View>

                {
                    localEvent.location && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Location
                            </AppText>
                            <AppText type={TextType.Default}>
                                {localEvent.location}
                            </AppText>
                        </View>
                    )
                }

                {
                    localEvent.startDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Start Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(localEvent.startDate)}
                            </AppText>
                        </View>
                    )
                }

                {
                    localEvent.endDate && (
                        <View style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                End Date
                            </AppText>
                            <AppText type={TextType.Default}>
                                {formatDateTime(localEvent.endDate)}
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
                                    initialDate={localEvent.startDate} />
                                <AddToCalendarButton startDate={localEvent.startDate}
                                    endDate={localEvent.endDate}
                                    title={localEvent.title}
                                    details={localEvent.details}
                                    location={localEvent.location} />
                            </PageColumn>
                        </PageRow>
                    )
                }
            </PageColumn>
        );

        return (
            <ListDetails title={localEvent.title}
                icon={localEvent.icon}
                Body={Body}
                setActiveItemId={setActiveItemId} />
        );
    }

    return <></>;
}


const styles = StyleSheet.create({
    section: {
        marginVertical: 6,
    }
});