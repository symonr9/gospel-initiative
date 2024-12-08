import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ViewProps, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';
import One from '@/models/one';
import OneForm from '@/models/oneForm';
import { setOneForm } from '@/redux/actions';
import { formStyles, gridStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { AvatarIcon, OneCategory, OneStage, ActionStepType, AppIcon } from '@/enums/enums';
import { AnimatedHeader } from '../common/AnimatedHeader';
import AvatarIconPicker from '../common/AvatarIconPicker';
import StagePicker from '../common/StagePicker';
import ActionStep from '@/models/actionStep';
import CategoryPicker from '../common/CategoryPicker';
import { PageRow } from '../common/PageRow';
import { formatDateTime, generateActionStepsForStage, generateRandomId, getDaysDifference, getNextWeek, mapActionStepTypeToDetails, mapActionStepTypeToIcon, mapActionStepTypeToTitle } from '@/utils/appUtils';
import { MAX_SHORT_TEXT_LENGTH } from '@/constants/Constants';
import SimpleIconButton from '../common/SimpleIconButton';
import { SimpleCard } from '../common/SimpleCard';
import { clearAll } from '@/utils/storageUtils';

export type IAddEditOneForm = ViewProps & {
    initialOneForm: OneForm;
    editing?: boolean;
    onRemove?: Function;
    setOneForm: Function;
};

function AddEditOneForm({ editing = false, initialOneForm, onRemove, setOneForm }: IAddEditOneForm) {
    const [formData, setFormData] = useState(initialOneForm);
    const [suggestedActionSteps, setSuggestedActionSteps] = useState<ActionStep[]>(generateActionStepsForStage(initialOneForm.stage));
    const [selectedSteps, setSelectedSteps] = useState(suggestedActionSteps.map(() => false));
    const [targetDates, setTargetDates] = useState(suggestedActionSteps.map((step) => step.targetDate));

    useEffect(() => {
        setOneForm(formData);
    }, [formData]);

    useEffect(() => {
        const filteredActionSteps = suggestedActionSteps
            .filter((_, index) => selectedSteps[index])
            .map((step, index) => ({
                ...step,
                targetDate: targetDates[index]
            }));
        setFormData((prev) => ({
            ...prev,
            actionSteps: filteredActionSteps
        }));
    }, [selectedSteps, targetDates]);

    const onRemoveClick = () => {
        Alert.alert(
            'Are you sure?',
            'Are you sure you want to remove your one? You will lose all data related to your one.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'Yes, I am sure', onPress: confirmFinalRemove },
            ],
            { cancelable: true }
          );
    };

    const confirmFinalRemove = () => {
        Alert.alert(
          'Are you really sure?',
          'This action cannot be undone. Please confirm that you want to proceed.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Yes, delete one', onPress: async () => {
                if (onRemove) {
                    await onRemove();
                }
            }},
          ],
          { cancelable: true }
        );
      };
    

    const setName = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            name
        }));
    };

    const setIcon = (icon: AvatarIcon) => {
        setFormData((prev) => ({
            ...prev,
            icon
        }));
    };

    const setStage = (stage: OneStage) => {
        setFormData((prev) => ({
            ...prev,
            stage
        }));

        const newSteps = generateActionStepsForStage(stage);
        setSelectedSteps(newSteps.map(() => false));
        setTargetDates(newSteps.map((step) => step.targetDate));
        setSuggestedActionSteps(newSteps);
    };

    const setCategory = (category: OneCategory) => {
        setFormData((prev) => ({
            ...prev,
            category
        }));
    };

    const setActionSteps = (actionSteps: ActionStep[]) => {
        setFormData((prev) => ({
            ...prev,
            actionSteps
        }));
    };

    const updateStepSelection = (index: number, selected: boolean) => {
        setSelectedSteps((prev) => {
            const newSelectedSteps = [...prev];
            newSelectedSteps[index] = selected;
            return newSelectedSteps;
        });
    };

    const { name, icon, stage, category } = formData;
    const title = editing ? 'Editing One' : 'Adding One';

    return (
        <PageColumn>
            <AnimatedHeader title={title} />

            <PageRow spaceEvenly>
                <AvatarIconPicker selectedIcon={icon}
                    style={{ height: 180, alignItems: 'center' }}
                    setSelectedIcon={setIcon} />

                <PageColumn style={[styles.section, gridStyles.itemCard]} spaceEvenly>
                    <AppText type={TextType.DefaultSemiBold}>Name of your One</AppText>
                    <TextInput
                        style={[formStyles.textInput, { width: 150 }]}
                        placeholder={`Enter name here... (Max Chars: ${MAX_SHORT_TEXT_LENGTH})`}
                        placeholderTextColor={'gray'}
                        value={name}
                        numberOfLines={1}
                        maxLength={MAX_SHORT_TEXT_LENGTH}
                        onChangeText={(text) => setName(text)}
                    />
                </PageColumn>
            </PageRow>

            <PageRow center>
                {
                    !editing && (
                        <StagePicker selectedStage={stage}
                            style={{ height: 300, flex: 1, alignItems: 'center' }}
                            setSelectedStage={setStage} />
                    )
                }
            </PageRow>

            <PageRow center>
                <CategoryPicker selectedCategory={category}
                    style={{ height: !editing ? 300 : 290, flex: 1, alignItems: 'center' }}
                    setSelectedCategory={setCategory} />
            </PageRow>

            {
                editing && (
                    <PageRow style={{ marginTop: 12 }}>
                        <SimpleCard title={'Additional Actions'}
                            detailsView={
                                <PageRow style={{ marginTop: 12 }}>
                                    <SimpleIconButton iconSrc={AppIcon.Trash}
                                        onClick={onRemoveClick}
                                        title={'Remove your One'} />
                                </PageRow>
                            } />
                    </PageRow>
                )
            }

            {
                !editing && (
                    <PageColumn style={styles.section}>
                        {
                            suggestedActionSteps.length > 0 && (
                                <PageColumn style={{ marginBottom: 8, alignItems: 'center' }}>
                                    <AppText type={TextType.Subtitle3}>Suggested Action Steps</AppText>
                                    <AppText type={TextType.Default} style={{ textAlign: 'center' }}>Select which action steps you would like to start with for your One. You can always add and update action steps after creating your One.</AppText>
                                </PageColumn>
                            )
                        }
                        <FlatList
                            data={suggestedActionSteps}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <PageRow style={[gridStyles.itemCard, selectedSteps[index] && gridStyles.selected]}>
                                    <PageColumn style={{ alignSelf: 'center', alignItems: 'center' }}>
                                        <Checkbox
                                            style={[formStyles.checkbox, { width: 20, height: 20, marginBottom: 12, marginStart: 8 }]}
                                            value={selectedSteps[index]}
                                            onValueChange={(value) => updateStepSelection(index, value)}
                                        />
                                        <Image source={mapActionStepTypeToIcon(item.type)}
                                            style={[styles.icon, {}]} />
                                    </PageColumn>

                                    <PageColumn style={{ marginStart: 8, width: 280 }}>
                                        <AppText type={TextType.Subtitle3}>{mapActionStepTypeToTitle(item.type)}</AppText>
                                        <AppText type={TextType.Body}>{mapActionStepTypeToDetails(item.type)}</AppText>

                                        {
                                            targetDates[index] && (
                                                <>
                                                    <AppText type={TextType.DefaultSemiBold}>
                                                        Goal: Complete in {getDaysDifference(new Date(), targetDates[index])} days
                                                    </AppText>
                                                    <AppText type={TextType.Body}>
                                                        {formatDateTime(targetDates[index])}
                                                    </AppText>
                                                </>
                                            )
                                        }

                                        {
                                            selectedSteps[index] && (
                                                <AppText type={TextType.Italic}>
                                                    Keeping
                                                </AppText>
                                            )
                                        }
                                    </PageColumn>
                                </PageRow>
                            )}
                        />
                    </PageColumn>
                )
            }
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 4,
        elevation: 4,
        gap: 16
    },
    section: {
        marginVertical: 12,
        alignItems: 'center',
    },
    icon: {
        width: 28,
        height: 28,
        margin: 2,
        verticalAlign: 'middle',
    },
});

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
    setOneForm
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOneForm);
