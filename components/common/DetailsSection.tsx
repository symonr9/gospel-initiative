import React, { useEffect } from "react";
import { ViewProps, StyleSheet, GestureResponderEvent, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { AppText, TextType } from "./AppText";
import { PageColumn } from "./PageColumn";
import { AppIcon } from "@/enums/enums";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { halfScreenWidth } from "@/constants/Dimensions";
import { Colors } from "react-native/Libraries/NewAppScreen";


export type IDetailsSection = ViewProps & {
    iconSrc: AppIcon | string,
    prefix?: any,
    title?: any,
    onClick?: Function;
};

function DetailsSection({ iconSrc, title, prefix, onClick, style }: IDetailsSection) {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    useEffect(() => {
        opacity.value = 0;  // fade out
        scale.value = 0.5;  // shrink

        // Delay to allow fading out, then change text and fade back in
        setTimeout(() => {
            opacity.value = withTiming(1, { duration: 300 });  // fade in
            scale.value = withTiming(1, { duration: 300 });    // grow back
        }, 200);
    }, [title]);

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageColumn style={[styles.container, style]}>
                <Image source={iconSrc} style={styles.icon} />
                <PageColumn style={{ marginTop: 6, flexShrink: 1, maxWidth: halfScreenWidth - 60 }}>
                    <AppText type={TextType.Body} style={{ color: Colors.light.text }}>{prefix}</AppText>
                    <Animated.Text style={animatedStyle}>
                        <AppText type={TextType.DefaultSemiBold} style={{ color: Colors.light.text }}>{title}</AppText>
                    </Animated.Text>
                </PageColumn>
            </PageColumn>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
});

export default DetailsSection;