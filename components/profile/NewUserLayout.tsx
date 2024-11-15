
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
import { SimpleTextList } from '../common/SimpleTextList';

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
                    This app helps you love others intentionally, connect in prayer, and grow in sharing your testimony.
                </AppText>
                <AppText style={{ marginVertical: 16 }}>
                    Would you like to learn more about the Gospel Initiative or go straight to the app’s main features?
                </AppText>
                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Learn More About the Gospel Initiative'} onPress={onLearnGospelInitiative} />
                    <Button title={'Learn More About the App'} onPress={onLearnApp} />
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
                    The Gospel Initiative empowers Christians to share, live, and spread the Gospel through:
                </AppText>

                <SimpleTextList items={['Sharing Jesus', 'Loving the City', 'Reaching the World']}/>

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
                    Your “One” is someone in your life who hasn’t met Jesus. Our goal is to love our neighbors genuinely by spending time, listening, serving, and sharing our stories and God’s story.
                </AppText>

                <AppText style={{ marginVertical: 16 }}>
                    
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
                    On the Ones page, you can:
                </AppText>

                <SimpleTextList items={[
                    'Edit details about your One, like how you met and shared interests.', 
                    'Manage Action Steps with goal dates.',
                    'Send Prayer Beacons (24-hour prayer requests for the community).']}
                />
                
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
                    The Story page has three main parts:
                </AppText>

                <SimpleTextList items={[
                    'Practice your testimony daily by responding to prompts. Save and tag your story in your library.', 
                    'Find and filter your saved Story cards by theme.',
                    'Access Gospel resources.']}
                />

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

                <SimpleTextList items={[
                    'Anonymity: Your One’s info remains private. Use “Beacon Tags” for prayer requests without sharing personal details.', 
                    'Habit-Building: Best used daily to form habits of prayer, testimony, and action steps.',
                    'Relationship Focused: This app supports genuine relationships based on compassion, not as a substitute for authentic engagement.']}
                />
                
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
                    Time to create a profile! Add a name and picture.
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
                <AppText type={TextType.Title}>Add One</AppText>

                <AppText>Would you like to add your One?</AppText>

                <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                    <Button title={'Yes - Add One'} onPress={onContinue} />
                    <Button title={'Skip for Later'} onPress={onContinue} />
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
                <AppText type={TextType.Title}>Prayer Beacons</AppText>

                <AppText>Here is an example of what the Prayer page looks like.</AppText>

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
                    <Button title={'Yes - Practice Testimony'} onPress={onContinue} />
                    <Button title={'Skip for Later'} onPress={onContinue} />
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
                    Thank you for downloading our app.
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