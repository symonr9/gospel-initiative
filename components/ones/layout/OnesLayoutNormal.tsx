import DetailsSection from '@/components/common/DetailsSection';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import { SimpleGridCard } from '@/components/common/SimpleGridCard';
import SimpleIconButton from '@/components/common/SimpleIconButton';
import { AppIcon, GospelChecklistItem } from '@/enums/enums';
import One from '@/models/one';
import User from '@/models/user';
import { mapActionStepTypeToIcon, getAppTimeAgoText, mapActionStepTypeToTitle, calculatePercent, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText, getDaysDifference } from '@/utils/appUtils';
import React, { useState, useEffect } from 'react';
import { View, ViewProps } from "react-native";
import ActionStepPicker from '../ActionStepPicker';
import BeaconPicker from '../BeaconPicker';
import ChristianPicker from '../ChristianPicker';
import GospelChecklist from '../GospelChecklist';
import InfoPicker from '../InfoPicker';
import { OneLayoutType } from '../OnesLayout';
import Beacon from '@/models/beacon';
import { Colors } from '@/constants/Colors';
import { SimpleIcon } from '@/components/common/SimpleIcon';
import { AppText } from '@/components/common/AppText';

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
    GospelChecklist,
    Beacons,
    Christians,
};

export function OnesLayoutNormal({ ones, selectedOne, selectedOneId, setAppError, executor,
    refreshData, setMessage, setOneForm, revertToInitialLayoutType, styles, oneBeacons, setActiveLayoutType, setSelectedOneId }: IOnesLayoutNormal) {
    const [bodyType, setBodyType] = useState(BodyType.Base);

    const idxOfSelectedOne = ones.findIndex((one) => one.id === selectedOneId);
    const showArrowLeft = ones.length > 1;
    const showArrowRight = ones.length > 1;

    const actionSteps = selectedOne?.actionSteps || [];
    const firstActionStep = actionSteps?.length > 0 ? actionSteps[0] : null;
    const christians = selectedOne?.christians || [];
    const oneNotes = selectedOne?.oneNotes || [];

    const BodyLayout: any[] = [];

    if (!selectedOne) {
        return <></>;
    }

    const BodyBackHeader = (
        <PageRow style={{ marginVertical: 8, marginHorizontal: 4 }}>
            <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                title={'Back'}
                onClick={() => setBodyType(BodyType.Base)} />
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
    } else if (bodyType === BodyType.GospelChecklist) {
        BodyLayout.push(
            <PageColumn>
                {BodyBackHeader}
                <GospelChecklist />
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

        const selectedOneItems = selectedOne ? Array.from(new Set(selectedOne.gospelChecklist)) : []; // Set removes dupes.
        const completedPercentage = calculatePercent(selectedOneItems, gospelChecklistItems.map((item) => item.value));
        const gospelChecklistDetailView = (
            <>
                <DetailsSection iconSrc={AppIcon.Book}
                    prefix={"Gospel Shared"}
                    onClick={() => setBodyType(BodyType.GospelChecklist)}
                    title={`${completedPercentage}% shared`} />
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
                    onClick={() => setBodyType(BodyType.Info)}
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

                    <SimpleGridCard iconSrc={AppIcon.LightBulb}
                        title={'Action Steps'}
                        detailsView={actionStepsDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.ActionStep)} />

                    <SimpleGridCard iconSrc={AppIcon.Book}
                        title={'Gospel Checklist'}
                        detailsView={gospelChecklistDetailView}
                        horizontal={false}
                        onClick={() => setBodyType(BodyType.GospelChecklist)} />

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

                    {
                        showArrowLeft && (
                            <SimpleIconButton iconSrc={AppIcon.ChevronLeft}
                                disabled={idxOfSelectedOne === 0}
                                title={'Back'}
                                small
                                onClick={() => {
                                    setMessage(null);
                                    const previousOne = ones[idxOfSelectedOne - 1] || null;
                                    if (previousOne) {
                                        setSelectedOneId(previousOne.id);
                                    }
                                }} />
                        )
                    }

                    {
                        showArrowRight && (
                            <SimpleIconButton iconSrc={AppIcon.ChevronRight}
                                disabled={idxOfSelectedOne === ones.length - 1}
                                title={'Next'}
                                small
                                onClick={() => {
                                    setMessage(null);
                                    const nextOne = ones[idxOfSelectedOne + 1] || null;
                                    if (nextOne) {
                                        setSelectedOneId(nextOne.id);
                                    }
                                }} />
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