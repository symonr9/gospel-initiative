
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { formatDateTimeSimple, getDaysDifference } from '@/utils/appUtils';
import { mapOneCategoryToIcon } from "@/utils/iconUtils";
import { mapOneCategoryToTitle } from "@/utils/textUtils";
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import Christian from '@/models/christian';
import DetailsSection from '../common/DetailsSection';
import { gridStyles } from '@/styles/Styles';

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
            <PageColumn style={[gridStyles.itemCard, selected && gridStyles.selected, style]}>
                <PageRow style={{ marginBottom: 8 }}>
                    <Image source={christian.icon} style={styles.icon} />
                    <AppText type={TextType.Subtitle} style={{ alignSelf: 'center' }}>
                        {christian.name}
                    </AppText>
                </PageRow>

                <PageRow style={styles.section}>
                    <DetailsSection iconSrc={mapOneCategoryToIcon(christian.oneCategory)}
                        prefix={"Relationship with your One"}
                        onClick={handleOnPress}
                        title={mapOneCategoryToTitle(christian.oneCategory)} />
                    <DetailsSection iconSrc={mapOneCategoryToIcon(christian.category)}
                        prefix={"Relationship with You"}
                        onClick={handleOnPress}
                        title={mapOneCategoryToTitle(christian.category)} />
                </PageRow>

                <PageRow style={styles.section}>
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
                        <PageColumn style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Notes
                            </AppText>
                            <AppText type={TextType.Body}>
                                {christian.notes}
                            </AppText>
                        </PageColumn>
                    )
                }

                {
                    christian.mutualInterests && (
                        <PageColumn style={styles.section}>
                            <AppText type={TextType.DefaultSemiBold}>
                                Mutual Interests
                            </AppText>
                            <AppText type={TextType.Body}>
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
    section: {
        margin: 4,
        width: 250,
        flexShrink: 1,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        paddingBottom: 9,
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