import DetailsSection from '@/components/common/DetailsSection';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import { SimpleGridCard } from '@/components/common/SimpleGridCard';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon, GospelChecklistItem } from '@/enums/enums';
import One from '@/models/one';
import User from '@/models/user';
import { getAppTimeAgoText, calculatePercent, isGospelStepCompleted, calculatePercentByTotals } from '@/utils/appUtils';
import { mapActionStepTypeToTitle } from "@/utils/textUtils";
import { mapActionStepTypeToIcon } from "@/utils/iconUtils";
import React, { useState } from 'react';
import { View, ViewProps } from "react-native";
import ActionStepPicker from '../ActionStepPicker';
import BeaconPicker from '../BeaconPicker';
import ChristianPicker from '../ChristianPicker';
import InfoPicker from '../InfoPicker';
import { OneLayoutType } from '../OnesLayout';
import Beacon from '@/models/beacon';
import GospelStepPicker, { coreGospelMessageSection, getThreshold } from '../GospelStepPicker';
import InfoPickerFilter from '../InfoPickerFilter';

const gospelChecklistItems = Object.keys(GospelChecklistItem)
    .filter(key => isNaN(Number(key)))
    .map((item) => ({ value: GospelChecklistItem[item as keyof typeof GospelChecklistItem] }));

type IOnesLayoutNormal = ViewProps & {
    selectedOneId: string | null,
    selectedOne: One | null | undefined,
    ones: One[],
    oneBeacons: Beacon[],
    setAppError: Function,
    executor: User,
    refreshData: Function,
    setMessage: Function,
    setOneForm: Function,
    setSelectedOneId: Function,
    setActiveLayoutType: Function,
    revertToInitialLayoutType: Function,
    styles: any
};

enum BodyType {
    Base,
    Info,
    ActionStep,
    GospelSteps,
    Beacons,
    Christians,
};

export function OnesLayoutNormal({ ones, selectedOne, selectedOneId, setAppError, executor,
    refreshData, setMessage, setOneForm, revertToInitialLayoutType, styles, oneBeacons, setActiveLayoutType, setSelectedOneId }: IOnesLayoutNormal) {
    const [bodyType, setBodyType] = useState(BodyType.Base);

    const actionSteps = selectedOne?.actionSteps || [];
    const firstActionStep = actionSteps?.length > 0 ? actionSteps.find((value) => !value.isComplete) : null;
    const christians = selectedOne?.christians || [];
    const oneNotes = selectedOne?.oneNotes || [];

    const BodyLayout: any[] = [];

    if (!selectedOne) {
        return <></>;
    }

    const BodyBackHeader = (
        <PageRow spaceBetween style={{ marginVertical: 10, marginHorizontal: 16 }}>
            <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                title={'Back'}
                onClick={() => setBodyType(BodyType.Base)} />
                {
                    bodyType === BodyType.Info && (
                        <InfoPickerFilter/>
                    )
                }
        </PageRow>
    );

    if (bodyType === BodyType.Info) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <InfoPicker setActiveLayoutType={setActiveLayoutType} />
            </PageColumn>
        );
    } else if (bodyType === BodyType.ActionStep) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <ActionStepPicker />
            </PageColumn>
        );
    } else if (bodyType === BodyType.GospelSteps) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <GospelStepPicker/>
            </PageColumn>
        );
    } else if (bodyType === BodyType.Beacons) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <BeaconPicker />
            </PageColumn>
        );
    } else if (bodyType === BodyType.Christians) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <ChristianPicker />
            </PageColumn>
        )
    } else { // Base
        const infoDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.Book2}
                    prefix={"Notes Taken"}
                    onClick={() => setBodyType(BodyType.Info)}
                    title={`${oneNotes.length} Notes`} />
            </>
        );

        let actionStepsDetailView = <></>;
        if (firstActionStep) {
            actionStepsDetailView = (
                <PageColumn>
                    <DetailsSection iconSrc={mapActionStepTypeToIcon(firstActionStep.type)}
                        prefix={getAppTimeAgoText(firstActionStep.targetDate)}
                        onClick={() => setBodyType(BodyType.ActionStep)}
                        title={mapActionStepTypeToTitle(firstActionStep.type)} />
                </PageColumn>
            );
        } else {
            actionStepsDetailView = (<View />);
        }

        const gospelSteps = selectedOne ? selectedOne.gospelSteps : []; // Set removes dupes.
        const completedGospelSharing = gospelSteps.filter((step) => coreGospelMessageSection.includes(step.type)).reduce((sum, item) => sum + item.rating, 0);
        const completedPercentage = calculatePercentByTotals(completedGospelSharing, coreGospelMessageSection.length * 5);
        
        const gospelChecklistDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.PlantGrow}
                    prefix={"Gospel Shared"}
                    onClick={() => setBodyType(BodyType.GospelSteps)}
                    title={`${Math.ceil(completedPercentage * 100)}% shared`} />
            </>
        );

        const beaconsDetailText = oneBeacons.length === 1 ? 'Active Beacon' : 'Active Beacons';
        const beaconsDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.Star}
                    prefix={beaconsDetailText}
                    onClick={() => setBodyType(BodyType.Beacons)}
                    title={`${oneBeacons.length} Active`} />
            </>
        );

        const christianDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.User}
                    prefix={"Christians"}
                    onClick={() => setBodyType(BodyType.Christians)}
                    title={`${christians.length} In Their Life`} />
            </>
        );

        BodyLayout.push(
            <>
                <PageColumn>
                    <SimpleGridCard iconSrc={AppIcon.Book2}
                        title={'Info'}
                        detailsView={infoDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.Info)} />

                    <SimpleGridCard iconSrc={AppIcon.Coffee}
                        title={'Action Steps'}
                        detailsView={actionStepsDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.ActionStep)} />

                    <SimpleGridCard iconSrc={AppIcon.PlantGrow}
                        title={'Gospel Steps'}
                        detailsView={gospelChecklistDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.GospelSteps)} />

                    <SimpleGridCard iconSrc={AppIcon.Prayer}
                        title={'Prayer Beacons'}
                        detailsView={beaconsDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.Beacons)} />

                    <SimpleGridCard iconSrc={AppIcon.UserGroup}
                        title={'Christians'}
                        detailsView={christianDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.Christians)} />
                </PageColumn>

                <PageRow spaceEvenly style={{ marginTop: 24 }}>
                    <SimpleIconButton iconSrc={AppIcon.Plus}
                        small
                        onClick={() => {
                            setMessage(null);
                            setActiveLayoutType(OneLayoutType.AddingOne);
                        }}
                        title={'Add New'} />

                    {
                        ones.length > 1 && (
                            <SimpleIconButton iconSrc={AppIcon.UserGroup}
                                title={'All'}
                                small
                                onClick={() => setActiveLayoutType(OneLayoutType.AllOnes)} />
                        )
                    }
                </PageRow>
            </>
        );
    }

    return (
        <PageColumn>
            {BodyLayout.map((item) => item)}
        </PageColumn>
    )

}