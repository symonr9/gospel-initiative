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
import { Colors } from "@/constants/Colors";

type INewUserActionSteps = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserActionSteps({ newUserStep, setNewUserStep, styles }: INewUserActionSteps) {
    const [showCalendar, setShowCalendar] = useState(false);

    const onContinue = () => {
        setNewUserStep(NewUserStep.PrayerBeacons);
    };

    const calendarSubtitle = showCalendar ? `Action Steps can be added to your default calendar configured with reminders and notes.` : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 4 }}>
            <AppText type={TextType.Title}>What are Action Steps?</AppText>

            <AppText>
                Action Steps help you plan and track practical next steps for sharing your faith or serving your One.
            </AppText>

            <PageRow center>
                <Image source={AppIcon.AppLogoTransparent}
                    tintColor={Colors.light.darkAlternative}
                    style={styles.logoIcon} />
            </PageRow>

            <SimpleCard iconSrc={AppIcon.Calendar}
                style={[styles.card]}
                title={'Add to your iCalendar or Google Calendar'}
                subtitle={calendarSubtitle}
                onClick={() => setShowCalendar(val => !val)} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>

            
            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}