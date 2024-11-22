
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import ActionStep from '@/models/actionStep';
import { AppIcon, GospelStepLayoutType, GospelStepType } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, isGospelStepCompleted, mapActionStepTypeToDetails, mapActionStepTypeToIcon, mapActionStepTypeToTitle, mapGospelStepTypeToDetails, mapGospelStepTypeToIcon, mapGospelStepTypeToTitle } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import { gridStyles } from '@/styles/Styles';
import GospelStep from '@/models/gospelStep';

import Slider from '@react-native-community/slider';

export type IGospelStepCard = ViewProps & {
    gospelStep: GospelStep;
    handleOnPress?: Function;
    selected?: Boolean;
};

export function GospelStepCard({ gospelStep, handleOnPress, selected = false, style }: IGospelStepCard) {

    const onPress = () => {
        if (handleOnPress) {
            handleOnPress();
        }
    }

    const completed = isGospelStepCompleted(gospelStep);
    const icon = completed ? AppIcon.Checkmark : mapGospelStepTypeToIcon(gospelStep.type);

    let RatingEl = <></>;
    switch (gospelStep.layoutType) {
        case GospelStepLayoutType.Binary:
            RatingEl = (
                <>
                    <AppText>
                        Binary Rating: {gospelStep.rating}
                    </AppText>
                </>
            );
            break;
        case GospelStepLayoutType.Scale:
            RatingEl = (
                <PageColumn>
                        <Slider
                            style={{ width: 220, height: 40 }}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor={Colors.sharpGood}
                            maximumTrackTintColor={Colors.info}
                        />
                </PageColumn>
            );
            break;
        case GospelStepLayoutType.BinaryCounter:
            RatingEl = (
                <>
                    <AppText>
                        Binary Counter Rating: {gospelStep.rating}
                    </AppText>
                </>
            );
            break;
        case GospelStepLayoutType.PositiveCounter:
            RatingEl = (
                <>
                    <AppText>
                        Positive Counter Rating: {gospelStep.rating}
                    </AppText>
                </>
            );
            break;
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageRow style={[gridStyles.itemCard, completed && styles.completed, selected && styles.selected, style]}>
                <Image source={icon} style={styles.icon} />
                <PageColumn style={styles.actionStepTextContainer}>
                    <PageColumn style={{ flexShrink: 1, width: '100%' }}>
                        <AppText type={TextType.Subtitle3} style={{ fontSize: 20 }}>{mapGospelStepTypeToTitle(gospelStep.type)}</AppText>
                        <AppText type={TextType.Italic} style={{}}>{mapGospelStepTypeToDetails(gospelStep.type)}</AppText>
                    </PageColumn>

                    {RatingEl}

                    <AppText type={TextType.Italic}>
                        Tap for more info
                    </AppText>

                    {
                        selected && (
                            <PageColumn>
                                <AppText type={TextType.Italic}>{formatDateTime(gospelStep.date)}</AppText>

                                {
                                    gospelStep.notes && (
                                        <PageRow style={{ flexShrink: 1, width: '90%' }}>
                                            <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{gospelStep.notes}</AppText>
                                        </PageRow>
                                    )
                                }

                                {
                                    gospelStep.nextSteps && (
                                        <PageRow style={{ flexShrink: 1, width: '90%' }}>
                                            <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{gospelStep.nextSteps}</AppText>
                                        </PageRow>
                                    )
                                }

                            </PageColumn>
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
        backgroundColor: Colors.selected,
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