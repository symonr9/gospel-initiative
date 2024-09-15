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
import MinistryActivity from '@/models/ministryActivity';

export type IReachWorldHomeLayout = ViewProps & {
    missionsTrips: MissionsTrip[];
    missionsTripActivities: MinistryActivity[];
};

function ReachWorldHomeLayout({ missionsTrips, missionsTripActivities }: IReachWorldHomeLayout) {

    console.log("missionsTripActivities: ", missionsTripActivities);

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
    container: {
        display: 'flex',
        marginEnd: 4,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: 10,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'scroll',
    },
    icon: {
        width: 24,
        height: 24,
        marginEnd: 8,
        alignSelf: 'center',
    },
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