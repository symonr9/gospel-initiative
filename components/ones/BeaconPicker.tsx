import { AppIcon, Priority } from '@/enums/enums';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import { connect, useSelector } from 'react-redux';
import { generateRandomId, getTomorrow } from '@/utils/appUtils';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { selectActiveBeaconsWithActivities, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import { addBeacon, setAppError, setSelectedTemplateId } from '@/redux/actions';
import { createBeacon } from '@/requests/Requests';
import User from '@/models/user';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { OneLayoutType } from './OnesLayout';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ActiveBeaconsActivityList } from '../beacons/ActiveBeaconsActivityList';
import BeaconTemplatesList from '../beacons/BeaconTemplatesList';
import PageResponse from '../common/PageResponse';
import ScrollLayout from '../common/ScrollLayout';

export type IActionStepPicker = ViewProps & {
    selectedOne: One;
    ones: One[],
    executor: User,
    beaconTemplates: BeaconTemplate[],
    beaconForm: BeaconForm,
    selectedTemplateId: String,
    setSelectedTemplateId: Function,
    addBeacon: Function,
    setAppError: Function,
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
    selectedTemplateId, setSelectedTemplateId, addBeacon, selectedOne, setAppError }: IActionStepPicker) => {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const activeBeaconsWithActivities = useSelector(selectActiveBeaconsWithActivities(selectedOne?.id));
    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    if (activeLayoutType === OneLayoutType.AllBeaconTemplates) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        const onConfirm = async () => {
            const shouldAddBeacon = selectedTemplateId != null
                && executor != null && selectedOne != null;
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
                selectedOne.id,
                Priority.Normal,
                executor.id,
                selectedTemplate.type,
                getTomorrow(),
                beaconForm.shareOwnName,
                [],
                beaconForm.tags
            );

            const response = await createBeacon(newBeacon);
            if (response.error) {
                setAppError(new Error('Error creating beacon: ', response.error));
                return;
            }

            addBeacon(response);
            setMessage(null);
            setSelectedTemplateId(null);
            setActiveLayoutType(OneLayoutType.SentBeaconResponse);
        };

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.AllBeaconTemplates);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    onClick={onConfirm}
                    title={'Confirm'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.SentBeaconResponse) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <PageResponse title={'Beacon successful!'}
                    details={'Your church community is praying for you. Please check in later.'} />
            </View>
        );
    } else { // Normal
        if (activeBeaconsWithActivities.length > 0) {
            BodyLayout.push(
                <ActiveBeaconsActivityList activeBeaconsWithActivities={activeBeaconsWithActivities} 
                    setAppError={setAppError}/>
            );
        } else {
            BodyLayout.push(
                <BeaconTemplatesList activeLayoutType={activeLayoutType}
                    setActiveLayoutType={setActiveLayoutType} />
            );
        }
    }

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageColumn>
                    <Animated.View entering={FadeInDown.duration(200).delay(50)}
                        style={{ width: '100%' }}
                        exiting={FadeOutDown.duration(200)}>
                        {HeaderLayout.map((item) => item)}
                    </Animated.View>
                </PageColumn>

                {BodyLayout.map((item) => item)}
            </View>
        </ScrollLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2
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
        backgroundColor: '#fff',
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
        selectedOne: state.ones.selectedOne,
        executor: state.users.executor,
        beaconForm: state.beacons.beaconForm,
        selectedTemplateId: state.beacons.selectedTemplateId,
        beaconTemplates: state.beacons.beaconTemplates,
        completedBeacons,
        incomingBeacons,
    };
};


const mapDispatchToProps = {
    setSelectedTemplateId,
    addBeacon,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconPicker);