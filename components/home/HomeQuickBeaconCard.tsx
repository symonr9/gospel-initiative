import React, { useState } from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect, useSelector } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import One from '@/models/one';
import ones from '@/app/(tabs)/ones';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import { setSelectedTemplateId, refreshData, setAppError } from '@/redux/actions';
import BeaconPicker from '../ones/BeaconPicker';
import { selectActiveBeaconsWithActivities } from '@/redux/selectors';

export type IHomeQuickBeaconCard = ViewProps & {
    executor: User;
    ones: One[],
    selectedOneId: string | null;
    beaconForm: BeaconForm,
    beaconTemplates: BeaconTemplate[],
    selectedTemplateId: String,
    setSelectedTemplateId: Function,
    refreshData: Function,
    setAppError: Function,
};

function HomeQuickBeaconCard({ executor, ones, selectedOneId, beaconForm,
    selectedTemplateId, beaconTemplates }: IHomeQuickBeaconCard) {
    const activeBeaconsWithActivities = useSelector(selectActiveBeaconsWithActivities(selectedOneId)) || [];

    if (!executor || ones.length === 0 || activeBeaconsWithActivities.length > 0) {
        return <></>;
    }

    const Body = (
        <>
            <BeaconPicker basicMode={true}/>
        </>
    );

    return (
        <SimpleCard iconSrc={AppIcon.Prayer}
            detailsView={Body}
            style={[styles.card]}
            title={'Send Prayer Beacon'}
            subtitle={'Use this card to send a prayer beacon for your One. Your beacon will be active for 24 hours.'} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16
    },
});

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    ones: state.ones.ones,
    selectedOneId: state.ones.selectedOneId,
    beaconForm: state.beacons.beaconForm,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates,
});


const mapDispatchToProps = {
    setSelectedTemplateId,
    refreshData,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeQuickBeaconCard);
