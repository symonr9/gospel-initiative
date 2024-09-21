import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import OnesLayout from '@/components/ones/OnesLayout';
import OnesOverviewLayout from '@/components/ones/OnesOverviewLayout';

export type IOnes = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  ones: OnesLayout,
  overview: OnesOverviewLayout,
});

function Ones({ error }: IOnes) {
  const [routes] = React.useState([
    { key: 'ones', title: 'Ones' },
    { key: 'overview', title: 'Overview' },
  ]);

  return (
    <PageView>
      <AppTabView title={'Ones'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Ones);