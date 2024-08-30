
import React from 'react';
import { connect } from 'react-redux';
import PageView from '@/components/common/PageView';
import { FlatList, View, ViewProps } from 'react-native';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';

export type ILoveCity = ViewProps & {

};

function LoveCity({ }: ILoveCity) {
  return (
    <PageView>
      <PageColumn spaceBetween>
        <PageRow>
          <PageHeader title={"Love City"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);