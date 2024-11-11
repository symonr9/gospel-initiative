import { Tabs } from 'expo-router';
import React, { } from 'react';
import { connect } from 'react-redux';

import { TabBarIcon } from '@/components/common/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DataRefreshManager from '../../managers/dataRefreshManager';
import AppStateManager from '../../managers/appStateManager';
import { ViewProps } from 'react-native';
import NewUserLayout from '@/components/profile/NewUserLayout';
import { NewUserStep } from '@/enums/enums';
import LoadingLayout from '@/components/common/LoadingLayout';

export type ITabLayout = ViewProps & {
  newUserStep: NewUserStep;
};

function TabLayout({ newUserStep }: ITabLayout) {
  const colorScheme = useColorScheme();

  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
  };

  const createTabBarIcon = (color: string, focused: string, iconName: string) =>
    <TabBarIcon name={focused ? iconName : `${iconName}-outline`} color={color} />;

  const NormalLayout = (
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
  );

  const isLoading = newUserStep === NewUserStep.Loading;
  const isNewUser = newUserStep !== NewUserStep.Completed;

  let Body;
  if (isLoading) {
    Body = <LoadingLayout/>
  } else if (isNewUser) {
    Body = <NewUserLayout/>;
  } else {
    Body = NormalLayout;
  }

  return (
    <>
      <DataRefreshManager />
      <AppStateManager />
      {Body}
    </>
  );
}


const mapStateToProps = (state: any) => {
  return {
    newUserStep: state.app.newUserStep
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);