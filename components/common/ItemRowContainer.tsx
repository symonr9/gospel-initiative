import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate
} from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon, ItemRowContainerType } from '@/enums/enums';
import { PageRow } from './PageRow';
import ScrollLayout from './ScrollLayout';
import { useThemeColors } from '@/constants/Colors';
import { StyledImage } from './StyledImage';

export type IItemRowContainer = {
    iconSrc: AppIcon | null;
    title: string;
    itemsToRender: React.ReactNode[];
    customStyles?: any;
    expandedHeight?: number;
    isTopPosition?: boolean;

    type?: ItemRowContainerType;
    activeType?: ItemRowContainerType;
    setActiveType?: Function | null;
    useTextTintForIcon?: boolean;
}

export function ItemRowContainer({
    iconSrc = null,
    title = '',
    itemsToRender,
    customStyles = {},
    type = ItemRowContainerType.Incoming,
    expandedHeight = 90,
    isTopPosition = true,
    activeType = ItemRowContainerType.Incoming,
    setActiveType = null,
    useTextTintForIcon = true,
}: IItemRowContainer) {
    const heightProgress = useSharedValue(0);
    const { textColor } = useThemeColors();

    const animatedStyle = useAnimatedStyle(() => {
        const height = interpolate(
            heightProgress.value,
            [0, 1],
            [0, expandedHeight]
        );
        return {
            height: withTiming(height, { duration: 400 }),
        }
    });

    const isActive = type === activeType;
    const onPress = () => {
        if (!isActive && setActiveType) {
            setActiveType(type);
        }
    };

    useEffect(() => {
        heightProgress.value = withTiming(isActive ? 1 : 0, { duration: 50 });
    }, [activeType]);

    const navIcon = isTopPosition ? AppIcon.ChevronDown : AppIcon.ChevronUp;

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.container, customStyles?.container]}>
                <PageRow spaceBetween>
                    <PageRow>
                        {iconSrc && (
                            <StyledImage iconSrc={iconSrc} style={[styles.icon]} useTextTint={useTextTintForIcon} />
                        )}
                        <AppText type={TextType.Subtitle3} style={[{ color: textColor }, customStyles?.title]}>
                            {title}
                        </AppText>
                    </PageRow>
                    <StyledImage iconSrc={navIcon} style={[styles.icon, isActive && styles.hide]} />
                </PageRow>

                <ScrollLayout horizontal
                    style={[{ paddingHorizontal: 4, }, animatedStyle]}>
                    {itemsToRender.map((item, index) => (
                        <View key={index}>{item}</View>
                    ))}
                </ScrollLayout>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 2,
    },
    icon: {
        width: 26,
        height: 26,
        marginEnd: 8,
        alignSelf: 'center',
    },
    hide: {
        display: 'none'
    }
});
