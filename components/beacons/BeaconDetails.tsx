import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from '../common/AppText';
import { AppIcon, BeaconType, ShareChristPageState } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { cardStyles, flexStyles } from '@/styles/Styles';
import { useSelector } from 'react-redux';
import { selectBeaconDetailsById } from '@/redux/selectors';
import { PageRow } from '../common/PageRow';
import { getShowHideIcon, isBeaconActive, mapPriorityToText } from '@/utils/appUtils';
import { PageChip } from '../common/PageChip';
import Beacon from '@/models/beacon';

export type IBeaconDetails = ViewProps & {
    beacon: Beacon;
    selectedTemplateId: string;
    shareChristPageState: ShareChristPageState;
};

export function BeaconDetails({ shareChristPageState, beacon, selectedTemplateId }: IBeaconDetails) {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));

    const isActive = isBeaconActive(beacon);

    useEffect(() => {
        Animated.timing(bgColor, {
            toValue: isActive ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    const interpolatedBgColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'lightgreen']
    });

    const details = useSelector((state: any) => selectBeaconDetailsById(state, selectedTemplateId));
    if (!details) {
        console.error("Something went wrong");
        return <></>;
    }

    const settings = details.settings;
    console.log(details);

    return (
        <ThemedView style={[styles.container]}>

            <Animated.View style={[styles.header, flexStyles.row, { backgroundColor: interpolatedBgColor }]}>
                <Image source={AppIcon.NetworkPeople}
                    style={styles.icon}
                    contentFit="contain" />
                <PageColumn>
                    <AppText type={TextType.Subtitle}>
                        {beacon.name} {isActive && "(Active)"}
                    </AppText>
                    <AppText type={TextType.Default}>
                        {beacon.message}
                    </AppText>
                </PageColumn>


            </Animated.View>


            <PageColumn style={styles.section}>
                <AppText type={TextType.Subtitle}>
                    Priority
                </AppText>
                <AppText type={TextType.DefaultSemiBold}>
                    {mapPriorityToText(beacon.priority)}
                </AppText>
            </PageColumn>

            {
                settings && (
                    <PageColumn style={styles.section}>
                        <AppText type={TextType.Subtitle}>
                            {settings.name}
                        </AppText>
                        <PageChip iconSrc={getShowHideIcon(settings.shareOneName)}
                            title={`Share One Name: ${settings.shareOneName ? "Yes" : 'No'}`} />
                        <PageChip iconSrc={getShowHideIcon(settings.shareOwnName)}
                            title={`Share Own Name: ${settings.shareOwnName ? "Yes" : 'No'}`} />
                    </PageColumn>
                )
            }

            <PageColumn style={styles.section}>
                <AppText type={TextType.Subtitle}>
                    When you send...
                </AppText>
                <AppText type={TextType.Default}>
                    Your beacon will be delivered to friends in your community and will
                    be active for 24 hours.
                </AppText>
            </PageColumn>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderRadius: 4,
        padding: 4,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
        height: 400,
    },
    header: {
        backgroundColor: 'lightgreen',
        marginBottom: 16,
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
    },
    section: {
        marginTop: 8,
        marginBottom: 8,
    },
    icon: {
        margin: 8,
        width: 48,
        height: 48,
        marginEnd: 8,
    },
});