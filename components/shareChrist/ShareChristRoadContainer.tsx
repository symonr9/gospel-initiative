import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate
} from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { ThemedView } from '../common/ThemedView';
import { RoadContainerType } from './ShareChristBeaconsLayout';

export type IShareChristRoadContainer = {
    iconSrc: string | null;
    title: string;
    itemsToRender: React.ReactNode[];
    customStyles?: any;

    type: RoadContainerType;
    activeType: RoadContainerType;
    setActiveType: (type: RoadContainerType) => void;
}

export function ShareChristRoadContainer({
    iconSrc = null,
    title = '',
    itemsToRender,
    customStyles,
    type,
    activeType,
    setActiveType
}: IShareChristRoadContainer) {
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const height = interpolate(
            progress.value,
            [0, 1],
            [0, 90]
        );
        return {
            height: withTiming(height, { duration: 400 }), // Animate height change
        }
    });

    const isActive = type === activeType;
    const onPress = () => {
        if (!isActive) {
            setActiveType(type);
        }
    };

    useEffect(() => {
        progress.value = withTiming(isActive ? 1 : 0, { duration: 200 });
    }, [activeType]);

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.container, customStyles?.container]}>
                <View style={[styles.header, customStyles?.header]}>
                    {iconSrc && (
                        <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                    )}
                    <AppText type={TextType.DefaultSemiBold}>
                        {title}
                    </AppText>
                </View>

                <Animated.View
                    style={[styles.itemsContainer, customStyles?.itemsContainer, animatedStyle]}>
                    {itemsToRender.map((item, index) => (
                        <View key={index}>{item}</View>
                    ))}
                </Animated.View>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 12,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        overflow: 'scroll',
        maxHeight: 800,
        zIndex: 4,
    },
    icon: {
        width: 24,
        height: 24,
        marginEnd: 8,
        alignSelf: 'center',
    },
});
