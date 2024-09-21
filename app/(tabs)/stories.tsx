import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import StoriesLayout from '@/components/stories/StoriesLayout';

export type IStories = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  home: StoriesLayout,
});

function Stories({ error }: IStories) {
  const [routes] = React.useState([
    { key: 'home', title: 'Home ' },
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

export default connect(mapStateToProps, mapDispatchToProps)(Stories);