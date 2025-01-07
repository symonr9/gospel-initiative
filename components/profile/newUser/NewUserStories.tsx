import React, { useState, useEffect } from "react";
import { Image } from 'expo-image';
import { Button, ViewProps } from "react-native";
import { AppIcon, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { SimpleCard } from "@/components/common/SimpleCard";
import { PageRow } from "@/components/common/PageRow";
import { Colors } from "@/constants/Colors";

type INewUserStories = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;
};

// Not currently used.
export default function NewUserStories({ newUserStep, setNewUserStep, styles }: INewUserStories) {
    const [showPractice, setShowPractice] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [showLibrary, setShowLibrary] = useState(false);

    const onContinue = () => {
        setNewUserStep(NewUserStep.CreateAProfile);
    };

    const practiceSubtitle = showPractice ? `Once a day, users receive a curated question to share a part of their faith journey, answering by typing or using their phone's dictation feature.` : 'Tap to learn more.';
    const aiSubtitle = showAI ? `After responding, smart AI securely processes their answer into 'Story Chapter' cards with summaries, related tags, and follow-up questions.` : 'Tap to learn more.';
    const librarySubtitle = showLibrary ? 'These cards are saved in a library, easily filtered by tag and category. As users gather more cards, they can explore key aspects of their story and reflect on their faith journey in meaningful ways.' : 'Tap to learn more.';

    return (
        <PageColumn style={{ gap: 4 }}>
            <AppText type={TextType.Title}>What are Stories?</AppText>

            <AppText>
                Stories help users build confidence in sharing their testimony while creating a library of their journey to reflect on and revisit.
            </AppText>
            
            <PageRow center>
                <Image source={AppIcon.PracticeTestimonySplash}
                    style={styles.splashIconPractice} />
            </PageRow>

            <SimpleCard iconSrc={AppIcon.Microphone}
                style={[styles.card]}
                title={'Practice your Testimony'}
                subtitle={practiceSubtitle}
                onClick={() => setShowPractice(val => !val)} />

            <SimpleCard iconSrc={AppIcon.Settings}
                style={[styles.card]}
                title={'Smart AI'}
                subtitle={aiSubtitle}
                onClick={() => setShowAI(val => !val)} />

            <SimpleCard iconSrc={AppIcon.Book2}
                style={[styles.card]}
                title={'Add to your Library'}
                subtitle={librarySubtitle}
                onClick={() => setShowLibrary(val => !val)} />

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    onPress={onContinue} />
            </PageColumn>
        </PageColumn>
    );
}