import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectFirstPromptByUserId, selectPromptsByUserId } from '@/redux/selectors';
import { AppIcon } from '@/enums/enums';
import { AnimatedBanner } from '../common/AnimatedBanner';
import Prompt from '@/models/prompt';

export type IPromptBanner = ViewProps & {
    firstPrompt: Prompt,
};

function PromptBanner({ firstPrompt }: IPromptBanner) {
    if (!firstPrompt) {
        return <></>;
    }

    return (
        <AnimatedBanner text={firstPrompt.response}
                      iconSrc={AppIcon.Chat}
                      prefixText={firstPrompt.question}/>
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