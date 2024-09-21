
import React from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import { BeaconTemplateCard } from './BeaconTemplateCard';
import { listStyles } from '@/styles/Styles';
import { setSelectedTemplateId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';
import BeaconTemplate from '@/models/beaconTemplate';
import BeaconTemplateDetails from './BeaconTemplateDetails';
import { OneLayoutType } from '../ones/OnesLayout';
import ScrollLayout from '../common/ScrollLayout';

export type IBeaconTemplatesList = ViewProps & {
    activeLayoutType: OneLayoutType;

    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
    setActiveLayoutType: Function;
};

function BeaconTemplatesList({ selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId, activeLayoutType, setActiveLayoutType }: IBeaconTemplatesList) {

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
                setActiveLayoutType={setActiveLayoutType}
                selectedTemplateId={selectedTemplateId} />
        );
    };

    // TODO: From here, show a card slideshow of all active beacons for this one. They can choose to 'Complete' a beacon
    // and then from here, they create a beacon log before they can send another beacon giving them the opportunity to
    // report on the occasion.

    return (
        <View style={[listStyles.container, styles.container]}>
            <BeaconsListHeader activeLayoutType={activeLayoutType} selectedTemplateId={selectedTemplateId}/>
            <ScrollLayout style={{ maxHeight: 300 }}>
                <FlatList
                    data={beaconTemplates}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </ScrollLayout>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
});

const mapStateToProps = (state: any) => ({
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates
});


const mapDispatchToProps = {
    setSelectedTemplateId
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplatesList);