
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import One from '@/models/one';
import { AppIcon, Priority } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import { addActionStep, addBeacon, addOne, editOne, setOneForm, setSelectedOne, setSelectedTemplateId, editActionSteps } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import User from '@/models/user';
import { generateRandomId, getNow, getTomorrow, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import AddEditOneForm from './AddEditOneForm';
import OneForm from '@/models/oneForm';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import AllOnesGrid from './AllOnesGrid';

export type IOnesOverviewLayout = ViewProps & {
    selectedOne: One | undefined,
    ones: One[],
    executor: User,
    oneForm: OneForm,
    addOne: Function,
    setSelectedOne: Function
};

export enum OneLayoutType {
    Normal,
    FirstTime,
    AllOnes,
    AddingOne,
}

function OnesOverviewLayout({ selectedOne, ones, oneForm, executor,
    addOne, setSelectedOne }: IOnesOverviewLayout) {
    const actionsStepsForSelectedOne = useSelector((state: any) => selectActionStepsByOneId(state, selectedOne?.id));

    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        setActiveLayoutType(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    }, [executor]);

    if (activeLayoutType === OneLayoutType.FirstTime) {
        HeaderLayout.push(
            <PageRow spaceEvenly>
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

            const newOne = new One(
                newOneId,
                oneForm.name,
                oneForm.icon,
                oneForm.stage,
                oneForm.category,
                getNow(),
                [],
                false,
                executor.id
            );

            addOne(newOne);

            for (let actionStep of oneForm.actionSteps) {
                actionStep.oneId = newOneId;
                addActionStep(actionStep);
            }

            setSelectedOne(newOne);
            setOneForm(OneForm.createDefault());
            setMessage("Your One has been successfully created!");
            setActiveLayoutType(OneLayoutType.Normal);
        };

        HeaderLayout.push(
            <PageRow spaceEvenly>
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
            <AddEditOneForm initialOneForm={OneForm.createDefault()} />
        );
    } else if (activeLayoutType === OneLayoutType.AllOnes) {
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
            <AllOnesGrid setActiveLayoutType={setActiveLayoutType} changeTab/>
        );
    } else { // Normal

        HeaderLayout.push(
            <PageRow spaceEvenly>
            </PageRow>
        );

        BodyLayout.push(
            <View>
            </View>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow>
                                {
                                    activeLayoutType === OneLayoutType.Normal && (
                                        <>
                                            <SimpleIconButton iconSrc={AppIcon.Plus}
                                                                onClick={() => {
                                                                    setMessage(null);
                                                                    setActiveLayoutType(OneLayoutType.AddingOne);
                                                                }}
                                                                title={'New One'} />

                                            {
                                                ones.length > 0 && (
                                                    <SimpleIconButton iconSrc={AppIcon.UserGroup}
                                                    title={'All'}
                                                    customStyles={{ container: { marginStart: 16 } }}
                                                    onClick={() => setActiveLayoutType(OneLayoutType.AllOnes)} />
                                                )
                                            }
                                        </>
                                    )
                                }
                            </PageRow>
                        )
                    }

                    <PageRow style={styles.headerRow}>
                        {
                            (activeLayoutType !== OneLayoutType.Normal) && (
                                <Animated.View entering={FadeInDown.duration(200).delay(50)}
                                    style={{ width: '100%' }}
                                    exiting={FadeOutDown.duration(200)}>
                                    {HeaderLayout.map((item) => item)}
                                </Animated.View>
                            )
                        }
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
        padding: 8
    },
    headerRow: {
        height: 70,
        marginBottom: 4
    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    return {
        selectedOne,
        ones: state.ones.ones,
        executor: state.users.executor,
        oneForm: state.ones.oneForm,
    };
};

const mapDispatchToProps = {
    addOne,
    editOne,
    addActionStep,
    editActionSteps,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(OnesOverviewLayout);