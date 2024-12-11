import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import StoryChapter from '@/models/storyChapter';
import { getItemForDate, isWithinPast24Hours } from '@/utils/appUtils';
import { PromptQuestions } from '@/constants/Strings';

export type IHomePromptCard = ViewProps & {
    executor: User;
};

function HomePromptCard({ executor }: IHomePromptCard) {    
    if (!executor) {
        return <></>;
    }

    const promptQuestion = getItemForDate(new Date(), PromptQuestions);

    return (
        <SimpleCard iconSrc={AppIcon.Note}
            style={[styles.card]}
            title={promptQuestion}
            subtitle={'Prompt of the Day: Try to ask someone this question!'} />
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
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePromptCard);
