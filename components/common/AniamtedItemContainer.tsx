import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ThemedText, ThemedTextType } from './ThemedText';
import { flexStyles } from '@/styles/Styles';
import { ThemedView } from './ThemedView';

export type IAnimatedItemContainer = {
    iconSrc: string | null;
    title: string;
    containerDuration?: number;
    containerDelay?: number;
    itemDuration?: number;
    itemDelay?: number;
    itemsToRender: React.ReactNode[];
}

export function AnimatedItemContainer({ iconSrc = null, title = '',
    containerDuration = 200, containerDelay = 0, 
    itemDuration = 200, itemDelay = 400, itemsToRender
 }: IAnimatedItemContainer) {

    return (
        <Animated.View entering={FadeInDown.duration(containerDuration).delay(containerDelay)}>
            <TouchableOpacity>
                <ThemedView style={styles.container}>
                    <View style={flexStyles.row}>
                        <View style={flexStyles.column}>
                            <Animated.Text
                                entering={FadeInUp.duration(itemDuration).delay(itemDelay)}
                                style={[]} >
                                <ThemedText type={ThemedTextType.Prefix}>
                                    {title}
                                </ThemedText>
                            </Animated.Text>
                        </View>
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#d9ead3',
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        marginTop: 12,
        marginBottom: 12
    },
    icon: {
        width: 32,
        height: 32,
        marginEnd: 8,
        alignSelf: 'center',
    },
});