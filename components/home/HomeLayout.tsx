import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect, useSelector } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import { PageSubHeader } from '../common/PageSubHeader';
import { SimpleCard } from '../common/SimpleCard';
import { AppIcon } from '@/enums/enums';
import { setHomeDailies } from '@/redux/actions';
import HomeChecklistItem from './HomeChecklistItem';

export type IHomeLayout = ViewProps & {
  executor: User;
};


function HomeLayout({ executor }: IHomeLayout) {
  const router = useRouter();

  const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

  const title = executor ? `Hello, ${executor.name}` : `Hello`;
  const subtitle = executor ? `Welcome to the Gospel Initiative App. Please take a look at tasks below.` : ``;

  const oneCardDetailsView = (
    <PageColumn>
      <HomeChecklistItem itemKey={'actionSteps'} 
        title={'Action Steps'} 
        subtitle={'Have you checked your action steps today?'}/>
      
      <HomeChecklistItem itemKey={'gospelChecklist'} 
        title={'Gospel Checklist'} 
        subtitle={'Have you updated your Gospel Checklist today?'}/>

      <HomeChecklistItem itemKey={'oneBeaconSent'} 
        title={'Beacon Sent'} 
        subtitle={'Have you sent a beacon for your one today?'}/>
    </PageColumn>
  );

  const prayerDetailsView = (
    <PageColumn>
      <HomeChecklistItem itemKey={'prayedForBeacons'} 
        title={'Prayer Beacons'} 
        subtitle={'Have you prayed for other beacons today?'}/>
    </PageColumn>
  );

  const storyDetailsView = (
    <PageColumn>
      <HomeChecklistItem itemKey={'storyPracticed'} 
        title={'Practice Testimony'} 
        subtitle={'Have you practiced your testimony today?'}/>
    </PageColumn>
  );

  const prayerTitle = incomingBeacons.length > 0 ? `Incoming Beacons (${incomingBeacons.length})` : `All Beacons Completed`;
  const prayerSubtitle = incomingBeacons.length > 0 ? `Tap on this card to pray.` : `Check back again later.`
  const prayerIcon = incomingBeacons.length > 0 ? AppIcon.Prayer : AppIcon.Checkmark;

  const onPrayerClick = () => {
    router.push('/ones?tab=1');
  };

  return (
    <ScrollLayout style={styles.container}>
      <PageColumn style={{ gap: 8 }}>
        <AnimatedHeader title={title} subtitle={subtitle} />

        <PageColumn style={{ marginHorizontal: 12, gap: 12 }}>
          <PageSubHeader title={'Tasks'} />

          <SimpleCard iconSrc={prayerIcon}
            style={styles.card}
            title={prayerTitle}
            subtitle={prayerSubtitle}
            onClick={onPrayerClick} />

          <SimpleCard iconSrc={AppIcon.UserGroup}
            style={styles.card}
            title={'Your One'}
            detailsView={oneCardDetailsView} />

          <SimpleCard iconSrc={AppIcon.OpenHands}
            style={styles.card}
            title={'Prayer'}
            detailsView={prayerDetailsView} />

          <SimpleCard iconSrc={AppIcon.Book}
            style={styles.card}
            title={'Stories'}
            detailsView={storyDetailsView} />
        </PageColumn>
      </PageColumn>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  card: {
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 20
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
