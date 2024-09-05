
import React from 'react';
import { connect } from 'react-redux';
import PageView from '@/components/common/PageView';
import { FlatList, View, ViewProps } from 'react-native';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import LoveCityContainer from '@/components/loveCity/LoveCityContainer';
import LoveCityFooter from '@/components/loveCity/LoveCityFooter';

export type ILoveCity = ViewProps & {
  error: string,
};

function LoveCity({ error }: ILoveCity) {
  return (
    <PageView>
      <LoveCityContainer/>
      <LoveCityFooter/>
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);