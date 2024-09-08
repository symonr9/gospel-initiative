import React from 'react';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import PageView from '@/components/common/PageView';
import ShareChristBeaconsLayout from '@/components/shareChrist/ShareChristBeaconsLayout';
import ShareChristStoriesLayout from '@/components/shareChrist/ShareChristStoriesLayout';
import ShareChristOnesLayout from '@/components/shareChrist/ShareChristOnesLayout';
import ShareChristHomeLayout from '@/components/shareChrist/ShareChristHomeLayout';
import AppTabView from '@/components/common/AppTabView';

export type IShareChrist = {
    error: string,
};

const renderScene = SceneMap({
    home: ShareChristHomeLayout,
    beacons: ShareChristBeaconsLayout,
    stories: ShareChristStoriesLayout,
    ones: ShareChristOnesLayout
});

function ShareChrist({ error }: IShareChrist) {
    const [routes] = React.useState([
        { key: 'home', title: 'Home ' },
        { key: 'beacons', title: 'Beacons ' },
        { key: 'stories', title: 'Stories ' },
        { key: 'ones', title: 'Ones ' },
    ]);

    return (
        <PageView>
            <AppTabView title={'Share Christ'}
                        renderScene={renderScene}
                        routes={routes}/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);
