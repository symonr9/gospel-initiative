import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectFirstPromptByUserId, selectPromptsByUserId } from '@/redux/selectors';
import { AppIcon } from '@/enums/enums';
import { AnimatedBanner } from '../common/AnimatedBanner';
import Prompt from '@/models/prompt';
import { AnimatedCard } from '../common/AnimatedCard';

export type IPromptBanner = ViewProps & {
    firstPrompt: Prompt,
};

function PromptBanner({ firstPrompt }: IPromptBanner) {
    if (!firstPrompt) {
        return <></>;
    }

    return (
        <AnimatedCard text={'Quick Prompt'}
                      icon={AppIcon.Chat}
                      customStyle={{
                        label: {
                            fontSize: 14,
                            fontStyle: 'italic'
                        },
                        label2: {
                            fontSize: 14
                        },
                      }}
                      label={`${firstPrompt.question}`} 
                      label2={firstPrompt.response}/>
    );
}

const mapStateToProps = (state: any) => {
    const executor = state.users.executor;
    if (!executor)
        return {};

    const firstPrompt = selectFirstPromptByUserId(state, executor.id);
    return {
        firstPrompt
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PromptBanner);