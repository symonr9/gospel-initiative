
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';

import { AppText, TextType } from '../common/AppText';
import ActionStep from '@/models/actionStep';
import { AppIcon, GospelStepLayoutType, GospelStepType } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, isGospelStepCompleted, mapActionStepTypeToDetails, mapActionStepTypeToIcon, mapActionStepTypeToTitle, mapGospelStepBinaryRatingToText, mapGospelStepScaleRatingToText, mapGospelStepTypeToDetails, mapGospelStepTypeToIcon, mapGospelStepTypeToTitle } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import { formStyles, gridStyles } from '@/styles/Styles';
import GospelStep from '@/models/gospelStep';

import Slider from '@react-native-community/slider';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import SimpleIconButton from '../common/SimpleIconButton';

export type IGospelStepCard = ViewProps & {
    gospelStep: GospelStep;
    threshold: number; // Maximum value for a Step to be considered complete.
    handleOnPress?: Function;
    handleOnRatingChange?: Function;
    handleOnEdit?: Function;
    selected?: Boolean;
    showNotes?: Boolean;
};

export function GospelStepCard({ gospelStep, threshold, handleOnPress, handleOnRatingChange,
    handleOnEdit, selected = false, showNotes = true, style }: IGospelStepCard) {

    const readOnly = !handleOnPress && !handleOnRatingChange && !handleOnEdit;

    const onPress = () => {
        if (handleOnPress) {
            handleOnPress();
        }
    }

    const onRatingChange = (newStep: any) => {
        if (handleOnRatingChange) {
            handleOnRatingChange(newStep);
        }
    }

    const onEdit = () => {
        if (handleOnEdit) {
            handleOnEdit();
        }
    }

    const completed = isGospelStepCompleted(gospelStep, threshold);
    const icon = completed ? AppIcon.Checkmark : mapGospelStepTypeToIcon(gospelStep.type);

    let RatingEl = <></>;
    switch (gospelStep.layoutType) {
        case GospelStepLayoutType.Binary:
            const onBinaryChange = () => onRatingChange({ ...gospelStep, rating: completed ? 0 : 2 });
            RatingEl = (
                <PageRow style={{ marginVertical: 8 }}>
                    <Checkbox
                        value={completed}
                        disabled={readOnly}
                        onValueChange={onBinaryChange}
                        color={completed ? '#8ce665' : undefined}
                        style={[formStyles.checkbox, { alignSelf: 'center', marginStart: 4, marginEnd: 12 }]}
                    />
                    <TouchableOpacity onPress={onBinaryChange}>
                        <PageRow style={{ width: 200 }}>
                            <AppText type={TextType.Subtitle2}>
                                {mapGospelStepBinaryRatingToText(gospelStep.type, completed)}
                            </AppText>
                        </PageRow>
                    </TouchableOpacity>
                </PageRow>
            );
            break;
        case GospelStepLayoutType.Scale:
            RatingEl = (
                <PageColumn style={{ gap: 8, marginVertical: 8 }}>
                    <PageColumn>
                        <AppText type={TextType.Subtitle3}>
                            Rating: {gospelStep.rating}
                        </AppText>
                        <AppText type={TextType.Italic}>
                            {mapGospelStepScaleRatingToText(gospelStep.rating)}
                        </AppText>
                    </PageColumn>

                    <PageRow>
                        <AppText>
                            0
                        </AppText>
                        <Slider
                            style={{ width: 220, height: 40 }}
                            disabled={readOnly}
                            minimumValue={0}
                            value={gospelStep.rating}
                            maximumValue={5}
                            step={1}
                            onSlidingComplete={(value: number) => onRatingChange({ ...gospelStep, rating: value })}
                            minimumTrackTintColor={Colors.sharpGood}
                            maximumTrackTintColor={Colors.info}
                        />
                        <AppText>
                            5
                        </AppText>
                    </PageRow>
                </PageColumn>
            );
            break;
        case GospelStepLayoutType.BinaryCounter:
        case GospelStepLayoutType.PositiveCounter:
            RatingEl = (
                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText type={TextType.Subtitle}>
                        Counter: {gospelStep.rating}
                    </AppText>
                    <PageRow style={{ gap: 24 }}>
                        <SimpleButton type={ButtonType.Close}
                            text={'Decrease'}
                            disabled={readOnly}
                            style={{ marginTop: 4 }}
                            onPress={() => onRatingChange({ ...gospelStep, rating: (gospelStep.rating - 1 >= 0) ? gospelStep.rating - 1 : 0 })} />
                        <SimpleButton type={ButtonType.Save}
                            text={'Increase'}
                            disabled={readOnly}
                            style={{ marginTop: 4 }}
                            onPress={() => onRatingChange({ ...gospelStep, rating: gospelStep.rating + 1 })} />
                    </PageRow>
                </PageColumn>
            );
            break;
    }

    return (
        <TouchableOpacity onPress={onPress} style={[style]}>
            <PageRow style={[gridStyles.itemCard, completed && styles.completed, selected && styles.selected]}>
                <Image source={icon} style={styles.icon} />
                <PageColumn style={styles.actionStepTextContainer}>
                    <PageColumn style={{ flexShrink: 1, width: '100%' }}>
                        <AppText type={TextType.Subtitle3} style={{ fontSize: 20 }}>{mapGospelStepTypeToTitle(gospelStep.type)}</AppText>
                        <AppText type={TextType.Italic} style={{}}>{mapGospelStepTypeToDetails(gospelStep.type)}</AppText>
                    </PageColumn>

                    {RatingEl}

                    {
                        selected && (
                            <PageColumn style={{ marginTop: 8, gap: 4 }}>
                                <AppText type={TextType.Italic} style={{ marginBottom: 12 }}>{formatDateTime(gospelStep.date)}</AppText>

                                {
                                    showNotes && (
                                        <>
                                            {
                                                gospelStep.notes && (
                                                    <PageColumn style={{ flexShrink: 1, width: '90%' }}>
                                                        <AppText type={TextType.Subtitle3}>
                                                            Notes
                                                        </AppText>
                                                        <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{gospelStep.notes}</AppText>
                                                    </PageColumn>
                                                )
                                            }

                                            {
                                                gospelStep.nextSteps && (
                                                    <PageColumn style={{ flexShrink: 1, width: '90%' }}>
                                                        <AppText type={TextType.Subtitle3}>
                                                            Next Steps
                                                        </AppText>
                                                        <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{gospelStep.nextSteps}</AppText>
                                                    </PageColumn>
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    !readOnly && (
                                        <PageRow>
                                            <SimpleButton type={ButtonType.Open}
                                                text={'Edit Notes'}
                                                onPress={onEdit} />
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
        width: 42,
        height: 42,
        alignSelf: 'center',
        marginEnd: 12
    }
});