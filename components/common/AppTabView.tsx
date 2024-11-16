import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneRendererProps, Route } from 'react-native-tab-view';

import { AppText } from '@/components/common/AppText';
import { Colors } from '@/constants/Colors';

export type IAppTabView = {
    title: string,
    routes: any,
    index: number,
    setIndex: Function,
    renderScene: (props: SceneRendererProps & { route: Route; }) => ReactNode,
};

function AppTabView({ title, index, setIndex, renderScene, routes }: IAppTabView) {
    const layout = useWindowDimensions();

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            scrollEnabled={routes.length >= 4}
            renderLabel={({ route, focused }) => (
                <View style={[styles.labelContainer, focused && styles.activeTab]}>
                    <AppText style={[styles.label, focused && styles.activeLabel]}>{route.title}</AppText>
                </View>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(idx) => {}}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            initialLayout={{ width: layout.width }}
            style={styles.tabViewContainer}
        />
    );
}

const styles = StyleSheet.create({
    tabViewContainer: {
        backgroundColor: Colors.light.background,
        color: Colors.light.text,
        flex: 1,
    },
    tabBar: {
        backgroundColor: Colors.white,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        marginBottom: 10,
        borderBottomStartRadius: 4,
        borderBottomEndRadius: 4,
    },
    indicator: {
        backgroundColor: Colors.light.secondary,
        height: 4,
        borderRadius: 2,
    },
    labelContainer: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        minWidth: 100,
        textAlign: 'center'
    },
    activeTab: {
        backgroundColor: Colors.light.secondary,

    },
    activeLabel: {
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTabView);
