import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, Animated, Easing, type ViewProps, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { AppIcon } from '@/enums/enums';


export type IBoatLighthouseSection = {

}

export function BoatLighthouseSection({ }: IBoatLighthouseSection) {
    const screenWidth = Dimensions.get('window').width;
    const boatRotation = useRef(new Animated.Value(0)).current;

    const getTimingAnim = (value: number) => (
        Animated.timing(boatRotation, {
            toValue: value,
            duration: 2000 + Math.random() * 500, // Slight variation in duration
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        })
    );

    useEffect(() => {
        const startSwaying = () => {
            Animated.loop(
                Animated.sequence([
                    getTimingAnim(-0.8),
                    getTimingAnim(0.8),
                    getTimingAnim(-0.4),
                    getTimingAnim(0.6),
                    getTimingAnim(-0.2),
                    getTimingAnim(0.4),
                    getTimingAnim(0)
                ])
            ).start();
        };

        startSwaying();
    }, [boatRotation]);

    const boatInterpolate = boatRotation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-5deg', '5deg'], // Gentle rocking motion
    });

    const boatStyle = {
        transform: [{ rotate: boatInterpolate }],
    };

    return (
        <View style={styles.boatLightHouseContainer}>
            <Animated.View style={[styles.lighthouseContainer]}>
                <Image source={AppIcon.LightHouse} style={styles.lightHouse} />
            </Animated.View>
            <Animated.View style={[styles.boatContainer, boatStyle]}>
                <Image source={AppIcon.Boat} style={styles.boat} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    boatLightHouseContainer: {
        position: 'absolute',
        bottom: 220,
        right: 0,
        display: 'flex',
    },
    boatContainer: {
        position: 'absolute',
        bottom: 0,
        right: 60,
        height: 10,
        width: 80,
    },
    boat: {
        width: 48,
        height: 48,
    },
    lighthouseContainer: {
        position: 'absolute',
        bottom: 0,
        right: 340,
        height: 80,
        width: 80,
    },
    lightHouse: {
        width: 120,
        height: 120,
        opacity: 0.8,
    },
});