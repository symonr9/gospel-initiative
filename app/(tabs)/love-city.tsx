
import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import LoveCityHomeLayout from '@/components/loveCity/LoveCityHomeLayout';
import LoveCityEventsLayout from '@/components/loveCity/LoveCityEventsLayout';
import LoveCityMinistriesLayout from '@/components/loveCity/LoveCityMinistriesLayout';
import AppTabView from '@/components/common/AppTabView';

export type ILoveCity = ViewProps & {
  error: string,
};

const renderScene = SceneMap({
  home: LoveCityHomeLayout,
  events: LoveCityEventsLayout,
  ministries: LoveCityMinistriesLayout
})

function LoveCity({ error }: ILoveCity) {
  const [routes] = React.useState([
    { key: 'home', title: 'Home ' },
    { key: 'events', title: 'Events ' },
    { key: 'ministries', title: 'Ministries  ' },
  ]);


  return (
    <PageView>
        <AppTabView title={'Love our City'}
                    renderScene={renderScene}
                    routes={routes}/>
    </PageView>
);
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);