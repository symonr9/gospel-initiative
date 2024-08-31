import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, Animated, Easing, type ViewProps, Dimensions } from 'react-native';

import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';
import { AnimatedRoadItemContainer } from '../common/AnimatedRoadItemContainer';
import SimpleIconButton from '../common/SimpleIconButton';
import { ShareChristBeaconDetails } from './ShareChristBeaconDetails';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import { BoatLighthouseSection } from '../common/BoatLighthouseElement';

export type IShareChristBeaconsContainer = ViewProps & {
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];
    shareChristPageState: ShareChristPageState;
};

function ShareChristBeaconsContainer({ completedBeacons, incomingBeacons, shareChristPageState }: IShareChristBeaconsContainer) {
    console.log("completedBeacons: ", completedBeacons);
    console.log("incomingBeacons: ", incomingBeacons);

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

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.completedActivities}
                               idx={idx}
                               selectedIdx={completedCursorIdx}
                               setSelectedIdx={setCompletedCursorIdx}/>
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.incomingActivities}
                               idx={idx}
                               selectedIdx={incomingCursorIdx}
                               setSelectedIdx={setIncomingCursorIdx}/>
    )) : [];

    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

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

            <BoatLighthouseSection/>

            <View>
                <AnimatedRoadItemContainer title={`Completed (${completedCount})`} 
                                        iconSrc={AppIcon.Checkmark} 
                                        itemsToRender={completedItemsToRender} 
                                        customStyles={completedStyle}/>
                <AnimatedRoadItemContainer title={`Incoming (${incomingCount})`} 
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