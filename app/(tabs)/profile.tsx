import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import Error from '@/models/error';
import { clearAppError } from '@/redux/actions';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';
import SettingsLayout from '@/components/profile/SettingsLayout';
import ProfileLayout from '@/components/profile/ProfileLayout';

export type IProfile = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  profile: ProfileLayout,
  settings: SettingsLayout,
});

function Profile({ error, clearAppError }: IProfile) {
  const [routes] = React.useState([
    { key: 'profile', title: 'Profile' },
    { key: 'settings', title: 'Settings' },
  ]);

  return (
    <PageView>
      {
        error && (
          <AnimatedBanner iconSrc={AppIcon.Info}
            text={error.title}
            prefixText={error.details}
            onClick={() => clearAppError()} />
        )
      }

      <AppTabView title={'Profile'}
        renderScene={renderScene}
        routes={routes} />
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {
  clearAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);