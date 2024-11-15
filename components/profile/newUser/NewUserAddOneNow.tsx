import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserAddOneNow = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserAddOneNow({ newUserStep, setNewUserStep, styles }: INewUserAddOneNow) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.PrayForBeaconsNow);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>Add One</AppText>

            <AppText>Would you like to add your One?</AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Yes - Add One'} onPress={onContinue} />
                <Button title={'Skip for Later'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}