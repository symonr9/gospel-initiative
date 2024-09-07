import React from 'react';
import LocalEvent from '@/models/localEvent';
import { ListCard } from '../common/ListCard';
import LocalMinistry from '@/models/localMinistry';
import { View, StyleSheet } from 'react-native';
import { ListDetails } from '../common/ListDetails';
import missionsTrip from '@/models/missionsTrip';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { formatDateTime } from '@/utils/appUtils';

export type ILoveCityDetails = {
    localMinistries: LocalMinistry[];
    localEvents: LocalEvent[];
    activeItemId: string | null;
    setActiveItemId: Function;
};

export function LoveCityDetails({ localMinistries, localEvents, activeItemId, setActiveItemId }: ILoveCityDetails) {
    if (activeItemId === null) {
        return <></>;
    }

    const localMinistry = localMinistries.find((ministry) => ministry.id === activeItemId);
    if (localMinistry) {
        const Body = (
            <PageColumn>
                <View style={styles.section}>
                    <AppText type={TextType.DefaultSemiBold}>
                        Details
                    </AppText>
                    <AppText type={TextType.Default}>
                        {localMinistry.details}
                    </AppText>
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
            </PageColumn>
        );

        return (
            <ListDetails title={localMinistry.title}
                icon={localMinistry.icon}
                Body={Body}
                setActiveItemId={setActiveItemId} />
        );
    }

    const localEvent = localEvents.find((event) => event.id === activeItemId);
    if (localEvent) {
        const Body = (
            <PageColumn>
                <View style={styles.section}>
                    <AppText type={TextType.DefaultSemiBold}>
                        Details
                    </AppText>
                    <AppText type={TextType.Default}>
                        {localEvent.details}
                    </AppText>
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
        marginTop: 8,
        marginBottom: 8
    }
});