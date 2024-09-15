import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';

export type IShareChristHomeLayout = ViewProps & {

};


function ShareChristHomeLayout({  }: IShareChristHomeLayout) {
  return (
    <ScrollLayout style={styles.container}>
      <AnimatedHeader title={'Share Christ'}/>
      <PageRow>
        <PromptBanner />
      </PageRow>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});

const mapStateToProps = (state: any) => {

  return {

  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristHomeLayout);
