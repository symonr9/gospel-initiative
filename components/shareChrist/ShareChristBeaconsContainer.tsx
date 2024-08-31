import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, Animated, Easing, type ViewProps, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';
import { AnimatedRoadItemContainer } from '../common/AnimatedRoadItemContainer';
import SimpleIconButton from '../common/SimpleIconButton';
import { ShareChristBeaconDetails } from './ShareChristBeaconDetails';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';

export type IShareChristBeaconsContainer = ViewProps & {
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];
    shareChristPageState: ShareChristPageState;
};

function ShareChristBeaconsContainer({ completedBeacons, incomingBeacons, shareChristPageState }: IShareChristBeaconsContainer) {
    console.log("completedBeacons: ", completedBeacons);
    console.log("incomingBeacons: ", incomingBeacons);

    const screenWidth = Dimensions.get('window').width;
    const boatRotation = useRef(new Animated.Value(0)).current;

    const [completedCursorIdx, setCompletedCursorIdx] = useState(null);
    const [incomingCursorIdx, setIncomingCursorIdx] = useState(null);
    const [togglingCursor, setTogglingCursor] = useState(true);

    useEffect(() => {
        if (incomingCursorIdx !== null && togglingCursor) {
            setTogglingCursor(false);
            setIncomingCursorIdx(null);
        } else {
            setTogglingCursor(true);
        }
    }, [completedCursorIdx]);

    useEffect(() => {
        if (completedCursorIdx !== null && togglingCursor) {
            setTogglingCursor(false);
            setCompletedCursorIdx(null);
        } else {
            setTogglingCursor(true);
        }
    }, [incomingCursorIdx]);

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


    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.activities}
                               idx={idx}
                               selectedIdx={completedCursorIdx}
                               setSelectedIdx={setCompletedCursorIdx}/>
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.activities}
                               idx={idx}
                               selectedIdx={incomingCursorIdx}
                               setSelectedIdx={setIncomingCursorIdx}/>
    )) : [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    pageToOpen={Page.ShareChrist}
                    customStyles={{
                        container: {
                            alignSelf: 'flex-start',
                            marginBottom: 16
                        }

                    }}/>

                <ShareChristBeaconDetails incomingCursorIdx={incomingCursorIdx} 
                                          completedCursorIdx={completedCursorIdx} 
                                          completedBeacons={completedBeacons} 
                                          incomingBeacons={incomingBeacons}/>
            </View>

            <View style={styles.boatLightHouseContainer}>
                <Animated.View style={[styles.lighthouseContainer]}>
                    <Image source={AppIcon.LightHouse} style={styles.lightHouse}/>
                </Animated.View>
                <Animated.View style={[styles.boatContainer, boatStyle]}>
                    <Image source={AppIcon.Boat} style={styles.boat} />
                </Animated.View>
            </View>

            <View>
                <AnimatedRoadItemContainer title={'Completed'} 
                                        iconSrc={AppIcon.Checkmark} 
                                        itemsToRender={completedItemsToRender} 
                                        customStyles={completedStyle}/>
                <AnimatedRoadItemContainer title={'Incoming'} 
                            iconSrc={AppIcon.Send} 
                            itemsToRender={incomingItemsToRender} 
                            customStyles={incomingStyle}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 820,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
    },
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

const completedStyle = {
    container: {
        backgroundColor: '#d9ead3'
    },
    header: {

    },
    itemsContainer: {

    }
};

const incomingStyle = {
    container: {
        backgroundColor: 'lightgray'
    },
    header: {

    },
    itemsContainer: {

    }
};

const mapStateToProps = (state: any) => {
    const { completedBeacons, incomingBeacons } = selectPartitionedActiveEnhancedBeacons(state);
    return {
        completedBeacons,
        incomingBeacons,
        shareChristPageState: state.app.shareChristPageState
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsContainer);