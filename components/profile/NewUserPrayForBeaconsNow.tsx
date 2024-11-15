import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";

type INewUserPrayForBeaconsNow = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserPrayForBeaconsNow({ newUserStep, setNewUserStep, styles }: INewUserPrayForBeaconsNow) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.PracticeTestimonyNow);
    };

    return (
        <PageColumn style={{ gap: 16 }}>
            <Image source={AppIcon.AppLogo}
                style={styles.logoIcon} />
            <AppText type={TextType.Title}>Prayer Beacons</AppText>

            <AppText>Here is an example of what the Prayer page looks like.</AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Continue'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}