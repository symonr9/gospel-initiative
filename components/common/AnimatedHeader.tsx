import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { standardPaddedWidth } from '@/constants/Dimensions';
import { Colors, useThemeColors } from '@/constants/Colors';

type IAnimatedHeader = {
    title: string;
    titleType?: TextType;
    subtitle?: string | null;
    duration?: number;
    delay?: number;
    key?: string | null;
    overridingTextColor?: string | null;
    useOppositeTextColor?: boolean;
    style?: any;
};

export function AnimatedHeader({ title, key = null, titleType = TextType.Subtitle, 
    subtitle = null, duration = 400, delay = 0, style = {}, overridingTextColor = null, 
    useOppositeTextColor = false }: IAnimatedHeader) {
        
    const { textColor: themedTextColor } = useThemeColors();

    const textColor = useOppositeTextColor ? (themedTextColor === Colors.light.text ? Colors.dark.text : Colors.light.text) : themedTextColor;

    return (
        <View style={[styles.container, style]}>
            <Animated.Text
                key={`${key}-title`}
                entering={FadeInUp.duration(duration).delay(delay)}
                style={[{ marginStart: 4, marginTop: 8 }]} >
                <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
                    <AppText type={titleType} style={{ color: overridingTextColor || textColor }}>
                        {title}
                    </AppText>
                </PageRow>
            </Animated.Text>
            {
                subtitle && (
                    <Animated.Text
                        key={`${key}-subtitle`}
                        entering={FadeInUp.duration(duration).delay(delay + 200)}
                        exiting={FadeOutDown.duration(duration)}
                        style={[{ marginStart: 4 }]} >
                        <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
                            <AppText type={TextType.Body} style={{ color: overridingTextColor || textColor }}>
                                {subtitle}
                            </AppText>
                        </PageRow>
                    </Animated.Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
});
