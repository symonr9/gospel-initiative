
import PageView from '@/components/common/PageView';
import React from 'react';
import { ViewProps } from 'react-native';
import { connect } from 'react-redux';

import LoveCityContainer from '@/components/loveCity/LoveCityContainer';
import LoveCityFooter from '@/components/loveCity/LoveCityFooter';

export type ILoveCity = ViewProps & {
  error: string,
};

function LoveCity({ error }: ILoveCity) {
  return (
    <PageView>
      <LoveCityContainer />
      <LoveCityFooter />
    </PageView>
  );
}

const mapStateToProps = (state: any) => ({
  error: state.errors.error,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);