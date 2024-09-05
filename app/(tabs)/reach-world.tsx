import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';
import PageView from '@/components/common/PageView';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
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