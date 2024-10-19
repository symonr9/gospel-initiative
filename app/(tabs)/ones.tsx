import PageView from '@/components/common/PageView';
import React, { useState, useEffect } from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import OnesLayout from '@/components/ones/OnesLayout';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';
import Error from '@/models/error';
import { clearAppError } from '@/redux/actions';
import BeaconsPrayLayout from '@/components/beacons/BeaconsPrayLayout';

export type IOnes = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  ones: OnesLayout,
  pray: BeaconsPrayLayout,
});

function Ones({ error, clearAppError }: IOnes) {
  const { tab } = useLocalSearchParams();
  const initialIndex = tab ? parseInt(tab) : 0;

  const [index, setIndex] = useState(initialIndex);
  const [routes] = useState([
    { key: 'ones', title: 'Ones' },
    { key: 'pray', title: 'Pray' },
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

      <AppTabView title={'Ones'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Ones);