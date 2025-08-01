import DetailsSection from '@/components/common/DetailsSection';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import { SimpleGridCard } from '@/components/common/SimpleGridCard';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon, GospelChecklistItem } from '@/enums/enums';
import One from '@/models/one';
import User from '@/models/user';
import { getAppTimeAgoText, calculatePercent, isGospelStepCompleted, calculatePercentByTotals, isChristianStage } from '@/utils/appUtils';
import { mapActionStepTypeToTitle } from "@/utils/textUtils";
import { mapActionStepTypeToIcon } from "@/utils/iconUtils";
import React, { useState } from 'react';
import { View, ViewProps } from "react-native";
import ActionStepPicker from '../ActionStepPicker';
import BeaconPicker from '../BeaconPicker';
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
    styles: any,
    activeOnesLayoutNormalBodyType: OnesLayoutNormalBodyType,
    setActiveOnesLayoutNormalBodyType: Function
};

export enum OnesLayoutNormalBodyType {
    Base,
    Info,
    ActionStep,
    GospelSteps,
    Beacons,
};

export function OnesLayoutNormal({ ones, selectedOne, selectedOneId, setAppError, executor,
    refreshData, setMessage, setOneForm, revertToInitialLayoutType, styles, oneBeacons, setActiveLayoutType, setSelectedOneId,
    setActiveOnesLayoutNormalBodyType, activeOnesLayoutNormalBodyType }: IOnesLayoutNormal) {
        
    const actionSteps = selectedOne?.actionSteps || [];
    const firstActionStep = actionSteps?.length > 0 ? actionSteps.find((value) => !value.isComplete) : null;
    const oneNotes = selectedOne?.oneNotes || [];

    const BodyLayout: any[] = [];

    if (!selectedOne) {
        return <></>;
    }

    const BodyBackHeader = (
        <PageRow spaceBetween style={{ marginVertical: 10, marginHorizontal: 16 }}>
            <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                title={'Back'}
                onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Base)} />
            {
                activeOnesLayoutNormalBodyType === OnesLayoutNormalBodyType.Info && (
                    <InfoPickerFilter />
                )
            }
        </PageRow>
    );

    if (activeOnesLayoutNormalBodyType === OnesLayoutNormalBodyType.Info) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <InfoPicker setActiveLayoutType={setActiveLayoutType} />
            </PageColumn>
        );
    } else if (activeOnesLayoutNormalBodyType === OnesLayoutNormalBodyType.ActionStep) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <ActionStepPicker />
            </PageColumn>
        );
    } else if (activeOnesLayoutNormalBodyType === OnesLayoutNormalBodyType.GospelSteps) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <GospelStepPicker />
            </PageColumn>
        );
    } else if (activeOnesLayoutNormalBodyType === OnesLayoutNormalBodyType.Beacons) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <BeaconPicker />
            </PageColumn>
        );
    } else { // Base
        const infoDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.Note}
                    prefix={"Notes Taken"}
                    onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Info)}
                    title={`${oneNotes.length} Notes`} />
            </>
        );

        let actionStepsDetailView = <></>;
        if (firstActionStep) {
            actionStepsDetailView = (
                <PageColumn>
                    <DetailsSection iconSrc={mapActionStepTypeToIcon(firstActionStep.type)}
                        prefix={getAppTimeAgoText(firstActionStep.targetDate)}
                        onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.ActionStep)}
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
                <DetailsSection iconSrc={AppIcon.ScriptureOpen}
                    prefix={"Gospel Shared"}
                    onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.GospelSteps)}
                    title={`${Math.ceil(completedPercentage * 100)}% shared`} />
            </>
        );

        const beaconsDetailText = oneBeacons.length === 1 ? 'Active Beacon' : 'Active Beacons';
        const beaconsDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.Star}
                    prefix={beaconsDetailText}
                    onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Beacons)}
                    title={`${oneBeacons.length} Active`} />
            </>
        );

        const showGospelSteps = isChristianStage(selectedOne?.stage);

        BodyLayout.push(
            <>
                <PageColumn>
                    <SimpleGridCard iconSrc={AppIcon.Note}
                        title={'Info'}
                        detailsView={infoDetailView}
                        horizontal={false}
                        useTextTintForIcon={false}
                        onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Info)} />

                    <SimpleGridCard iconSrc={AppIcon.Checkmark}
                        title={'Action Steps'}
                        detailsView={actionStepsDetailView}
                        horizontal={false}
                        useTextTintForIcon={false}
                        onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.ActionStep)} />

                    {/* NOTE: Gospel Steps are currently omitted but may be added in future versions */}
                    {/* {
                        showGospelSteps && (
                            <SimpleGridCard iconSrc={AppIcon.ScriptureOpen}
                                title={'Gospel Steps'}
                                detailsView={gospelChecklistDetailView}
                                horizontal={false}
                                useTextTintForIcon={false}
                                onClick={() => setBodyType(BodyType.GospelSteps)} />
                        )
                    } */}

                    <SimpleGridCard iconSrc={AppIcon.Prayer}
                        title={'Prayer Beacons'}
                        detailsView={beaconsDetailView}
                        horizontal={false}
                        onClick={() => setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Beacons)} />
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