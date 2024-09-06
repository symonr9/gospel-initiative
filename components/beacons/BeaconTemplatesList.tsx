
import React from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import { BeaconTemplateCard } from './BeaconTemplateCard';
import { listStyles } from '@/styles/Styles';
import { ShareChristPageState } from '@/enums/enums';
import { setSelectedTemplateId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';
import BeaconTemplate from '@/models/beaconTemplate';
import BeaconTemplateDetails from './BeaconTemplateDetails';

export type IBeaconTemplatesList = ViewProps & {
    shareChristPageState: ShareChristPageState;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
};

function BeaconTemplatesList({ shareChristPageState, selectedTemplateId,
    beaconTemplates, setSelectedTemplateId }: IBeaconTemplatesList) {

    const renderItem = ({ item }: { item: BeaconTemplate }) => {
        if (selectedTemplateId != null) {
            if (item.id !== selectedTemplateId) {
                return <></>;
            }
            return (
                <BeaconTemplateDetails template={item}/>
            );
        }
        return (
            <BeaconTemplateCard template={item}
                setSelectedTemplateId={setSelectedTemplateId}
                selectedTemplateId={selectedTemplateId} />
        );
    };

    // TODO: From here, show a card slideshow of all active beacons for this one. They can choose to 'Complete' a beacon
    // and then from here, they create a beacon log before they can send another beacon giving them the opportunity to
    // report on the occasion.

    return (
        <View style={[listStyles.container, styles.container]}>
            <BeaconsListHeader shareChristPageState={shareChristPageState} selectedTemplateId={selectedTemplateId}/>
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
        display: 'flex',
        maxHeight: 600,
        overflow: 'scroll'
    },
});

const mapStateToProps = (state: any) => ({
    shareChristPageState: state.app.shareChristPageState,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates
});


const mapDispatchToProps = {
    setSelectedTemplateId
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplatesList);