import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { TabBarIcon } from '@/components/common/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DataRefreshManager from '../managers/dataRefreshManager';
import AppStateManager from '../managers/appStateManager';



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
          name="share-christ"
          options={{
            title: 'Share Christ',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'chatbubbles'),
          }}
        />
        <Tabs.Screen
          name="love-city"
          options={{
            title: 'Love the City',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'business'),
          }}
        />
        <Tabs.Screen
          name="reach-world"
          options={{
            title: 'Reach the World',
            tabBarIcon: ({ color, focused }) => createTabBarIcon(color, focused, 'earth'),
          }}
        />
      </Tabs>
    </>
  );
}
