
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions, Animated } from 'react-native';

import { BeaconTemplateCard } from './BeaconTemplateCard';
import { formStyles, listStyles } from '@/styles/Styles';
import { isEditing } from '@/utils/appUtils';
import { ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import { setSelectedTemplateId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';
import Beacon from '@/models/beacon';
import BeaconTemplate from '@/models/beaconTemplate';

export type IBeaconTemplatesList = ViewProps & {
    onlyActive?: boolean;

    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
};

function BeaconTemplatesList({ selectedOne, shareChristPageState, selectedTemplateId,
    beaconTemplates, setSelectedTemplateId, onlyActive = false }: IBeaconTemplatesList) {

    const renderItem = ({ item }: { item: BeaconTemplate }) => (
        <BeaconTemplateCard template={item}
                            onlyActive={onlyActive}
                            shareChristPageState={shareChristPageState}
                            setSelectedTemplateId={setSelectedTemplateId}
                            selectedTemplateId={selectedTemplateId} />
    );

    return (
        <View style={[listStyles.container, styles.container]}>
            <BeaconsListHeader shareChristPageState={shareChristPageState} 
                                     onlyActive={onlyActive}/>
            <FlatList
                data={beaconTemplates}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates
});


const mapDispatchToProps = {
    setSelectedTemplateId
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplatesList);