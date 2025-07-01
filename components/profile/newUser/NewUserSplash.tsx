import React, { useState } from "react";
import { Image } from 'expo-image';
import { Button, View, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { Colors, useThemeColors } from "@/constants/Colors";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { PageRow } from "@/components/common/PageRow";
import { SimpleCard } from "@/components/common/SimpleCard";

type INewUserSplash = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserSplash({ newUserStep, setNewUserStep, styles }: INewUserSplash) {
    const [showGoal1, setShowGoal1] = useState(false);
    const [showGoal2, setShowGoal2] = useState(false);
    const [showGoal3, setShowGoal3] = useState(false);

    const { textColor, darkAlternativeColor } = useThemeColors();

    const onLearnGospelInitiative = () => {
        setNewUserStep(NewUserStep.WhatIsTheGospelInitiative);
    };

    const goal1Subtitle = showGoal1 ? 'To equip us to grow in their confidence in sharing their personal faith journey and God’s redemptive story.' : 'Tap to learn more.';
    const goal2Subtitle = showGoal2 ? 'To help us intentionally love and engage with people in their lives through structured tools and resources.' : 'Tap to learn more.';
    const goal3Subtitle = showGoal3 ? 'To connect our community in prayer as we collectively grow in our confidence to share our faith and lives with others.' : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 4 }}>
            <AppText type={TextType.Title} style={{ color: textColor }}>The Gospel Initiative</AppText>

            <AppText style={{ color: textColor }}>
                The Gospel Initiative App is a tool designed with three main goals in mind.
            </AppText>

            <Image source={AppIcon.AppLogoTransparent}
                tintColor={textColor}
                style={styles.logoIcon} />

            <SimpleCard iconSrc={AppIcon.Conversation}
                style={[styles.card]}
                title={'Confidence to Share our Faith'}
                subtitle={goal1Subtitle}
                onClick={() => setShowGoal1(val => !val)} />

            <SimpleCard iconSrc={AppIcon.Friend}
                style={[styles.card]}
                title={'Engage with Others'}
                subtitle={goal2Subtitle}
                onClick={() => setShowGoal2(val => !val)} />

            <SimpleCard iconSrc={AppIcon.Prayer}
                style={[styles.card]}
                title={'Connect in Prayer'}
                subtitle={goal3Subtitle}
                onClick={() => setShowGoal3(val => !val)} />

            <PageColumn style={{ alignSelf: 'center' }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onLearnGospelInitiative} />
            </PageColumn>

            
            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}