import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';
import { ShareChristRoadContainer } from './ShareChristRoadContainer';
import SimpleIconButton from '../common/SimpleIconButton';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import ShareChristBeaconDetails from './ShareChristBeaconDetails';

export type IShareChristBeaconsLayout = ViewProps & {
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];
    shareChristPageState: ShareChristPageState;
};

export enum RoadContainerType {
    Completed = 1,
    Incoming = 2
};

function ShareChristBeaconsLayout({ completedBeacons, incomingBeacons, shareChristPageState }: IShareChristBeaconsLayout) {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [activeRoadType, setActiveRoadType] = useState(RoadContainerType.Incoming);

    const incomingCursorIdx = incomingBeacons.findIndex((beacon) => beacon.id === activeBeaconId);
    const completedCursorIdx = completedBeacons.findIndex((beacon) => beacon.id === activeBeaconId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.completedActivities}
                               idx={idx}
                               activeBeaconId={activeBeaconId}
                               setActiveBeaconId={setActiveBeaconId}
                               selectedIdx={completedCursorIdx}/>
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               activities={beacon.incomingActivities}
                               idx={idx}
                               activeBeaconId={activeBeaconId}
                               setActiveBeaconId={setActiveBeaconId}
                               selectedIdx={incomingCursorIdx}/>
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

            <View>
                <ShareChristRoadContainer title={`Completed (${completedCount})`} 
                                        iconSrc={AppIcon.Checkmark}
                                        type={RoadContainerType.Completed}                                   
                                        activeType={activeRoadType}
                                        setActiveType={setActiveRoadType}
                                        itemsToRender={completedItemsToRender} 
                                        customStyles={completedStyle}/>
                <ShareChristRoadContainer title={`Incoming (${incomingCount})`} 
                            iconSrc={AppIcon.Send} 
                            type={RoadContainerType.Incoming}
                            activeType={activeRoadType}
                            setActiveType={setActiveRoadType}
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
        gap: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsLayout);