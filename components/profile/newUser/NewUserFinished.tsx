import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep, RefreshSpec } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserFinished = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    refreshData: Function;
    styles: any;
};

export default function NewUserFinished({ newUserStep, setNewUserStep, refreshData, 
    styles }: INewUserFinished) {
    const onDone = () => {
        refreshData(RefreshSpec.All);
        setNewUserStep(NewUserStep.Completed);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>Setup Complete</AppText>

            <AppText>
                Thank you for downloading our app and we hope that it is helpful as you share your life
                and faith with those around you!
            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Done'} onPress={onDone} />
            </PageColumn>
        </PageColumn>
    );
}