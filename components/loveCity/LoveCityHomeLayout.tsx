import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalMinistry from '@/models/localMinistry';
import LocalEvent from '@/models/localEvent';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import { AppIcon } from '@/enums/enums';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';

export type ILoveCityHomeLayout = ViewProps & {
    localMinistries: LocalMinistry[];
    localEvents: LocalEvent[];
};

function LoveCityHomeLayout({ localMinistries, localEvents  }: ILoveCityHomeLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    return (
        <ScrollLayout>
            <AnimatedHeader title={'Love the City'}/>
            <PageRow style={{ gap: 32 }}>
                <DetailsSection iconSrc={AppIcon.Calendar} 
                    prefix={'Local Events'}
                    title={localEvents.length}/>
                <DetailsSection iconSrc={AppIcon.NightPark} 
                                prefix={'Local Ministries'}
                                title={localMinistries.length}/>
            </PageRow>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state: any) => {
    return {
        localMinistries: state.ministries.localMinistries,
        localEvents: state.ministries.localEvents,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityHomeLayout);