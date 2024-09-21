import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate
} from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon, RoadContainerType } from '@/enums/enums';
import { PageRow } from './PageRow';
import ScrollLayout from './ScrollLayout';

export type IRoadContainer = {
    iconSrc: AppIcon | null;
    title: string;
    itemsToRender: React.ReactNode[];
    customStyles?: any;
    expandedHeight?: number;
    isTopPosition?: boolean;

    type: RoadContainerType;
    activeType: RoadContainerType;
    setActiveType: (type: RoadContainerType) => void;
}

export function RoadContainer({
    iconSrc = null,
    title = '',
    itemsToRender,
    customStyles,
    type,
    expandedHeight = 90,
    isTopPosition =true,
    activeType,
    setActiveType
}: IRoadContainer) {
    const heightProgress = useSharedValue(0);

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
        if (!isActive) {
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
                            <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                        )}
                        <AppText type={TextType.DefaultSemiBold} style={customStyles.title}>
                            {title}
                        </AppText>
                    </PageRow>
                    <Image source={navIcon} style={[styles.icon, isActive && styles.hide]} contentFit="contain"/>
                </PageRow>

                <ScrollLayout horizontal
                              style={[animatedStyle]}>
                    {itemsToRender.map((item, index) => (
                        <View key={index}>{item}</View>
                    ))}
                </ScrollLayout>
            </ThemedView>
        </TouchableOpacity>
    );
}

const { width: screenWidth, height: screenHeight} = Dimensions.get('window');

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
        width: 20,
        height: 20,
        marginEnd: 16,
        alignSelf: 'center',
    },
    hide: {
        display: 'none'
    }
});
