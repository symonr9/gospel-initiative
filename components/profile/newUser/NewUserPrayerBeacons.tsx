import React, { useState } from "react";
import { Image } from 'expo-image';
import { Button, View, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { SimpleCard } from "@/components/common/SimpleCard";
import { PageRow } from "@/components/common/PageRow";
import { Colors, useThemeColors } from "@/constants/Colors";

type INewUserPrayerBeacons = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserPrayerBeacons({ newUserStep, setNewUserStep, styles }: INewUserPrayerBeacons) {
    const [showGlobalBeacons, setShowGlobalBeacons] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    
    const { darkAlternativeColor, textColor } = useThemeColors();

    const onContinue = () => {
        setNewUserStep(NewUserStep.Stories);
    };

    const globalBeaconsSubtitle = showGlobalBeacons ? `In addition to individual prayer beacons, new Global Beacons are also randomly generated every 24 hours. These are community-wide prayer requests that prompt users to pray for our city, our neighborhoods, select groups, missionaries, and more.` : 'Tap to learn more.';
    const privacySubtitle = showPrivacy ? `To protect our Ones' privacy, we don't share their names or identifiable details. However, the user’s name, their relationship with their One, and the stage of their One’s faith journey are shared. Beacon tags can also be added to guide specific prayers.` : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 4 }}>
            <AppText type={TextType.Title}>What are Prayer Beacons?</AppText>

            <AppText>
                Prayer Beacons are prayer requests are sent out to the entire app community specifically designed for engaging and serving our Ones. They are active for 24 hours.
            </AppText>

            <PageRow center>
                <Image source={AppIcon.LightHouse}
                    tintColor={textColor}
                    style={styles.logoIcon} />
            </PageRow>

            <SimpleCard iconSrc={AppIcon.Globe}
                style={[styles.card]}
                title={'Global Beacons'}
                subtitle={globalBeaconsSubtitle}
                useTextTintForIcon={false}
                onClick={() => setShowGlobalBeacons(val => !val)} />

            <SimpleCard iconSrc={AppIcon.ShieldSecure}
                style={[styles.card]}
                title={'Privacy'}
                subtitle={privacySubtitle}
                useTextTintForIcon={false}
                onClick={() => setShowPrivacy(val => !val)} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>
            
            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}