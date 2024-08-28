import React from 'react';
import { View, type ViewProps } from 'react-native';
import { connect } from 'react-redux';

import { AnimatedHeader } from '../common/AnimatedHeader';
import PromptBanner from '../prompts/PromptBanner';
import ActionStepBanner from '../ones/ActionStepBanner';

export type IShareChristHomeLayout = ViewProps & {

};

function ShareChristHomeLayout({ }: IShareChristHomeLayout) {

  return (
    <View>
        <AnimatedHeader title="Share Christ" delay={200}/>

        <PromptBanner/>
        <ActionStepBanner/>

    </View>
  );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristHomeLayout);
