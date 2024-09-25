import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Animated, StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, Priority, RoadContainerType } from '@/enums/enums';
import { BeaconCard } from './BeaconCard';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { selectActiveBeaconsWithActivities, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import { setSelectedTemplateId, addBeacon } from '@/redux/actions';
import { generateRandomId, getTomorrow, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import PageResponse from '../common/PageResponse';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import BeaconTemplatesList from './BeaconTemplatesList';
import { ActiveBeaconsActivityList } from './ActiveBeaconsActivityList';
import { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { AnimatedBanner } from '../common/AnimatedBanner';
import DetailsSection from '../common/DetailsSection';
import { PageColumn } from '../common/PageColumn';
import { SimpleIcon } from '../common/SimpleIcon';
import AllOnesGrid from '../ones/AllOnesGrid';
import { OneLayoutType } from '../ones/OnesLayout';

export type IMyBeaconsLayout = ViewProps & {
    ones: One[],
    executor: User,
    beaconTemplates: BeaconTemplate[],
    beaconForm: BeaconForm,
    selectedTemplateId: String,
    setSelectedTemplateId: Function,
    addBeacon: Function,
};

function MyBeaconsLayout({ ones, executor, beaconTemplates, beaconForm,
    selectedTemplateId, setSelectedTemplateId, addBeacon }: IMyBeaconsLayout) {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    const [selectedOneId, setSelectedOneId] = useState<string | null>(ones.length > 0 ? ones[0].id : null);

    const selectedOne = ones.find((one) => one.id === selectedOneId);

    const activeBeaconsWithActivities = useSelector(selectActiveBeaconsWithActivities(selectedOne?.id));
    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));
    
    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    if (activeLayoutType === OneLayoutType.AllOnes) {
        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <AllOnesGrid setActiveLayoutType={setActiveLayoutType} setSelectedOneId={setSelectedOneId} />
        );
    } else if (activeLayoutType === OneLayoutType.AllBeaconTemplates) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
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
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
            );
        }

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
                    beaconForm.shareOwnName
                )
            );

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
                    title={'Something went wrong'}/>
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
        const idxOfSelectedOne = ones.findIndex((one) => one.id === selectedOne?.id);
        const showArrowLeft = ones.length > 1;
        const showArrowRight = ones.length > 1;

        HeaderLayout.push(
            <PageRow spaceEvenly>
                {
                    showArrowLeft && (
                        <SimpleIconButton iconSrc={AppIcon.ChevronLeft}
                            disabled={idxOfSelectedOne === 0}
                            title={'Back'}
                            small
                            onClick={() => {
                                setMessage(null);
                                setSelectedOneId(ones[idxOfSelectedOne - 1].id);
                            }} />
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
                        <SimpleIconButton iconSrc={AppIcon.ChevronRight}
                            disabled={idxOfSelectedOne === ones.length - 1}
                            title={'Next'}
                            small
                            onClick={() => {
                                setMessage(null);                                
                                setSelectedOneId(ones[idxOfSelectedOne + 1].id)
                            }} />
                    )
                }
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <ActiveBeaconsActivityList activeBeaconsWithActivities={activeBeaconsWithActivities} />
            </View>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow spaceBetween>
                                <PageRow>
                                    <SimpleIcon iconSrc={selectedOne.icon} large />
                                    <AnimatedHeader title={selectedOne.name}
                                        style={{ alignItems: 'flex-start', marginStart: 8 }}
                                        subtitle='Your One' />
                                </PageRow>
                                {
                                    activeLayoutType === OneLayoutType.Normal && (
                                        <PageRow style={{ marginEnd: 12 }}>
                                            {
                                                ones.length > 0 && (
                                                    <SimpleIconButton iconSrc={AppIcon.UserGroup}
                                                    small
                                                    title={'All'}
                                                    customStyles={{ container: { marginStart: 16 } }}
                                                    onClick={() => setActiveLayoutType(OneLayoutType.AllOnes)} />
                                                )
                                            }
                                        </PageRow>
                                    )
                                }
                            </PageRow>
                        )
                    }

                    <PageRow style={styles.headerRow}>
                        <Animated.View entering={FadeInDown.duration(200).delay(50)}
                            style={{ width: '100%' }}
                            exiting={FadeOutDown.duration(200)}>
                            {HeaderLayout.map((item) => item)}
                        </Animated.View>
                    </PageRow>
                </PageColumn>

                {
                    message && (
                        <AnimatedBanner iconSrc={AppIcon.Info} text={message} onClick={() => setMessage(null)} />
                    )
                }

                {BodyLayout.map((item) => item)}
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        padding: 8,
    },
    headerRow: {
        height: 70,
        marginBottom: 12
    },
});

const mapStateToProps = (state: any) => {
    const { completedBeacons = [], incomingBeacons = [] } = selectPartitionedActiveEnhancedBeacons(state);
    return {
        ones: state.ones.ones,
        executor: state.users.executor,
        beaconForm: state.beacons.beaconForm,
        selectedTemplateId: state.beacons.selectedTemplateId,
        beaconTemplates: state.beacons.beaconTemplates,
        completedBeacons,
        incomingBeacons,
    };
}

const mapDispatchToProps = {
    setSelectedTemplateId,
    addBeacon,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBeaconsLayout);