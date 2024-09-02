import React from 'react';
import { connect } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectFirstOneAndActionStepsByUserId } from '@/redux/selectors';
import { AppIcon } from '@/enums/enums';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';
import { AnimatedCard } from '../common/AnimatedCard';

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
        <AnimatedCard text={firstActionStep.notes}
                      icon={AppIcon.Chat}
                      label={`Action Step for ${firstOne.name}`}/>
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