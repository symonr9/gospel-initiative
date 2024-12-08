import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import StoryChapter from '@/models/storyChapter';
import { isWithinPast24Hours } from '@/utils/appUtils';

export type IHomePracticeTestimonyCard = ViewProps & {
    executor: User;
    myStoryChapters: StoryChapter[];
};

function HomePracticeTestimonyCard({ executor, myStoryChapters }: IHomePracticeTestimonyCard) {
    const router = useRouter();

    const onClick = () => {
        router.replace('/stories?tab=1');
    };

    if (!executor) {
        return <></>;
    }

    const hasPracticedTestimonyToday = isWithinPast24Hours(executor.lastPartitionDate);
    
    if (hasPracticedTestimonyToday && executor.extraPartitionCount === 0) {
        return <></>;
    }

    return (
        <SimpleCard iconSrc={AppIcon.StageApathetic}
            style={[styles.card]}
            title={'Testimony Practice'}
            subtitle={'Tap on this card to go to the Testimony Practice page.'}
            onClick={onClick} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16
      },
});

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    myStoryChapters: state.stories.myStoryChapters,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePracticeTestimonyCard);
