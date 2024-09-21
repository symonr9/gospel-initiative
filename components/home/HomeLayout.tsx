import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { connect, useSelector } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import { AppIcon } from '@/enums/enums';
import DetailsSection from '../common/DetailsSection';
import { selectActionStepsByOneId, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';
import { AppText, TextType } from '../common/AppText';
import { ActionStepCard } from '../ones/ActionStepCard';
import { SimpleIcon } from '../common/SimpleIcon';

export type IHomeLayout = ViewProps & {
  firstOne: One | null;
  actionStepsForFirstOne: ActionStep[];
};


function HomeLayout({ firstOne, actionStepsForFirstOne }: IHomeLayout) {
  return (
    <ScrollLayout style={styles.container}>
      <PageColumn style={{ gap: 8 }}>
        <PageRow>
          <PromptBanner />
        </PageRow>
      </PageColumn>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});

const mapStateToProps = (state: any) => {
  const ones = state.ones.ones;
  if (ones.length > 0) {
    const actionSteps = selectActionStepsByOneId(state, ones[0].id) || [];
    return {
      firstOne: ones[0],
      actionStepsForFirstOne: actionSteps,
    }
  }

  return {
    firstOne: null,
    actionStepsForFirstOne: [],
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
