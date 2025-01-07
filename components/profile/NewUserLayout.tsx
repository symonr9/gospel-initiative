
import React, { useEffect } from 'react';
import { View, ViewProps, StyleSheet, useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';
import { NewUserStep } from '@/enums/enums';
import { refreshData, setAppError, setNewUserStep } from '@/redux/actions';
import ScrollLayout from '../common/ScrollLayout';
import User from '@/models/user';
import LoadingLayout from '../common/LoadingLayout';
import NewUserSplash from './newUser/NewUserSplash';
import NewUserWhatIsTheGospelInitiative from './newUser/NewUserWhatIsTheGospelInitiative';
import NewUserWhoIsYourOne from './newUser/NewUserWhoIsYourOne';
import NewUserStories from './newUser/NewUserStories';
import NewUserPrayerBeacons from './newUser/NewUserPrayerBeacons';
import NewUserCreateAProfile from './newUser/NewUserCreateAProfile';
import NewUserFinished from './newUser/NewUserFinished';
import { Colors } from '@/constants/Colors';
import NewUserActionSteps from './newUser/NewUserActionSteps';

export type INewUserLayout = ViewProps & {
    executor: User,
    newUserStep: NewUserStep,
    setNewUserStep: Function,
    setAppError: Function,
    refreshData: Function,
};

function NewUserLayout({ executor, newUserStep, setNewUserStep, 
    refreshData, setAppError }: INewUserLayout) {
    const layout = useWindowDimensions();

    useEffect(() => {

    }, [newUserStep]);

    const BodyLayout: any[] = [];

    if (newUserStep === NewUserStep.Splash) {
        BodyLayout.push(
            <NewUserSplash newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.WhatIsTheGospelInitiative) {
        BodyLayout.push(            
            <NewUserWhatIsTheGospelInitiative newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.WhoIsYourOne) {
        BodyLayout.push(            
            <NewUserWhoIsYourOne newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.Stories) {
        BodyLayout.push(
            <NewUserStories newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.PrayerBeacons) {
        BodyLayout.push(
            <NewUserPrayerBeacons newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.ActionSteps) {
        BodyLayout.push(
            <NewUserActionSteps newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.CreateAProfile) {
        BodyLayout.push(
            <NewUserCreateAProfile newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                setAppError={setAppError}
                executor={executor}
                styles={styles}/>
        );
    } else if (newUserStep === NewUserStep.Finished) {
        BodyLayout.push(
            <NewUserFinished newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep}
                refreshData={refreshData}
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.Loading) {
        BodyLayout.push(<LoadingLayout />);
    }

    return (
        <ScrollLayout style={[styles.container, { height: layout.height }]}>
            {BodyLayout.map((item) => item)}
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: Colors.light.background,
    },
    splashIcon: {
        marginVertical: 8,
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    splashIconPractice: {
        marginVertical: 8,
        height: 270,
        width: 220,
        alignSelf: 'center',
    },
    logoIcon: {
        marginVertical: 8,
        height: 120,
        width: 120,
        alignSelf: 'center',
    },
    avatarIcon: {
        height: 64,
        width: 64
    },
    section: {
        marginVertical: 12,
        alignItems: 'center'
    },
    nameSection: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4,
        borderRadius: 8,
        alignSelf: 'center',
    },
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        newUserStep: state.app.newUserStep,
    };
};

const mapDispatchToProps = {
    setNewUserStep,
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserLayout);