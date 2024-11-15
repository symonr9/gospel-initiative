import { PageColumn } from '@/components/common/PageColumn';
import PageResponse from '@/components/common/PageResponse';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import React from 'react';
import { ViewProps } from "react-native";
import { OneLayoutType } from '../OnesLayout';

type IOnesLayoutFirstTime = ViewProps & {
    setMessage: Function;
    setActiveLayoutType: Function;
};

export function OnesLayoutFirstTime({ setMessage, setActiveLayoutType }: IOnesLayoutFirstTime) {

    return (
        <PageColumn style={{ gap: 8 }}>
            <PageResponse title={'Welcome'}
                details={'Please add your One on the Overview page to get started.'} />
            <SimpleIconButton iconSrc={AppIcon.Plus}
                small
                onClick={() => {
                    setMessage(null);
                    setActiveLayoutType(OneLayoutType.AddingOne);
                }}
                title={'Add New'} />

        </PageColumn>
    );
}