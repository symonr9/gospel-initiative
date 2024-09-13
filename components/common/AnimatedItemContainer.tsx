import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';

export type IAnimatedItemContainer = {
    iconSrc: AppIcon | null;
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
                    <View style={[styles.header]}>
                        {
                            iconSrc && (
                                <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                            )
                        }
                        <AppText type={TextType.Subtitle}>
                            {title}
                        </AppText>
                    </View>

                    <View style={styles.itemsContainer}>
                        {
                            itemsToRender.map((itemToRender) => itemToRender)
                        }
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'lightgray',
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 12,  
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        overflow: 'scroll',
        maxHeight: 400,
        zIndex: 4,
    },
    icon: {
        width: 32,
        height: 32,
        marginEnd: 8,
        alignSelf: 'center',
    },
});