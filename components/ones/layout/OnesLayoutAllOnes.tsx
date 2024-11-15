import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import React from 'react';
import { ViewProps } from "react-native";
import AllOnesGrid from '../AllOnesGrid';

type IOnesLayoutAllOnes = ViewProps & {
    setMessage: Function;
    setActiveLayoutType: Function;
    revertToInitialLayoutType: Function;
};

export function OnesLayoutAllOnes({ setActiveLayoutType, setMessage, revertToInitialLayoutType }: IOnesLayoutAllOnes) {
    return (
        <PageColumn>
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        revertToInitialLayoutType();
                    }}
                    title={'Back'} />
            </PageRow>
            <AllOnesGrid setActiveLayoutType={setActiveLayoutType} />

        </PageColumn>
    );

}