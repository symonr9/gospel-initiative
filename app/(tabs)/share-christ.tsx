
import React from 'react';

import { connect } from 'react-redux';
import { View, ViewProps, useWindowDimensions } from 'react-native';

import PageView from '@/components/common/PageView';
import { TabView, SceneMap } from 'react-native-tab-view';

import ShareChristFooter from '@/components/shareChrist/ShareChristFooter';
import ShareChristBeaconsLayout from '@/components/shareChrist/ShareChristBeaconsLayout';
import ShareChristStoriesLayout from '@/components/shareChrist/ShareChristStoriesLayout';
import ShareChristOnesLayout from '@/components/shareChrist/ShareChristOnesLayout';
import ShareChristHomeLayout from '@/components/shareChrist/ShareChristHomeLayout';
import { AnimatedHeader } from '@/components/common/AnimatedHeader';

export type IShareChrist = ViewProps & {
    error: string,
};

const renderScene = SceneMap({
    home: ShareChristHomeLayout,
    beacons: ShareChristBeaconsLayout,
    stories: ShareChristStoriesLayout,
    ones: ShareChristOnesLayout
});

function ShareChrist({ error }: IShareChrist) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home' },
        { key: 'beacons', title: 'Beacons' },
        { key: 'stories', title: 'Stories' },
        { key: 'ones', title: 'Ones' },
    ]);

    return (
        <PageView>

            <AnimatedHeader title="Share Christ" delay={200} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, height: layout.height }}
            />

            {/* <ShareChristContainer /> */}
            <ShareChristFooter />
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);