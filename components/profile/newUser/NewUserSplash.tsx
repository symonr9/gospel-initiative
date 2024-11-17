import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { Colors } from "@/constants/Colors";

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
        <PageColumn style={{ gap: 16 }}>
            <Image source={AppIcon.AppLogoTransparent}
                tintColor={Colors.light.darkAlternative}
                style={styles.logoIcon} />
            <AppText type={TextType.Title}>Welcome to the Gospel Initiative App!</AppText>
            <AppText>
                This app helps you love others intentionally, connect in prayer, and grow in sharing your testimony.
            </AppText>
            <AppText style={{ marginVertical: 16 }}>
                Would you like to learn more about the Gospel Initiative or go straight to the app’s main features?
            </AppText>
            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Learn More About the Gospel Initiative'} onPress={onLearnGospelInitiative} />
                <Button title={'Learn More About the App'} onPress={onLearnApp} />
                <Button title={'Skip to User Creation'} onPress={onSkipToUserCreation} />
            </PageColumn>
        </PageColumn>
    );
}