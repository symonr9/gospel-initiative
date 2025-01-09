import React, { useState } from "react";
import { Image } from 'expo-image';
import { Button, View, ViewProps } from "react-native";
import { AppIcon, AvatarIconArray, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleIcon } from "@/components/common/SimpleIcon";
import { getRandomElement } from "@/utils/appUtils";
import { PageRow } from "@/components/common/PageRow";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { SimpleCard } from "@/components/common/SimpleCard";

type INewUserWhoIsYourOne = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserWhoIsYourOne({ newUserStep, setNewUserStep, styles }: INewUserWhoIsYourOne) {
    const [showExtra, setShowExtra] = useState(false);

    const onContinue = () => {
        setNewUserStep(NewUserStep.ActionSteps);
    };

    const extraSubtitle = showExtra ? `You'll soon be able to add your One to the app and journal notes about your friendship and their faith journey. This is 100% private and only you will get to see this information.` : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 12 }}>
            <AppText type={TextType.Title}>Who is your One?</AppText>
            <AppText>
                Your “One” is someone in your life who hasn’t met Jesus.
            </AppText>

            <AppText>
                Our goal is to love our neighbors genuinely by spending time, listening, serving, and sharing our stories and God’s story.
            </AppText>

            <PageRow center style={{ gap: 24, marginVertical: 8 }}>
                <Image source={getRandomElement(AvatarIconArray)}
                    style={styles.avatarIcon} />

                <Image source={getRandomElement(AvatarIconArray)}
                    style={styles.avatarIcon} />

                <Image source={getRandomElement(AvatarIconArray)}
                    style={styles.avatarIcon} />

                <Image source={getRandomElement(AvatarIconArray)}
                    style={styles.avatarIcon} />
            </PageRow>

            <PageRow center>
                <Image source={AppIcon.MeetingWithOneSplash}
                    style={styles.splashIcon} />
            </PageRow>

            <AppText>
                The first step is thinking about people in your life who don't know Jesus.
            </AppText>

            <AppText>
                Who can you be intentional in sharing both your faith and your life with?
            </AppText>

            <SimpleCard iconSrc={AppIcon.GroupOfThree}
                style={[styles.card]}
                title={'Adding your One to the App'}
                subtitle={extraSubtitle}
                onClick={() => setShowExtra(val => !val)} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>

            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}