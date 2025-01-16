import PageView from '@/components/common/PageView';
import React, { useState, useEffect } from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { useGlobalSearchParams } from 'expo-router';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import OnesLayout from '@/components/ones/OnesLayout';
import BeaconsPrayLayout from '@/components/beacons/BeaconsPrayLayout';

export type IOnes = ViewProps & {
};

const renderScene = SceneMap({
  ones: OnesLayout,
  pray: BeaconsPrayLayout,
});

function Ones({ }: IOnes) {
  const { tab } = useGlobalSearchParams();
  const initialIndex = tab ? parseInt(tab as string, 10) : 0;

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
      <AppTabView title={'Ones'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Ones);