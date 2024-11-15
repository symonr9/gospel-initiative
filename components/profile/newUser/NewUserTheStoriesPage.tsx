import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserTheStoriesPage = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

// Not currently used.
export default function NewUserTheStoriesPage({ newUserStep, setNewUserStep, styles }: INewUserTheStoriesPage) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.ThingsToKnowAboutTheApp);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>The Stories Page</AppText>
            <AppText>
                The Story page has three main parts:
            </AppText>

            <SimpleTextList items={[
                'Practice your testimony daily by responding to prompts. Save and tag your story in your library.',
                'Find and filter your saved Story cards by theme.',
                'Access Gospel resources.']}
            />

            <AppText style={{ marginVertical: 16 }}>

            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Continue'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}