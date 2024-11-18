import { PageColumn } from '@/components/common/PageColumn';
import { Image } from 'expo-image';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import React from 'react';
import { ViewProps } from "react-native";
import { OneLayoutType } from '../OnesLayout';
import { Colors } from '@/constants/Colors';
import PageResponse from '@/components/common/PageResponse';

type IOnesLayoutFirstTime = ViewProps & {
    setMessage: Function;
    setActiveLayoutType: Function;
};

export function OnesLayoutFirstTime({ setMessage, setActiveLayoutType }: IOnesLayoutFirstTime) {

    return (
        <PageColumn style={{ gap: 8 }}>
            <PageResponse title={'Welcome'}
                details={'Please add your One on the Overview page to get started.'} />

            <Image source={AppIcon.User}
                tintColor={Colors.light.darkAlternative}
                style={{
                    marginVertical: 8,
                    height: 120,
                    width: 120,
                    alignSelf: 'center',
                }} />

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