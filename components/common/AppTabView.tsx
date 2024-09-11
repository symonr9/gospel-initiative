import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar, SceneRendererProps, Route } from 'react-native-tab-view';

import PageView from '@/components/common/PageView';
import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { AppText } from '@/components/common/AppText';
import { Colors } from '@/constants/Colors';

export type IAppTabView = {
    title: string,
    routes: any,
    renderScene: (props: SceneRendererProps & { route: Route; }) => ReactNode,
};

function AppTabView({ title, renderScene, routes }: IAppTabView) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

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
            <AnimatedHeader title={title} delay={200} />
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
        backgroundColor: Colors.light.background,
        color: Colors.light.text
    },
    tabBar: {
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,        
        marginBottom: 16,
    },
    indicator: {
        backgroundColor: Colors.light.secondary,
        height: 4,
        borderRadius: 2,
    },
    labelContainer: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppTabView);
