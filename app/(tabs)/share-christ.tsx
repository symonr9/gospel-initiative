import React from 'react';
import { connect } from 'react-redux';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import PageView from '@/components/common/PageView';
import ShareChristBeaconsLayout from '@/components/shareChrist/ShareChristBeaconsLayout';
import ShareChristStoriesLayout from '@/components/shareChrist/ShareChristStoriesLayout';
import ShareChristOnesLayout from '@/components/shareChrist/ShareChristOnesLayout';
import ShareChristHomeLayout from '@/components/shareChrist/ShareChristHomeLayout';
import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { AppText } from '@/components/common/AppText';

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
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home ' },
        { key: 'beacons', title: 'Beacons ' },
        { key: 'stories', title: 'Stories ' },
        { key: 'ones', title: 'Ones ' },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            renderLabel={({ route, focused }) => (
                <View style={[styles.labelContainer, focused && styles.activeTab]}>
                    <AppText style={[styles.label, focused && styles.activeLabel]}>{route.title}</AppText>
                </View>
            )}
        />
    );

    return (
        <PageView>
            <AnimatedHeader title="Share Christ" delay={200} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: layout.width }}
                style={styles.tabViewContainer}
            />
        </PageView>
    );
}

const styles = StyleSheet.create({
    tabViewContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4', // Light background for a modern look
    },
    tabBar: {
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    indicator: {
        backgroundColor: '#007aff', // Blue accent for the active tab indicator
        height: 4,
        borderRadius: 2,
    },
    labelContainer: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        color: '#333', // Inactive label color
        fontWeight: '500',
    },
    activeTab: {
        backgroundColor: '#e6f7ff', // Light blue background for the active tab
    },
    activeLabel: {
        color: '#007aff', // Blue accent for active label
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);
