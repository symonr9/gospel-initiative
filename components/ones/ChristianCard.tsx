
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { formatDateTimeSimple, getDaysDifference, mapOneCategoryToIcon, mapOneCategoryToText } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import Christian from '@/models/christian';
import DetailsSection from '../common/DetailsSection';

export type IChristianCard = ViewProps & {
    christian: Christian;
    handleOnPress?: Function;
    selected?: Boolean;
};

export function ChristianCard({ christian, handleOnPress, selected = false, style }: IChristianCard) {
    const onPress = () => {
        if (handleOnPress) {
            handleOnPress();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageColumn style={[styles.card, selected && styles.selected, style]}>
                <PageRow style={{ marginBottom: 8 }}>
                    <Image source={christian.icon} style={styles.icon} />
                    <AppText type={TextType.Subtitle} style={{ alignSelf: 'center' }}>
                        {christian.name}
                    </AppText>
                </PageRow>

                <PageRow spaceEvenly>
                    <DetailsSection iconSrc={mapOneCategoryToIcon(christian.oneCategory)}
                        prefix={"Relationship with your One"}
                        onClick={handleOnPress}
                        title={mapOneCategoryToText(christian.oneCategory)} />
                    <DetailsSection iconSrc={mapOneCategoryToIcon(christian.category)}
                        prefix={"Relationship with You"}
                        onClick={handleOnPress}
                        title={mapOneCategoryToText(christian.category)} />
                </PageRow>

                <PageRow spaceEvenly>
                    {
                        christian.oneKnownSince && (
                            <PageColumn>
                                <PageRow center>
                                    <DetailsSection iconSrc={AppIcon.Calendar}
                                        prefix={'My One has known for'}
                                        title={`${getDaysDifference(new Date(), christian.oneKnownSince)} Days`}
                                    />
                                </PageRow>
                                <AppText type={TextType.Body} style={{}}>
                                    {formatDateTimeSimple(christian.oneKnownSince)}
                                </AppText>
                            </PageColumn>
                        )
                    }

                    {
                        christian.knownSince && (
                            <PageColumn>
                                <PageRow center>
                                    <DetailsSection iconSrc={AppIcon.Calendar}
                                        prefix={'I have known for'}
                                        title={`${getDaysDifference(new Date(), christian.knownSince)} Days`}
                                    />
                                </PageRow>
                                <AppText type={TextType.Body} style={{}}>
                                    {formatDateTimeSimple(christian.knownSince)}
                                </AppText>
                            </PageColumn>
                        )
                    }
                </PageRow>

                {
                    christian.notes && (
                        <PageColumn style={{ marginVertical: 4 }}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Notes
                            </AppText>
                            <AppText type={TextType.Default}>
                                {christian.notes}
                            </AppText>
                        </PageColumn>
                    )
                }

                {
                    christian.mutualInterests && (
                        <PageColumn style={{ marginVertical: 4 }}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Mutual Interests
                            </AppText>
                            <AppText type={TextType.Default}>
                                {christian.mutualInterests}
                            </AppText>
                        </PageColumn>
                    )
                }
            </PageColumn>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#FFF8DE',
        borderColor: 'lightgray',
        borderWidth: 1,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        gap: 8,
    },
    selected: {
        backgroundColor: '#a2c4c9',
    },
    actionStepTextContainer: {
        flexShrink: 1
    },
    icon: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginEnd: 12
    }
});