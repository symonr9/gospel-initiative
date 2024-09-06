import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { AnimatedHeader } from '../common/AnimatedHeader';
import PromptBanner from '../prompts/PromptBanner';
import ActionStepBanner from '../ones/ActionStepBanner';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { EnhancedBeacon } from '@/models/beacon';
import { AnimatedCard } from '../common/AnimatedCard';
import { PageRow } from '../common/PageRow';
import { AppIcon, FadeDirection, Page } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import { openPage } from '@/redux/actions';
import NavigateToOnesButton from '../ones/NavigateToOnesButton';

export type IShareChristHomeLayout = ViewProps & {
  completedBeacons: EnhancedBeacon[];
  incomingBeacons: EnhancedBeacon[];
  openPage: Function;
};

function ShareChristHomeLayout({ completedBeacons, incomingBeacons, openPage }: IShareChristHomeLayout) {
  return (
    <View>
      <AnimatedHeader title="Share Christ" delay={200} />
      <PromptBanner />

      <PageRow style={styles.sectionRow}>
        <ActionStepBanner />
        <NavigateToOnesButton/>
      </PageRow>

      <PageColumn style={styles.section}>
        <AppText type={TextType.BodyBold}>
          Beacons
        </AppText>
        <PageRow style={styles.sectionRow}>
          <AnimatedCard text={incomingBeacons.length}
            direction={FadeDirection.Left}
            label='To Pray for' />
          <AnimatedCard text={completedBeacons.length}
            direction={FadeDirection.Right}
            label='Prayed for Today' />

          <SimpleIconButton iconSrc={AppIcon.Prayer}
            onClick={() => openPage(Page.ShareChristBeacons)}
            title={'Open'} />
        </PageRow>
      </PageColumn>


      <PageColumn style={styles.section}>
        <AppText type={TextType.BodyBold}>
          Stories
        </AppText>
        <PageRow style={styles.sectionRow}>
          <AnimatedCard text={7}
            direction={FadeDirection.Left}
            label='Chapters Remaining' />
          <AnimatedCard text={completedBeacons.length}
            direction={FadeDirection.Right}
            label={`God's Story`} />

          <SimpleIconButton iconSrc={AppIcon.Book}
            onClick={() => openPage(Page.ShareChristStories)}
            title={'Open'} />
        </PageRow>
      </PageColumn>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 8
  },
  sectionRow: {
    gap: 16,
    padding: 8
  }
});

const mapStateToProps = (state: any) => {
  const { completedBeacons, incomingBeacons } = selectPartitionedActiveEnhancedBeacons(state);
  return {
    completedBeacons,
    incomingBeacons,
  };
};

const mapDispatchToProps = {
  openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristHomeLayout);
