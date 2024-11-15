import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserPracticeTestimonyNow = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserPracticeTestimonyNow({ newUserStep, setNewUserStep, styles }: INewUserPracticeTestimonyNow) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.Finished);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>Practice Testimony</AppText>

            <AppText>
                Here is an example for how you practice your testimony.
            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Yes - Practice Testimony'} onPress={onContinue} />
                <Button title={'Skip for Later'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}