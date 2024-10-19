import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import BeaconsHistoryLayout from '@/components/beacons/BeaconsHistoryLayout';
import MyBeaconsLayout from '@/components/beacons/MyBeaconsLayout';
import BeaconsPrayLayout from '@/components/beacons/BeaconsPrayLayout';
import Error from '@/models/error';
import { clearAppError } from '@/redux/actions';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';

export type IBeacons = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  pray: BeaconsPrayLayout,
  history: BeaconsHistoryLayout,
  myBeacons: MyBeaconsLayout
});

function Beacons({ error, clearAppError }: IBeacons) {
  const [routes] = React.useState([
    { key: 'pray', title: 'Pray' },
    { key: 'history', title: 'History' },
    { key: 'myBeacons', title: 'My Beacons' },
  ]);

  return (
    <PageView>
      {
        error && (
          <AnimatedBanner iconSrc={AppIcon.Info}
            text={error.title}
            prefixText={error.details}
            onClick={() => clearAppError()} />
        )
      }

      <AppTabView title={'Beacons'}
        renderScene={renderScene}
        routes={routes} />
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {
  clearAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(Beacons);