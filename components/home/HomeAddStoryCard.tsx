import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import StoryChapter from '@/models/storyChapter';
import { setAddingStory } from '@/redux/actions';

export type IHomeAddStoryCard = ViewProps & {
    executor: User;
    myStoryChapters: StoryChapter[];
    setAddingStory: Function;
};

function HomeAddStoryCard({ executor, myStoryChapters, setAddingStory }: IHomeAddStoryCard) {
    const router = useRouter();

    const onClick = () => {
        setAddingStory(true);
        router.replace('/stories?tab=0');
    };

    if (!executor)
        return <></>;

    return (
        <SimpleCard iconSrc={AppIcon.Microphone}
            style={[styles.card]}
            title={'Add New Story'}
            useTextTintForIcon={false}
            subtitle={'Tap on this card to go to add a new Story.'}
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
    setAddingStory,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAddStoryCard);
