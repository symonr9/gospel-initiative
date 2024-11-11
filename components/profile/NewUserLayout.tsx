
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { View, ViewProps, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { AppIcon, NewUserStep } from '@/enums/enums';
import { setAppError, setNewUserStep } from '@/redux/actions';
import ScrollLayout from '../common/ScrollLayout';
import User from '@/models/user';
import LoadingLayout from '../common/LoadingLayout';
import { PageColumn } from '../common/PageColumn';
import { AppText, TextType } from '../common/AppText';

export type INewUserLayout = ViewProps & {
    executor: User,
    newUserStep: NewUserStep;
    setNewUserStep: Function,
    setAppError: Function,
};

function NewUserLayout({ executor, newUserStep, setNewUserStep, setAppError }: INewUserLayout) {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {

    }, [newUserStep]);

    const BodyLayout: any[] = [];

    if (newUserStep === NewUserStep.Splash) {
        const onLearnGospelInitiative = () => {
            setNewUserStep(NewUserStep.WhatIsTheGospelInitiative);
        };

        const onLearnApp = () => {
            setNewUserStep(NewUserStep.TheOnesPage);
        };

        const onSkipToUserCreation = () => {
            setNewUserStep(NewUserStep.CreateAProfile);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Welcome to the Gospel Initiative App!</AppText>
                <AppText>
                    This app is a tool used to help us be intentional about loving those in our lives, connect with others in prayer, and gain confidence in sharing our testimony.
                </AppText>
                <AppText style={{ marginVertical: 16 }}>
                    Do you want to learn more about the Gospel Initiative or skip to the main features of the app?
                </AppText>
                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Learn More About the Gospel Initiative'} onPress={onLearnGospelInitiative} />
                    <Button title={'Learn More About this App'} onPress={onLearnApp} />
                    <Button title={'Skip to User Creation'} onPress={onSkipToUserCreation} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.WhatIsTheGospelInitiative) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.WhoIsYourOne);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>What is the Gospel Initiative?</AppText>
                <AppText>
                    The purpose of the Gospel Initiative is to empower Christians to share, live, and send the Gospel. As part of this directive, we are focusing our attention on:
                </AppText>
                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText>
                        1. Sharing Jesus
                    </AppText>
                    <AppText>
                        2. Loving the City
                    </AppText>
                    <AppText>
                        3. Reaching our World
                    </AppText>
                </PageColumn>

                <AppText style={{ marginVertical: 16 }}>
                    As part of our endeavor, we have been praying for God to put someone in our heart who we are choosing to be more intentional to share our lives and faith with. We’re calling this person our “One”.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.WhoIsYourOne) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.TheOnesPage);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Who is your One?</AppText>
                <AppText>
                    Our “One” is a person in our lives who doesn’t yet know Jesus. As Christians, we are committed to loving our neighbor through quality time, genuine listening, acts of service, and sharing both our story and the story of God.
                </AppText>
                <AppText style={{ marginVertical: 16 }}>
                        Our Ones aren’t projects but friends who we are choosing to intentionally share both our lives and our faith with, regardless of the outcome.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.TheOnesPage) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.TheStoriesPage);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>The Ones Page</AppText>
                <AppText>
                    On the Ones page, you can edit details about your One. This can include:
                </AppText>

                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText>
                        Info as to when you met, your mutual hobbies and interests, Christians in their life, etc.
                    </AppText>
                    <AppText>
                        Managing “Action Steps”, next steps to take in your relationship with your One with goal dates.
                    </AppText>
                    <AppText>
                        Sending out “Prayer Beacons”, which are prayer requests that are active for 24 hours that the rest of the Gospel Initiative community can be praying over.
                    </AppText>
                </PageColumn>

                <AppText style={{ marginVertical: 16 }}>

                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.TheStoriesPage) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.ThingsToKnowAboutTheApp);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>The Stories Page</AppText>
                <AppText>
                    There are three components to the Story page.
                </AppText>

                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText>
                        (1) Once a day, you are able to practice your testimony. You will be given a prompt to answer related to your story. You can answer either by text or using your phone’s built-in dictation feature. After submitting your response, the app will process your testimony and smartly paraphrase it into a card and apply “Story Tags” and “Name Tags”. Make edits and save.
                    </AppText>
                    <AppText>
                        (2) As you create Story cards, they will appear in your library. All of the stories you create can be filtered so that you can find and identify specific themes of your testimony.
                    </AppText>
                    <AppText>
                       (3) There are additionally resources with information about the Gospel in itself.
                    </AppText>
                </PageColumn>

                <AppText style={{ marginVertical: 16 }}>
                    
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.ThingsToKnowAboutTheApp) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.CreateAProfile);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Things about the App to know</AppText>

                <PageColumn style={{ marginVertical: 8 }}>
                    <AppText>
                        (1) Anonymity: We care deeply about your privacy and the privacy of your One. As such, any information you add about your One does not get publicly shared with others. You can add ‘Beacon Tags’ that help specify how others can be praying for your One without disclosing personal information.
                    </AppText>
                    <AppText>
                        (2) Habit-Forming: This app works best when it becomes a daily habit of praying for beacons, practicing your testimony, and challenging yourself with the action steps you set for yourself.
                    </AppText>
                </PageColumn>

                <AppText style={{ marginVertical: 16 }}>
                    
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.CreateAProfile) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.AddOneNow);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>New Profile</AppText>

                <AppText>
                    Time to create a profile! Add a name and profile picture for yourself.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.AddOneNow) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.PrayForBeaconsNow);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Prayer Beacons page</AppText>

                <AppText>
                    Below is an example of what a prayer beacon looks like. Tap on the icon to open up the
                    prayer details.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.PrayForBeaconsNow) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.PracticeTestimonyNow);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Prayer Beacons page</AppText>

                <AppText>
                    Below is an example of what a prayer beacon looks like. Tap on the icon to open up the
                    prayer details.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.PracticeTestimonyNow) {
        const onContinue = () => {
            setNewUserStep(NewUserStep.Finished);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Practice Testimony</AppText>

                <AppText>
                    Here is an example for how you practice your testimony.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Continue'} onPress={onContinue} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep === NewUserStep.Finished) {
        const onDone = () => {
            setNewUserStep(NewUserStep.Completed);
        };

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                <Image source={AppIcon.AppLogo}
                    style={styles.logoIcon} />
                <AppText type={TextType.Title}>Tutorial Complete</AppText>

                <AppText>
                    Those are the main features of the Gospel Initiative app.
                </AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Done'} onPress={onDone} />
                </PageColumn>
            </PageColumn>
        );
    } else if (newUserStep == NewUserStep.Loading) {
        BodyLayout.push(<LoadingLayout />);
    }

    return (
        <ScrollLayout>
            <View style={styles.container}>
                {BodyLayout.map((item) => item)}
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 12,
    },
    logoIcon: {
        height: 100,
        width: 300,
        alignSelf: 'center',
    }
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        newUserStep: state.app.newUserStep,
    };
};

const mapDispatchToProps = {
    setNewUserStep,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserLayout);