import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import MyStoriesLayout from '@/components/stories/MyStoriesLayout';
import GodsStoriesLayout from '@/components/stories/GodsStoriesLayout';
import PracticeMyStoryDetails from '@/components/stories/PracticeMyStoryDetails';

export type IStories = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  myStories: MyStoriesLayout,
  practice: PracticeMyStoryDetails,
  GodsStories: GodsStoriesLayout,
});

function Stories({ error }: IStories) {
  const [routes] = React.useState([
    { key: 'myStories', title: 'My Stories' },
    { key: 'practice', title: 'Practice' },
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