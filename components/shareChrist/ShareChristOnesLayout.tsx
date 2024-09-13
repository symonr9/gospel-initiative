
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import One from '@/models/one';
import OneFactsList from '../ones/OneFactsList';
import ActionStepsList from '../ones/ActionStepsList';
import { AppIcon, Page, Priority, ShareChristPageState } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { PageContainer } from '../common/PageContainer';
import { ActiveBeaconsInfoCard } from '../beacons/ActiveBeaconsInfoCard';
import { selectActiveBeaconsWithActivities } from '@/redux/selectors/beaconSelectors';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import Beacon, { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsActivityCard } from '../beacons/ActiveBeaconsActivityCard';
import { addActionStep, addBeacon, addOne, editOne, setOneForm, setSelectedOne, setSelectedTemplateId, editActionSteps, setShareChristPageState } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import BeaconTemplatesList from '../beacons/BeaconTemplatesList';
import User from '@/models/user';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import { generateRandomId, getNow, getTomorrow } from '@/utils/appUtils';
import ShareChristAddEditOneForm from './ShareChristAddEditOneForm';
import OneForm from '@/models/oneForm';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { AnimatedBanner } from '../common/AnimatedBanner';

export type IShareChristOnesLayout = ViewProps & {
    selectedOne: One,
    ones: One[],
    executor: User,
    oneForm: OneForm,
    beaconTemplates: BeaconTemplate[],
    setSelectedTemplateId: Function,
    addBeacon: Function,
    addOne: Function,
    editOne: Function,
    addActionStep: Function,
    editActionSteps: Function,
    setSelectedOne: Function
};

export enum OneLayoutType {
    Normal,
    FirstTime,
    AddingOne,
    EditingOne,
    AllBeaconTemplates,
    ConfirmBeacon,
    SentBeaconResponse,
}

function ShareChristOnesLayout({ selectedOne, ones, oneForm,
    executor, setSelectedTemplateId, beaconTemplates, addBeacon, editOne,
    addOne, addActionStep, editActionSteps, setSelectedOne }: IShareChristOnesLayout) {
    const activeBeaconsWithActivities = selectedOne ? useSelector(selectActiveBeaconsWithActivities(selectedOne.id)) : [];
    const actionsStepsForSelectedOne = selectedOne ? useSelector((state: any) => selectActionStepsByOneId(state, selectedOne.id)) : [];
    const selectedTemplateId = useSelector((state: any) => state.beacons.selectedTemplateId);
    const beaconForm = useSelector((state: any) => state.beacons.beaconForm);

    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    if (activeLayoutType === OneLayoutType.FirstTime) {
        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.Plus}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AddingOne);
                    }}
                    title={'New One'} />
            </PageRow>
        );

        BodyLayout.push(
            <PageRow>
                <PageResponse title={'Welcome'}
                    details={'Please add your One to get started.'} />
            </PageRow>
        );
    } else if (activeLayoutType === OneLayoutType.AddingOne) {
        const onSave = () => {
            const newOneId = generateRandomId();

            addOne(
                new One(
                    newOneId,
                    oneForm.name,
                    oneForm.icon,
                    oneForm.stage,
                    getNow(),
                    false,
                    executor.id
                )
            );

            for (let actionStep of oneForm.actionSteps) {
                actionStep.oneId = newOneId;
                addActionStep(actionStep);
            }

            setOneForm(OneForm.createDefault());
            setMessage("Your One has been successfully created!");
            setActiveLayoutType(OneLayoutType.Normal);
        };

        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    title={'Save'} />
            </PageRow>
        );

        BodyLayout.push(
            <ShareChristAddEditOneForm initialOneForm={OneForm.createDefault()} />
        );
    } else if (!selectedOne) { // All layouts below require a selected one...
        return <></>;
    } else if (activeLayoutType === OneLayoutType.EditingOne) {
        const onSave = () => {
            const newOne = {
                ...selectedOne,
                name: oneForm.name,
                icon: oneForm.icon,
                stage: oneForm.stage
            };

            editOne(newOne);

            editActionSteps(
                oneForm.actionSteps.map((actionStep) => ({
                    ...actionStep,
                    oneId: selectedOne.id
                })),
                selectedOne.id,
            );

            setSelectedOne(newOne);
            setOneForm(OneForm.createDefault());
            setMessage("Your One has been successfully updated!");
            setActiveLayoutType(OneLayoutType.Normal);
        };

        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    title={'Save'} />
            </PageRow>
        );

        const initialOneForm = OneForm.createFromOne(selectedOne, actionsStepsForSelectedOne);
        BodyLayout.push(
            <ShareChristAddEditOneForm editing
                initialOneForm={initialOneForm} />
        );
    } else if (activeLayoutType === OneLayoutType.AllBeaconTemplates) {
        HeaderLayout.push(
            <PageRow spaceBetween>
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
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        const onConfirm = () => {
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

            addBeacon(
                new Beacon(
                    generateRandomId(),
                    selectedTemplate.name,
                    beaconForm.notes || null,
                    selectedOne.id,
                    Priority.Normal,
                    executor.id,
                    selectedTemplate.type,
                    getTomorrow(),
                    beaconForm.shareOneName,
                    beaconForm.shareOwnName
                )
            );

            setMessage(null);
            setSelectedTemplateId(null);
            setActiveLayoutType(OneLayoutType.SentBeaconResponse);
        };

        HeaderLayout.push(
            <PageRow spaceBetween>
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
        HeaderLayout.push(
            <PageRow spaceBetween>
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
        const idxOfSelectedOne = ones.findIndex((one) => one.id === selectedOne?.id);
        const showArrowLeft = ones.length > 1;
        const showArrowRight = ones.length > 1;

        HeaderLayout.push(
            <PageRow spaceBetween>
                {
                    showArrowLeft && (
                        <SimpleIconButton iconSrc={AppIcon.ArrowLeft}
                            disabled={idxOfSelectedOne === 0}
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne - 1]);
                            }} />
                    )
                }

                <SimpleIconButton iconSrc={AppIcon.Plus}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AddingOne);
                    }}
                    title={'New One'} />

                {
                    selectedOne && (
                        <SimpleIconButton iconSrc={AppIcon.Pencil}
                            onClick={() => {
                                setMessage(null);
                                setActiveLayoutType(OneLayoutType.EditingOne);
                            }}
                            title={'Edit'} />
                    )
                }

                <SimpleIconButton iconSrc={AppIcon.Prayer}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AllBeaconTemplates);
                    }}
                    title={'New Beacon'} />


                {
                    showArrowRight && (
                        <SimpleIconButton iconSrc={AppIcon.ArrowRight}
                            disabled={idxOfSelectedOne === ones.length - 1}
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne + 1])
                            }} />
                    )
                }
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <ActionStepsList />
                {/* <OneFactsList /> */}
                <ActiveBeaconsActivityCard activeBeaconsWithActivities={activeBeaconsWithActivities} />
            </View>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne].includes(activeLayoutType) && selectedOne;

    return (
        <View style={styles.container}>
            {
                showYourSelectedOne && (
                    <PageRow flexStart>
                        <SimpleIcon iconSrc={selectedOne.icon} large />
                        <AnimatedHeader title={selectedOne.name}
                            style={{ alignItems: 'flex-start', marginStart: 8 }}
                            subtitle='Your One' />
                    </PageRow>
                )
            }

            {
                message && (
                    <AnimatedBanner iconSrc={AppIcon.Info} text={message} />
                )
            }


            {HeaderLayout.map((item) => item)}

            {BodyLayout.map((item) => item)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 16
    },
    activeBeaconsDiv: {

    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    return {
        selectedOne,
        shareChristPageState: state.app.shareChristPageState,
        ones: state.ones.ones,
        executor: state.users.executor,
        oneForm: state.ones.oneForm,
        beaconTemplates: state.beacons.beaconTemplates,
    };
};

const mapDispatchToProps = {
    setSelectedTemplateId,
    setShareChristPageState,
    addBeacon,
    addOne,
    editOne,
    addActionStep,
    editActionSteps,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristOnesLayout);