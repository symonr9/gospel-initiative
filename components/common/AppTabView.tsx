import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneRendererProps, Route } from 'react-native-tab-view';

import { AppText } from '@/components/common/AppText';
import { Colors, useThemeColors } from '@/constants/Colors';

export type IAppTabView = {
    title: string,
    routes: any,
    index: number,
    setIndex: Function,
    renderScene: (props: SceneRendererProps & { route: Route; }) => ReactNode,
};

function AppTabView({ title, index, setIndex, renderScene, routes }: IAppTabView) {
    const layout = useWindowDimensions();
    
    const {
        textColor,
        headerColor,
        backgroundColor,
        primaryColor,
        secondaryColor,
    } = useThemeColors();

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={[styles.indicator, { backgroundColor: secondaryColor }]}
            style={[styles.tabBar, { backgroundColor: headerColor }]}
            scrollEnabled={routes.length >= 4}
            renderLabel={({ route, focused }) => (
                <View style={[styles.labelContainer, focused && { backgroundColor: secondaryColor }]}>
                    <AppText style={[styles.label, { color: textColor }]}>{route.title}</AppText>
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
            swipeEnabled={true}
            initialLayout={{ width: layout.width }}
            style={[styles.tabViewContainer, { backgroundColor: backgroundColor}]}
        />
    );
}

const styles = StyleSheet.create({
    tabViewContainer: {
        flex: 1,
    },
    tabBar: {
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
        height: 4,
        borderRadius: 2,
    },
    labelContainer: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 6,
    },
    label: {
        fontSize: 12,
        minWidth: 100,
        textAlign: 'center'
    },
    activeTab: {
    },
    activeLabel: {
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
