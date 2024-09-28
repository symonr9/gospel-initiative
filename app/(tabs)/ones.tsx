import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import OnesLayout from '@/components/ones/OnesLayout';
import OnesOverviewLayout from '@/components/ones/OnesOverviewLayout';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';
import Error from '@/models/error';
import { clearAppError, setAppError } from '@/redux/actions';

export type IOnes = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  ones: OnesLayout,
  overview: OnesOverviewLayout,
});

function Ones({ error, clearAppError }: IOnes) {
  const [routes] = React.useState([
    { key: 'ones', title: 'Ones' },
    { key: 'overview', title: 'Overview' },
  ]);

  return (
    <PageView>
      {
        error && (
          <AnimatedBanner iconSrc={AppIcon.Info}
            text={error.title}
            prefixText={error.details}
            onClick={() => clearAppError()} />
        )}

      <AppTabView title={'Ones'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Ones);