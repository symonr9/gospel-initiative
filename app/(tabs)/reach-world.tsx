import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';
import PageView from '@/components/common/PageView';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';

export type IReachWorld = ViewProps & {

};

function ReachWorld({ }: IReachWorld) {

  return (
    <PageView>
      <PageColumn spaceBetween>
        <PageRow>
          <PageHeader title={"Reach the World"} />
        </PageRow>
        <PageRow spaceBetween>
        </PageRow>
      </PageColumn>

    </PageView>
  );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorld);