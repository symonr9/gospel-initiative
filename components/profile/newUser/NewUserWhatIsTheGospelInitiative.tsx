import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";

type INewUserWhatIsTheGospelInitiative = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserWhatIsTheGospelInitiative({ newUserStep, setNewUserStep, styles }: INewUserWhatIsTheGospelInitiative) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.WhoIsYourOne);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>What is the Gospel Initiative?</AppText>
            <AppText>
                The Gospel Initiative empowers Christians to share, live, and spread the Gospel through:
            </AppText>

            <SimpleTextList items={['Sharing Jesus', 'Loving the City', 'Reaching the World']} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}