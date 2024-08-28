import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectPromptsByUserId } from '@/redux/selectors';
import User from '@/models/user';
import { AppIcon } from '@/enums/enums';
import { SimpleBanner } from '../common/SimpleBanner';

export type IPromptBanner = ViewProps & {
    executor: User,
};

function PromptBanner({ executor }: IPromptBanner) {
    if (!executor) {
        return <></>;
    }

    const prompts = useSelector(selectPromptsByUserId(executor.id));
    if (!prompts || prompts.length === 0) {
        return <></>;
    }

    const firstPrompt = prompts[0];

    return (
        <SimpleBanner text={firstPrompt.response}
                      iconSrc={AppIcon.Chat}
                      prefixText={firstPrompt.question}/>
    );
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PromptBanner);