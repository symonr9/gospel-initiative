import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ReachWorldHomeLayout from '@/components/reachWorld/ReachWorldHomeLayout';
import ReachWorldMissionsTripLayout from '@/components/reachWorld/ReachWorldMissionsTripLayout';
import AppTabView from '@/components/common/AppTabView';

export type IReachWorld = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  home: ReachWorldHomeLayout,
  missions: ReachWorldMissionsTripLayout
});

function ReachWorld({ error }: IReachWorld) {
  const [routes] = React.useState([
    { key: 'home', title: 'Home ' },
    { key: 'missions', title: 'Missions  ' },
  ]);

  return (
    <PageView>
      <AppTabView title={'Reach the World'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorld);