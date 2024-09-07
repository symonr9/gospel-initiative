import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

import LocalEvent from '@/models/localEvent';
import LocalMinistry from '@/models/localMinistry';
import SimpleIconButton from './SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import { AnimatedHeader } from './AnimatedHeader';
import { SimpleIcon } from './SimpleIcon';
import { PageRow } from './PageRow';

export type IListDetails = {
    icon: AppIcon;
    title: string;
    Body: any;
    setActiveItemId: Function;
};

export function ListDetails({ icon, title, Body, setActiveItemId }: IListDetails) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack} 
                                  title={'Back'} 
                                  onClick={() => setActiveItemId(null)}/>
            </View>

            <PageRow center style={{ alignSelf: 'center'}}>
                <SimpleIcon iconSrc={icon} large removeBackground/>
            </PageRow>

            <AnimatedHeader title={title}/>

            {Body}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
});