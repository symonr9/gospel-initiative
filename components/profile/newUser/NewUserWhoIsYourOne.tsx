import React from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, AvatarIconArray, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleIcon } from "@/components/common/SimpleIcon";
import { getRandomElement } from "@/utils/appUtils";
import { PageRow } from "@/components/common/PageRow";

type INewUserWhoIsYourOne = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserWhoIsYourOne({ newUserStep, setNewUserStep, styles }: INewUserWhoIsYourOne) {
    const onContinue = () => {
        setNewUserStep(NewUserStep.ThingsToKnowAboutTheApp);
    };
    return (
        <PageColumn style={{ gap: 16 }}>
            <AppText type={TextType.Title}>Who is your One?</AppText>
            <AppText>
                Your “One” is someone in your life who hasn’t met Jesus. Our goal is to love our neighbors genuinely by spending time, listening, serving, and sharing our stories and God’s story.
            </AppText>
            
            <PageRow center>
                <Image source={getRandomElement(AvatarIconArray)}
                    style={styles.avatarIcon} />

                <Image source={getRandomElement(AvatarIconArray)}
                                    style={styles.avatarIcon} />

                <Image source={getRandomElement(AvatarIconArray)}
                                    style={styles.avatarIcon} />
            </PageRow>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <Button title={'Continue'} onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}