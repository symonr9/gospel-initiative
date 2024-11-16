
import React, { useEffect } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NewUserStep } from '@/enums/enums';
import { refreshData, setAppError, setNewUserStep } from '@/redux/actions';
import ScrollLayout from '../common/ScrollLayout';
import User from '@/models/user';
import LoadingLayout from '../common/LoadingLayout';
import NewUserSplash from './newUser/NewUserSplash';
import NewUserWhatIsTheGospelInitiative from './newUser/NewUserWhatIsTheGospelInitiative';
import NewUserWhoIsYourOne from './newUser/NewUserWhoIsYourOne';
import NewUserTheOnesPage from './newUser/NewUserTheOnesPage';
import NewUserTheStoriesPage from './newUser/NewUserTheStoriesPage';
import NewUserThingsToKnowAboutTheApp from './newUser/NewUserThingsToKnowAboutTheApp';
import NewUserCreateAProfile from './newUser/NewUserCreateAProfile';
import NewUserFinished from './newUser/NewUserFinished';

export type INewUserLayout = ViewProps & {
    executor: User,
    newUserStep: NewUserStep,
    setNewUserStep: Function,
    setAppError: Function,
    refreshData: Function,
};

function NewUserLayout({ executor, newUserStep, setNewUserStep, 
    refreshData, setAppError }: INewUserLayout) {
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
    } else if (newUserStep == NewUserStep.TheOnesPage) {
        BodyLayout.push(            
            <NewUserTheOnesPage newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.TheStoriesPage) {
        BodyLayout.push(
            <NewUserTheStoriesPage newUserStep={newUserStep} 
                setNewUserStep={setNewUserStep} 
                styles={styles}/>
        );
    } else if (newUserStep == NewUserStep.ThingsToKnowAboutTheApp) {
        BodyLayout.push(
            <NewUserThingsToKnowAboutTheApp newUserStep={newUserStep} 
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
    },
    avatarIcon: {
        height: 100,
        width: 100
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