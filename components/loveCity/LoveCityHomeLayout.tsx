import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalMinistry from '@/models/localMinistry';
import LocalEvent from '@/models/localEvent';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import { AppIcon } from '@/enums/enums';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectAllMinistryActivitiesByExecutor } from '@/redux/selectors';
import MinistryActivity from '@/models/ministryActivity';
import ActivityContainer from '../common/ActivityContainer';

export type ILoveCityHomeLayout = ViewProps & {
    localMinistries: LocalMinistry[];
    localEvents: LocalEvent[];
    eventActivities: MinistryActivity[];
    ministryActivities: MinistryActivity[];
};

function LoveCityHomeLayout({ localMinistries, localEvents, eventActivities, ministryActivities }: ILoveCityHomeLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    console.log("localMinistries: ", localMinistries);
    console.log("localEvents: ", localEvents);
    console.log("eventActivities: ", eventActivities);
    console.log("ministryActivities: ", ministryActivities);

    const allActivities = eventActivities.concat(ministryActivities).sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <ScrollLayout>
            <AnimatedHeader title={'Love the City'}/>
            <PageRow style={{ gap: 32 }}>
                <DetailsSection iconSrc={AppIcon.Calendar} 
                    prefix={'Local Events'}
                    title={localEvents.length}/>
                <DetailsSection iconSrc={AppIcon.NightPark} 
                                prefix={'Local Ministries'}
                                title={localMinistries.length}/>
            </PageRow>

            <ActivityContainer activities={allActivities} 
                               />
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state: any) => {
    const { eventActivities, ministryActivities } = selectAllMinistryActivitiesByExecutor(state);
    return {
        localMinistries: state.ministries.localMinistries,
        localEvents: state.ministries.localEvents,
        eventActivities,
        ministryActivities
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityHomeLayout);