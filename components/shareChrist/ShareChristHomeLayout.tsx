import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';

export type IShareChristHomeLayout = ViewProps & {

};


function ShareChristHomeLayout({  }: IShareChristHomeLayout) {
  return (
    <View style={styles.container}>
      <PromptBanner />
    </View>
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
