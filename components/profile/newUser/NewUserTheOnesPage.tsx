import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserTheOnesPage = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

// Not currently used.
export default function NewUserTheOnesPage({ newUserStep, setNewUserStep, styles }: INewUserTheOnesPage) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.TheStoriesPage);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>The Ones Page</AppText>
            <AppText>
                On the Ones page, you can:
            </AppText>

            <SimpleTextList items={[
                'Edit details about your One, like how you met and shared interests.',
                'Manage Action Steps with goal dates.',
                'Send Prayer Beacons (24-hour prayer requests for the community).']}
            />

            <AppText style={{ marginVertical: 16 }}>

            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Continue'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}