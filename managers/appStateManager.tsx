
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import User from '@/models/user';
import {  setSelectedTemplateId } from '@/redux/actions';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';

export type IAppStateManager = {
    executor: User;
    selectedOneId: string | null;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
};

function AppStateManager({ executor, selectedOneId, selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId }: IAppStateManager) {

    useEffect(() => {
        const shouldAddBeacon = selectedTemplateId != null 
            && executor != null
            && selectedOneId != null;

        if (shouldAddBeacon) {
            setSelectedTemplateId(null);
        }
    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    selectedOneId: state.ones.selectedOneId,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates,
});

const mapDispatchToProps = {
    setSelectedTemplateId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);