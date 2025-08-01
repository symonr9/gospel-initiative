import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect, useSelector } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import One from '@/models/one';
import { selectActiveBeaconsWithActivities, selectBeaconsByUserId, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { setActiveOnesLayoutNormalBodyType } from '@/redux/actions';
import { OneLayoutType } from '../ones/OnesLayout';
import { OnesLayoutNormalBodyType } from '../ones/layout/OnesLayoutNormal';

export type IHomeActiveBeaconCard = ViewProps & {
    executor: User;
    setActiveOnesLayoutNormalBodyType: Function;
};

function HomeActiveBeaconCard({ executor, setActiveOnesLayoutNormalBodyType }: IHomeActiveBeaconCard) {
    const router = useRouter();

    const activeBeaconsWithActivities = useSelector(selectBeaconsByUserId(executor?.id)) || [];

    const onClick = () => {
        setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Beacons);
        router.replace('/ones?tab=0');
    };

    if (!executor || activeBeaconsWithActivities.length === 0) {
        return <></>;
    }

    const activeBeacon = activeBeaconsWithActivities[0];
    const totalNumOfActivities = activeBeaconsWithActivities
        .flatMap(obj => obj.activities)
        .reduce((sum, activity) => sum + 1, 0);

    const onlyHasOne = totalNumOfActivities === 1;

    const title = activeBeaconsWithActivities.length === 1 ? `Active Beacon: ${activeBeacon.name}` : `${activeBeaconsWithActivities.length} Active Beacons`;
    const subtitle = onlyHasOne
        ? 'You beacon has been prayed for once. Tap to see details and notes!'
        : `Your beacon has been prayed for ${totalNumOfActivities} time. Tap to see details and notes!`;

    return (
        <SimpleCard iconSrc={AppIcon.LightHouse}
            style={[styles.card]}
            title={title}
            subtitle={subtitle}
            onClick={onClick} />
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
});


const mapDispatchToProps = {
    setActiveOnesLayoutNormalBodyType,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeActiveBeaconCard);
