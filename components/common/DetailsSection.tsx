import React, { useEffect } from "react";
import one from "@/models/one";
import { mapStageToIcon, mapStageToText } from "@/utils/appUtils";
import { ViewProps, View, StyleSheet } from "react-native";
import { AnimatedCount } from "./AnimatedCount";
import { Image } from "expo-image";
import { AppText, TextType } from "./AppText";
import { PageRow } from "./PageRow";
import { PageColumn } from "./PageColumn";
import { AppIcon, OneStage } from "@/enums/enums";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeInUp } from 'react-native-reanimated';


export type IDetailsSection = ViewProps & {
    iconSrc: AppIcon | string,
    prefix?: any,
    title?: any
};

function DetailsSection({ iconSrc, title, prefix, style }: IDetailsSection) {
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

    return (
        <PageColumn style={style}>
            <Image source={iconSrc} style={styles.icon} />
            <PageColumn style={{ marginTop: 6, flexShrink: 1, maxWidth: 200 }}>
                <AppText type={TextType.Body}>{prefix}</AppText>
                <Animated.Text style={animatedStyle}>
                    <AppText type={TextType.DefaultSemiBold}>{title}</AppText>
                </Animated.Text>
            </PageColumn>
        </PageColumn>
    );
}


const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28,
        marginRight: 12,
    },
});

export default DetailsSection;