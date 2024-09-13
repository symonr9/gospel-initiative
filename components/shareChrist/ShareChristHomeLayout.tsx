import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';

export type IShareChristHomeLayout = ViewProps & {

};


function ShareChristHomeLayout({  }: IShareChristHomeLayout) {
  return (
    <ScrollLayout style={styles.container}>
      <PromptBanner />
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16
  }
});

const mapStateToProps = (state: any) => {

  return {

  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristHomeLayout);
