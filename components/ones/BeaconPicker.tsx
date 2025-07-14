import { AppIcon, Priority, RefreshSpec } from '@/enums/enums';
import React, { useState } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import { connect, useSelector } from 'react-redux';
import { generateRandomId, getTomorrow } from '@/utils/appUtils';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { selectActiveBeaconsWithActivities, selectExpiredBeaconsWithActivities, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import { refreshData, setAppError, setSelectedTemplateId } from '@/redux/actions';
import { createBeacon } from "@/requests/beaconRequests";
import User from '@/models/user';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import Beacon from '@/models/beacon';
import { OneLayoutType } from './OnesLayout';
import { ActiveBeaconsActivityList } from '../beacons/ActiveBeaconsActivityList';
import BeaconTemplatesList from '../beacons/BeaconTemplatesList';
import PageResponse from '../common/PageResponse';
import ExpiredBeaconsList from '../beacons/ExpiredBeaconsList';
import AppError from '@/models/error';

export type IBeaconPicker = ViewProps & {
    selectedOneId: string | null;
    ones: One[],
    executor: User,
    beaconTemplates: BeaconTemplate[],
    expiredBeacons: Beacon[],
    beaconForm: BeaconForm,
    selectedTemplateId: String,
    setSelectedTemplateId: Function,
    refreshData: Function,
    setAppError: Function, 
    basicMode?: boolean
};

export enum PickerState {
    Launch,
    Normal,
    Adding,
    Editing,
    Removing,
    Completing
}

const BeaconPicker = ({ ones, executor, beaconTemplates, beaconForm,
    selectedTemplateId, setSelectedTemplateId, refreshData, selectedOneId, 
    expiredBeacons, setAppError, basicMode = false }: IBeaconPicker) => {
    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const activeBeaconsWithActivities = useSelector(selectActiveBeaconsWithActivities(selectedOneId));
    const BodyLayout: any[] = [];

    if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        if (!selectedOneId) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOneId).'}
                    title={'Something went wrong'} />
            );
        }

        const onConfirm = async () => {
            const shouldAddBeacon = selectedTemplateId != null
                && executor != null && selectedOneId != null;
            if (!shouldAddBeacon) {
                console.error('Failed to add beacon, invalid state');
                return;
            }

            const selectedTemplate = beaconTemplates.find((template) => template.id === selectedTemplateId);
            if (!selectedTemplate) {
                console.error("Failed to find matching template: ", selectedTemplateId);
                return;
            } else if (!beaconForm) {
                console.error("Failed to find beacon form...");
                return;
            }

            const newBeacon = new Beacon(
                generateRandomId(),
                selectedTemplate.name,
                beaconForm.notes || null,
                selectedOneId,
                Priority.Normal,
                executor.id,
                selectedTemplate.type,
                getTomorrow(),
                beaconForm.shareOwnName,
                [],
                beaconForm.tags,
                false,
                false
            );

            const response = await createBeacon(newBeacon);
            if (response.error) {
                setAppError(new AppError('Error creating beacon: ', response.error));
                return;
            }

            refreshData(RefreshSpec.Beacons);
            setMessage(null);
            setSelectedTemplateId(null);
            setActiveLayoutType(OneLayoutType.SentBeaconResponse);
        };

        const headerLayout = (
            <PageRow spaceEvenly style={{ marginBottom: 24 }}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    onClick={onConfirm}
                    title={'Confirm'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                headerLayout={headerLayout}
                basicMode={basicMode}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.SentBeaconResponse) {
        if (!selectedOneId) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOneId).'}
                    title={'Something went wrong'} />
            );
        }

        BodyLayout.push(
            <View>
                <PageResponse title={'Beacon successful!'}
                    details={'Your church community is praying for you. Please check in later.'} />
                <PageRow spaceEvenly>
                    <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                        onClick={() => {
                            setMessage(null);
                            setSelectedTemplateId(null);
                            setActiveLayoutType(OneLayoutType.Normal);
                        }}
                        title={'Back'} />
                </PageRow>
            </View>
        );
    } else { // Normal
        if (!basicMode && !selectedTemplateId && activeBeaconsWithActivities.length > 0) {
            BodyLayout.push(
                <ActiveBeaconsActivityList activeBeaconsWithActivities={activeBeaconsWithActivities}
                    refreshData={refreshData}
                    setAppError={setAppError} />
            );
        } else {
            BodyLayout.push(
                <>
                    <BeaconTemplatesList activeLayoutType={activeLayoutType}
                        basicMode={basicMode}
                        setActiveLayoutType={setActiveLayoutType} />
                </>
            );
        }

        if (!basicMode && selectedTemplateId === null && expiredBeacons.length > 0) {
            BodyLayout.push(
                <ExpiredBeaconsList />
            );
        }
    }

    return (
        <PageColumn style={styles.container}>
            {BodyLayout.map((item) => item)}
        </PageColumn>
    );
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        paddingBottom: 8,
        gap: 12
    },
    pageHeader: {
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
    },
    beaconList: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
    },
    iconCard: {
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        flex: 1,
        paddingVertical: 8
    },
    selectedIconCard: {
        backgroundColor: '#bbeccc',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    iconList: {
    },
    icon: {
        width: 28,
        height: 28,
        margin: 2,
        opacity: 0.5
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => {
    const { completedBeacons = [], incomingBeacons = [] } = selectPartitionedActiveEnhancedBeacons(state);
    return {
        ones: state.ones.ones,
        selectedOneId: state.ones.selectedOneId,
        executor: state.users.executor,
        beaconForm: state.beacons.beaconForm,
        selectedTemplateId: state.beacons.selectedTemplateId,
        beaconTemplates: state.beacons.beaconTemplates,    
        expiredBeacons: state.beacons.expiredBeacons,
        completedBeacons,
        incomingBeacons,
    };
};


const mapDispatchToProps = {
    setSelectedTemplateId,
    refreshData,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconPicker);