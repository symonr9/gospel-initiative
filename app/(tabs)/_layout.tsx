import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { TabBarIcon } from '@/components/common/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DataRefreshManager from '../managers/dataRefreshManager';
import AppStateManager from '../managers/appStateManager';
import { SimpleIcon } from '@/components/common/SimpleIcon';
import { AppIcon } from '@/enums/enums';



export default function TabLayout() {
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
      <AppStateManager/>
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
          name="beacons"
          options={{
            title: 'Beacons',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'paper-plane'),
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
          name="ones"
          options={{
            title: 'Ones',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'person'),
          }}
        />
      </Tabs>
    </>
  );
}
