import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";

type INewUserThingsToKnowAboutTheApp = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserThingsToKnowAboutTheApp({ newUserStep, setNewUserStep, styles }: INewUserThingsToKnowAboutTheApp) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.CreateAProfile);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>Things about the App to know</AppText>

            <SimpleTextList items={[
                'Anonymity: Your One’s info remains private. Use “Beacon Tags” for prayer requests without sharing personal details.',
                'Habit-Building: Best used daily to form habits of prayer, testimony, and action steps.',
                'Relationship Focused: This app supports genuine relationships based on compassion, not as a substitute for authentic engagement.']}
            />

            <AppText style={{ marginVertical: 16 }}>

            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}