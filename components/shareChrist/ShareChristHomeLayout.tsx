import React from 'react';
import { View, type ViewProps } from 'react-native';
import { connect } from 'react-redux';

import { AnimatedHeader } from '../common/AnimatedHeader';
import PromptBanner from '../prompts/PromptBanner';
import ActionStepBanner from '../ones/ActionStepBanner';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { EnhancedBeacon } from '@/models/beacon';
import { AnimatedCard } from '../common/AnimatedCard';
import { PageRow } from '../common/PageRow';
import { FadeDirection } from '@/enums/enums';

export type IShareChristHomeLayout = ViewProps & {
  completedBeacons: EnhancedBeacon[];
  incomingBeacons: EnhancedBeacon[];
};

function ShareChristHomeLayout({ completedBeacons, incomingBeacons }: IShareChristHomeLayout) {
  return (
    <View>
      <AnimatedHeader title="Share Christ" delay={200} />
      <PromptBanner />
      <ActionStepBanner />

      <PageRow>
        <AnimatedCard text={incomingBeacons.length}
          direction={FadeDirection.Left}
          label='Beacons to Pray for' />
        <AnimatedCard text={completedBeacons.length}
          direction={FadeDirection.Right}
          label='Beacons Prayed for Today' />
      </PageRow>
    </View>
  );
}

const mapStateToProps = (state: any) => {
  const { completedBeacons, incomingBeacons } = selectPartitionedActiveEnhancedBeacons(state);
  return {
    completedBeacons,
    incomingBeacons,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristHomeLayout);
