import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';
import AppTabView from '@/components/common/AppTabView';
import OnesLayout from '@/components/ones/OnesLayout';
import OnesOverviewLayout from '@/components/ones/OnesOverviewLayout';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';
import Error from '@/models/error';
import { clearAppError } from '@/redux/actions';

export type IOnes = ViewProps & {
  error: Error,
  clearAppError: Function
};

const renderScene = SceneMap({
  overview: OnesOverviewLayout,
  ones: OnesLayout,
});

function Ones({ error, clearAppError }: IOnes) {
  const [routes] = React.useState([
    { key: 'overview', title: 'Overview' },
    { key: 'ones', title: 'Ones' },
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