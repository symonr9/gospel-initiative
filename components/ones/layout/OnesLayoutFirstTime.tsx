import { PageColumn } from '@/components/common/PageColumn';
import { Image } from 'expo-image';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import React from 'react';
import { ViewProps } from "react-native";
import { OneLayoutType } from '../OnesLayout';
import { Colors, useThemeColors } from '@/constants/Colors';
import PageResponse from '@/components/common/PageResponse';
import { StyledImage } from '@/components/common/StyledImage';

type IOnesLayoutFirstTime = ViewProps & {
    setMessage: Function;
    setActiveLayoutType: Function;
};

export function OnesLayoutFirstTime({ setMessage, setActiveLayoutType }: IOnesLayoutFirstTime) {

    const { darkAlternativeColor } = useThemeColors();

    return (
        <PageColumn style={{ gap: 8 }}>
            <PageResponse title={'Welcome'}
                details={'Please add your One on the Ones page to get started.'} />

            <StyledImage iconSrc={AppIcon.User} tintColor={darkAlternativeColor} style={{
                marginVertical: 8,
                height: 80,
                width: 80,
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