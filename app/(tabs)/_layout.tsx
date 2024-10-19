import { Tabs } from 'expo-router';
import React, { } from 'react';
import { connect } from 'react-redux';

import { TabBarIcon } from '@/components/common/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DataRefreshManager from '../../managers/dataRefreshManager';
import AppStateManager from '../../managers/appStateManager';
import { updateTabIndex } from '@/redux/actions';
import { ViewProps } from 'react-native';

export type ITabLayout = ViewProps & {
  updateTabIndex: Function;
};

function TabLayout({ updateTabIndex }: ITabLayout) {
  const colorScheme = useColorScheme();

  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
  };

  const createTabBarIcon = (color: string, focused: string, iconName: string) =>
    <TabBarIcon name={focused ? iconName : `${iconName}-outline`} color={color} />;

  return (
    <>
      <DataRefreshManager />
      <AppStateManager />
      <Tabs
        screenOptions={tabScreenOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'home'),
          }}
        />
        <Tabs.Screen
          name="ones"
          options={{
            title: 'Ones',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'chatbubbles'),
          }}
        />
        <Tabs.Screen
          name="stories"
          options={{
            title: 'Stories',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'book'),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'person-circle'),
          }}
        />
      </Tabs>
    </>
  );
}


const mapStateToProps = (state: any) => {
  return {
  };
};

const mapDispatchToProps = {
  updateTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);