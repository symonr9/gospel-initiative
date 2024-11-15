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
import { AppIcon, NewUserStep } from '@/enums/enums';
import LoadingLayout from '@/components/common/LoadingLayout';
import { clearAppError } from '@/redux/actions';
import AppError from '@/models/error';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';

export type ITabLayout = ViewProps & {
  newUserStep: NewUserStep;
  error: AppError;
  clearAppError: Function;
};

function TabLayout({ newUserStep, error, clearAppError }: ITabLayout) {
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
      {
        error && (
          <AnimatedBanner iconSrc={AppIcon.Info}
            text={error.title}
            prefixText={error.details}
            onClick={() => clearAppError()} />
        )
      }
      {Body}
    </>
  );
}


const mapStateToProps = (state: any) => {
  return {
    newUserStep: state.app.newUserStep,
    error: state.errors.error,
  };
};

const mapDispatchToProps = {
  clearAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);