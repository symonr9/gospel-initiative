import React, { useState } from "react";
import { Image } from 'expo-image';
import { Button, View, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { SimpleCard } from "@/components/common/SimpleCard";
import { AnimatedHeader } from "@/components/common/AnimatedHeader";

type INewUserWhatIsTheGospelInitiative = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

export default function NewUserWhatIsTheGospelInitiative({ newUserStep, setNewUserStep, styles }: INewUserWhatIsTheGospelInitiative) {
    const [showShareJesus, setShowShareJesus] = useState(false);
    const [showLoveCity, setShowLoveCity] = useState(false);
    const [showReachWorld, setShowReachWorld] = useState(false);

    const onContinue = () => {
        setNewUserStep(NewUserStep.WhoIsYourOne);
    };

    const shareJesusSubtitle = showShareJesus ? 'As a community, we want to share both the Gospel and the story of the transformation we have experienced in following Jesus. This app is a tool to help us build our confidence in that!' : 'Tap to learn more.';
    const loveCitySubtitle = showLoveCity ? 'We also want to love our city and meet the needs of different groups in our city. We want to partner with others to make a difference in the lives of those around us.' : 'Tap to learn more.';
    const reachWorldSubtitle = showReachWorld ? 'Lastly, we want to reach the world with the good news of the Gospel, broadening our horizons to see how we can share the story of Jesus and meet the needs of others by going to other nations to serve.' : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 4 }}>
            <AnimatedHeader title={"What is the Gospel Initiative?"}
                subtitle={"The Gospel Initiative is a movement started by Redemption Church that empowers Christians to share, live, and spread the Gospel through:"} />

            <SimpleCard iconSrc={AppIcon.Jesus}
                style={[styles.card]}
                title={'Sharing Jesus'}
                subtitle={shareJesusSubtitle}
                onClick={() => setShowShareJesus(val => !val)} />

            <SimpleCard iconSrc={AppIcon.City}
                style={[styles.card]}
                title={'Loving our City'}
                subtitle={loveCitySubtitle}
                onClick={() => setShowLoveCity(val => !val)} />

            <SimpleCard iconSrc={AppIcon.Globe}
                style={[styles.card]}
                title={'Reaching the World'}
                subtitle={reachWorldSubtitle}
                onClick={() => setShowReachWorld(val => !val)} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>

            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}