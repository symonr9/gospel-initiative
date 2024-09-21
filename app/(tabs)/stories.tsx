import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import MyStoriesLayout from '@/components/stories/MyStoriesLayout';
import GodsStoriesLayout from '@/components/stories/GodsStoriesLayout';

export type IStories = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  myStories: MyStoriesLayout,
  GodsStories: GodsStoriesLayout,
});

function Stories({ error }: IStories) {
  const [routes] = React.useState([
    { key: 'myStories', title: 'My Stories' },
    { key: 'GodsStories', title: `God's Stories` }
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