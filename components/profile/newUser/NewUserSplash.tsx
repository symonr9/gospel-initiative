import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { Colors } from "@/constants/Colors";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";

type INewUserSplash = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserSplash({ newUserStep, setNewUserStep, styles }: INewUserSplash) {
    const onLearnGospelInitiative = () => {
        setNewUserStep(NewUserStep.WhatIsTheGospelInitiative);
    };

    const onLearnApp = () => {
        setNewUserStep(NewUserStep.TheOnesPage);
    };

    const onSkipToUserCreation = () => {
        setNewUserStep(NewUserStep.CreateAProfile);
    };

    return (
        <PageColumn style={{ gap: 12 }}>
            <Image source={AppIcon.AppLogoTransparent}
                tintColor={Colors.light.darkAlternative}
                style={styles.logoIcon} />
            <AppText type={TextType.Subtitle}>Welcome to the Gospel Initiative App!</AppText>
            <AppText>
                This app helps you love others intentionally, connect in prayer, and grow in sharing your testimony.
            </AppText>
            <AppText style={{}}>
                Would you like to learn more about the Gospel Initiative or go straight to the app’s main features?
            </AppText>
            <PageColumn style={{ alignSelf: 'center' }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Learn about the Gospel Initiative'}
                    onPress={onLearnGospelInitiative} />
                <SimpleButton type={ButtonType.Edit}
                    text={'Learn about the App'}
                    onPress={onLearnApp} />
                <SimpleButton type={ButtonType.Edit}
                    text={'Skip to User Creation'}
                    onPress={onSkipToUserCreation} />
            </PageColumn>
        </PageColumn>
    );
}