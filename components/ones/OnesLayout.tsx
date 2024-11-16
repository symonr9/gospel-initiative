
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import One from '@/models/one';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import { setOneForm, setSelectedOneId, setAppError, refreshData } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import User from '@/models/user';
import { getSelectedOne } from '@/utils/appUtils';
import OneForm from '@/models/oneForm';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import Beacon from '@/models/beacon';
import { OnesLayoutFirstTime } from './layout/OnesLayoutFirstTime';
import { OnesLayoutAddingOne } from './layout/OnesLayoutAddingOne';
import { OnesLayoutEditingOne } from './layout/OnesLayoutEditingOne';
import { OnesLayoutAllOnes } from './layout/OnesLayoutAllOnes';
import { OnesLayoutNormal } from './layout/OnesLayoutNormal';


export type IOnesLayout = ViewProps & {
    selectedOneId: string | null,
    ones: One[],
    oneBeacons: Beacon[],
    executor: User,
    oneForm: OneForm,
    setAppError: Function,
    refreshData: Function,
    setSelectedOneId: Function
};


export enum OneLayoutType {
    Normal,
    FirstTime,
    AddingOne,
    EditingOne,
    AllOnes,
    ConfirmBeacon,
    SentBeaconResponse,
}

function OnesLayout({ selectedOneId, ones, oneForm, executor,
    setAppError, oneBeacons, refreshData, setSelectedOneId }: IOnesLayout) {

    const selectedOne = getSelectedOne(selectedOneId, ones);

    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const BodyLayout: any[] = [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        revertToInitialLayoutType();
    }, [executor]);

    const revertToInitialLayoutType = () => {        
        setActiveLayoutType(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    };

    if (activeLayoutType === OneLayoutType.FirstTime) {
        BodyLayout.push(
            <OnesLayoutFirstTime setMessage={setMessage} setActiveLayoutType={setActiveLayoutType}/>
        );
    } else if (activeLayoutType === OneLayoutType.AddingOne) {
        BodyLayout.push(
            <OnesLayoutAddingOne oneForm={oneForm} 
                setAppError={setAppError} 
                executor={executor} 
                refreshData={refreshData} 
                setMessage={setMessage} 
                setOneForm={setOneForm} 
                revertToInitialLayoutType={revertToInitialLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.EditingOne) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        BodyLayout.push(
            <OnesLayoutEditingOne oneForm={oneForm}
                setAppError={setAppError}
                executor={executor}
                refreshData={refreshData}
                setMessage={setMessage}
                setOneForm={setOneForm}
                revertToInitialLayoutType={revertToInitialLayoutType} 
                selectedOne={selectedOne} />
        );
    } else if (activeLayoutType === OneLayoutType.AllOnes) {
        BodyLayout.push(
            <OnesLayoutAllOnes setMessage={setMessage} 
                setActiveLayoutType={setActiveLayoutType} 
                revertToInitialLayoutType={revertToInitialLayoutType}/>
        );
    } else { // Normal
        BodyLayout.push(
            <OnesLayoutNormal selectedOneId={selectedOneId} 
                selectedOne={selectedOne} 
                ones={ones} 
                setAppError={setAppError} 
                executor={executor} 
                oneBeacons={oneBeacons}
                refreshData={refreshData} 
                setMessage={setMessage} 
                setOneForm={setOneForm} 
                setSelectedOneId={setSelectedOneId} 
                setActiveLayoutType={setActiveLayoutType}
                styles={styles}
                revertToInitialLayoutType={revertToInitialLayoutType}/>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne, OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                {
                    message && (
                        <AnimatedBanner iconSrc={AppIcon.Info} text={message} onClick={() => setMessage(null)} />
                    )
                }

                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow spaceBetween>
                                <PageColumn style={{ gap: 12 }}>
                                    <PageRow>
                                        <SimpleIcon iconSrc={selectedOne.icon} large removeBackground={false}/>
                                        <AnimatedHeader title={selectedOne.name}
                                            style={{ alignItems: 'flex-start', marginStart: 8 }}
                                            subtitle='Your One' />
                                    </PageRow>
                                </PageColumn>
                            </PageRow>
                        )
                    }
                </PageColumn>

                {BodyLayout.map((item) => item)}
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
});

const mapStateToProps = (state: any) => {
    const executor = state.users.executor;
    const selectedOneId = state.ones.selectedOneId;
    const oneBeacons = selectedOneId ? state.beacons.activeBeacons.filter((beacon: any) => {
        return beacon.oneId === selectedOneId
    }) : [];
    return {
        selectedOneId,
        oneBeacons,
        ones: state.ones.ones,
        executor,
        oneForm: state.ones.oneForm,

    };
};

const mapDispatchToProps = {
    setSelectedOneId,
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);