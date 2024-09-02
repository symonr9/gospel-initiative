import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
} from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { ThemedView } from '../common/ThemedView';
import { StoryLayoutType } from './ShareChristStoriesLayout';

export type IShareChristStoriesContainer = {
    iconSrc: string | null;
    title: string;
    itemsToRender: React.ReactNode[];
    customStyles?: any;
    activeStoryId: string | null;

    type: StoryLayoutType;
    activeType: StoryLayoutType;
    setActiveType: (type: StoryLayoutType) => void;
}

export function ShareChristStoriesContainer({
    iconSrc = null,
    title = '',
    itemsToRender,
    customStyles,
    activeStoryId,
    type,
    activeType,
    setActiveType
}: IShareChristStoriesContainer) {
    if (activeStoryId !== null) {
        return <></>;
    }

    return (
        <ThemedView style={[styles.container, customStyles?.container]}>
            <View style={[styles.header, customStyles?.header]}>
                {iconSrc && (
                    <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                )}
                <AppText type={TextType.BodyBold}>
                    {title}
                </AppText>
            </View>

            <Animated.View
                style={[styles.itemsContainer, customStyles?.itemsContainer]}>
                {itemsToRender.map((item, index) => item)}
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginEnd: 4,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: 10,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'scroll',
        height: 600,
        width: 200,
    },
    icon: {
        width: 24,
        height: 24,
        marginEnd: 8,
        alignSelf: 'center',
    },
});
