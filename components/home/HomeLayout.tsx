import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';

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
