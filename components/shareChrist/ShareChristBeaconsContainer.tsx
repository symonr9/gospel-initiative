import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps, StyleSheet } from 'react-native';

import { selectAllActivePrayerBeaconsEnhanced, selectPartitionedActiveEnhancedPrayerBeacons } from '@/redux/selectors';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { PrayerBeaconEnhanced } from '@/models/prayerBeacon';
import { AnimatedItemContainer } from '../common/AnimatedItemContainer';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';
import { AnimatedRoadItemContainer } from '../common/AnimatedRoadItemContainer';
import SimpleIconButton from '../common/SimpleIconButton';
import { ThemedText, ThemedTextType } from '../common/ThemedText';

export type IShareChristBeaconsContainer = ViewProps & {
    completedBeacons: PrayerBeaconEnhanced[];
    incomingBeacons: PrayerBeaconEnhanced[];
    shareChristPageState: ShareChristPageState;
};

function ShareChristBeaconsContainer({ completedBeacons, incomingBeacons, shareChristPageState }: IShareChristBeaconsContainer) {
    console.log("completedBeacons: ", completedBeacons);
    console.log("incomingBeacons: ", incomingBeacons);

    const [selectedIdx, setSelectedIdx] = useState(null);

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard prayerBeacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.activities}
                               idx={idx}
                               selectedIdx={selectedIdx}
                               setSelectedIdx={setSelectedIdx}/>
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard prayerBeacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.activities}
                               idx={idx}
                               selectedIdx={selectedIdx}
                               setSelectedIdx={setSelectedIdx}/>
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
                <View style={styles.beaconDetails}>
                    <ThemedText type={ThemedTextType.Title}>
                        Hello
                    </ThemedText>
                </View>
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
        height: 800,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
    },
    beaconDetails: {
        flex: 1,
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
    const { completedBeacons, incomingBeacons } = selectPartitionedActiveEnhancedPrayerBeacons(state);
    return {
        completedBeacons,
        incomingBeacons,
        shareChristPageState: state.app.shareChristPageState
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsContainer);