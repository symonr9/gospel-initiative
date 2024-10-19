import PageView from '@/components/common/PageView';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import MyStoriesLayout from '@/components/stories/MyStoriesLayout';
import GodsStoriesLayout from '@/components/stories/GodsStoriesLayout';
import PracticeMyStoryDetails from '@/components/stories/PracticeMyStoryDetails';
import { clearAppError } from '@/redux/actions';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';
import Error from '@/models/error';

export type IStories = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  myStories: MyStoriesLayout,
  practice: PracticeMyStoryDetails,
  GodsStories: GodsStoriesLayout,
});

function Stories({ error, clearAppError }: IStories) {
  const { tab } = useLocalSearchParams();
  const initialIndex = tab ? parseInt(tab) : 0;

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
        index={index}
        setIndex={setIndex}
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

export default connect(mapStateToProps, mapDispatchToProps)(Stories);