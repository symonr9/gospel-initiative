import React from 'react';
import { View, ViewProps, StyleSheet, Animated } from 'react-native';

import LocalEvent from '@/models/localEvent';
import LocalMinistry from '@/models/localMinistry';
import SimpleIconButton from './SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import { AnimatedHeader } from './AnimatedHeader';
import { SimpleIcon } from './SimpleIcon';
import { PageRow } from './PageRow';
import { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AnimatedElement } from './AnimatedElement';

export type IListDetails = {
    icon: AppIcon;
    title: string;
    Body: any;
    setActiveItemId: Function;
};

export function ListDetails({ icon, title, Body, setActiveItemId }: IListDetails) {

    return (
        <View style={styles.container}>
            <PageRow style={{ marginStart: 8 }}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    title={'Back'}
                    onClick={() => setActiveItemId(null)} />
            </PageRow>

            <PageRow center>
                <AnimatedElement element={(
                    <SimpleIcon iconSrc={icon} large removeBackground />
                )} />
            </PageRow>
            <AnimatedHeader title={title} />

            {Body}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
});