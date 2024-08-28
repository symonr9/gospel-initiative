import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectFirstOneAndActionStepsByUserId, selectOnesByUserId } from '@/redux/selectors';
import User from '@/models/user';
import { AppIcon } from '@/enums/enums';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';

export type IActionStepBanner = ViewProps & {
    firstOne: One,
    actionSteps: ActionStep[]
};

function ActionStepBanner({ firstOne, actionSteps }: IActionStepBanner) {
    if (!firstOne) {
        return <></>;
    }

    if (!actionSteps || actionSteps.length === 0) {
        return <></>;
    }

    const firstActionStep = actionSteps[0];

    return (
        <AnimatedBanner text={firstActionStep.notes}
                      iconSrc={AppIcon.Chat}
                      bannerDelay={400}
                      textDelay={600}
                      prefixText={`Action Step for ${firstOne.name}`}/>
    );
}

const mapStateToProps = (state: any) => {
    const executor = state.users.executor;
    if (!executor)
        return {};

    const { firstOne, actionSteps } = selectFirstOneAndActionStepsByUserId(state, executor.id);
    return {
      firstOne,
      actionSteps
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepBanner);