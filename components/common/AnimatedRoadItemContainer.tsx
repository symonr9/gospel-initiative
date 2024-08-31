import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';

export type IAnimatedRoadItemContainer = {
    iconSrc: string | null;
    title: string;
    itemsToRender: React.ReactNode[];
    customStyles?: any;
}

export function AnimatedRoadItemContainer({ iconSrc = null, title = '',
    itemsToRender, customStyles
 }: IAnimatedRoadItemContainer) {

    return (
        <Animated.View>
            <TouchableOpacity>
                <ThemedView style={[styles.container, customStyles.container]}>
                    <View style={[styles.header, customStyles.header]}>
                        {
                            iconSrc && (
                                <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                            )
                        }
                        <AppText type={TextType.DefaultSemiBold}>
                            {title}
                        </AppText>
                    </View>

                    <View style={[styles.itemsContainer, customStyles.itemsContainer]}>
                        {
                            itemsToRender.map((itemToRender) => itemToRender)
                        }
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const { height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start'
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
        width: 32,
        height: 32,
        marginEnd: 8,
        alignSelf: 'center',
    },
});