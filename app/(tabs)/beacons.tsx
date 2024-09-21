import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import BeaconsHistoryLayout from '@/components/beacons/BeaconsHistoryLayout';
import MyBeaconsLayout from '@/components/beacons/MyBeaconsLayout';
import BeaconsPrayLayout from '@/components/beacons/BeaconsPrayLayout';

export type IBeacons = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  pray: BeaconsPrayLayout,
  history: BeaconsHistoryLayout,
  myBeacons: MyBeaconsLayout
});

function Beacons({ error }: IBeacons) {
  const [routes] = React.useState([
    { key: 'pray', title: 'Pray' },
    { key: 'history', title: 'History' },
    { key: 'myBeacons', title: 'My Beacons' },
  ]);

  return (
    <PageView>
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

};

export default connect(mapStateToProps, mapDispatchToProps)(Beacons);