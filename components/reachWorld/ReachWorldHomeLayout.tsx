import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import MissionsTrip from '@/models/missionsTrip';
import { ThemedView } from '../common/ThemedView';
import ScrollLayout from '../common/ScrollLayout';
import { AppIcon } from '@/enums/enums';
import DetailsSection from '../common/DetailsSection';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectAllMinistryActivitiesByExecutor } from '@/redux/selectors';

export type IReachWorldHomeLayout = ViewProps & {
    missionsTrips: MissionsTrip[];
};

function ReachWorldHomeLayout({ missionsTrips }: IReachWorldHomeLayout) {

    return (
        <ScrollLayout>
            <AnimatedHeader title={'Reach the World'}/>
            <PageRow>
                <DetailsSection iconSrc={AppIcon.Globe} 
                    prefix={'Missions Trips'}
                    title={missionsTrips.length}/>
            </PageRow>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state: any) => {

    const { missionsTripActivities } = selectAllMinistryActivitiesByExecutor(state);
    return {
        missionsTrips: state.missionsTrips.missionsTrips,
        missionsTripActivities
    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorldHomeLayout);