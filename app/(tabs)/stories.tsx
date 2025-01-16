import PageView from '@/components/common/PageView';
import React, { useState, useEffect } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import MyStoriesLayout from '@/components/stories/MyStoriesLayout';
import GodsStoriesLayout from '@/components/stories/GodsStoriesLayout';
import PracticeMyStoryDetails from '@/components/stories/PracticeMyStoryDetails';

export type IStories = ViewProps & {
};

const renderScene = SceneMap({
  myStories: MyStoriesLayout,
  practice: PracticeMyStoryDetails,
  GodsStories: GodsStoriesLayout,
});

function Stories({ }: IStories) {
  const { tab } = useGlobalSearchParams();
  const initialIndex = tab ? parseInt(tab as string, 10) : 0;

  const [index, setIndex] = useState(initialIndex);
  const [routes] = React.useState([
    { key: 'myStories', title: 'My Stories' },
    { key: 'practice', title: 'Practice' },
    { key: 'GodsStories', title: `God's Stories` }
  ]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <PageView>
      <AppTabView title={'Beacons'}
        renderScene={renderScene}
        index={index}
        setIndex={setIndex}
        routes={routes} />
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);