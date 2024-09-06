import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';

import ReachWorldContainer from '@/components/reachWorld/ReachWorldContainer';
import ReachWorldFooter from '@/components/reachWorld/ReachWorldFooter';

export type IReachWorld = ViewProps & {
  error: string,
};

function ReachWorld({ error }: IReachWorld) {

  return (
    <PageView>
      <ReachWorldContainer/>
      <ReachWorldFooter/>
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorld);