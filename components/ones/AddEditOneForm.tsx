import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ViewProps, StyleSheet, TextInput, FlatList } from 'react-native';
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';
import One from '@/models/one';
import OneForm from '@/models/oneForm';
import { setOneForm } from '@/redux/actions';
import { formStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { AvatarIcon, OneCategory, OneStage, ActionStepType } from '@/enums/enums';
import { AnimatedHeader } from '../common/AnimatedHeader';
import AvatarIconPicker from '../common/AvatarIconPicker';
import StagePicker from '../common/StagePicker';
import ActionStep from '@/models/actionStep';
import CategoryPicker from '../common/CategoryPicker';
import { PageRow } from '../common/PageRow';
import { formatDateTime, generateActionStepsForStage, generateRandomId, getDaysDifference, getNextWeek, mapActionStepTypeToDetails, mapActionStepTypeToIcon, mapActionStepTypeToTitle } from '@/utils/appUtils';

export type IAddEditOneForm = ViewProps & {
    selectedOneId: string | null;
    initialOneForm: OneForm;
    editing?: boolean;

    setOneForm: Function;
};

function AddEditOneForm({ selectedOneId, editing = false, initialOneForm, setOneForm }: IAddEditOneForm) {
    const [formData, setFormData] = useState(initialOneForm);
    const [suggestedActionSteps, setSuggestedActionSteps] = useState<ActionStep[]>(generateActionStepsForStage(initialOneForm.stage, selectedOneId));
    const [selectedSteps, setSelectedSteps] = useState(suggestedActionSteps.map(() => true));
    const [targetDates, setTargetDates] = useState(suggestedActionSteps.map((step) => step.targetDate));

    if (!selectedOneId) {
        return <></>;
    }

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

        const newSteps = generateActionStepsForStage(stage, selectedOneId);
        setSelectedSteps(newSteps.map(() => true));
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
                <PageColumn style={styles.section}>
                    <AvatarIconPicker selectedIcon={icon} setSelectedIcon={setIcon} />
                </PageColumn>

                <PageColumn style={[styles.section, styles.nameSection]} spaceEvenly>
                    <AppText type={TextType.DefaultSemiBold}>Name of your One</AppText>
                    <TextInput
                        style={formStyles.textInput}
                        placeholder="Enter name here..."
                        placeholderTextColor={'gray'}
                        value={name}
                        numberOfLines={1}
                        onChangeText={(text) => setName(text)}
                    />
                </PageColumn>
            </PageRow>

            <PageRow spaceEvenly>
                <PageColumn style={styles.section}>
                    <StagePicker selectedStage={stage} setSelectedStage={setStage} />
                </PageColumn>

                <PageColumn style={styles.section}>
                    <CategoryPicker selectedCategory={category} setSelectedCategory={setCategory} />
                </PageColumn>
            </PageRow>

            {
                !editing && (
                    <PageColumn style={styles.section}>
                        {
                            suggestedActionSteps.length > 0 && (
                                <>
                                    <AppText type={TextType.DefaultSemiBold}>Suggested Action Steps</AppText>
                                    <AppText type={TextType.Default} style={{ textAlign: 'center' }}>Select which action steps you would like to start with for your One. You can always add and update action steps after creating your One.</AppText>
                                </>
                            )
                        }
                        <FlatList
                            data={suggestedActionSteps}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <PageRow style={[styles.iconCard, selectedSteps[index] && styles.selectedIconCard]}>
                                    <PageColumn style={{ alignSelf: 'center', alignItems: 'center' }}>
                                        <Checkbox
                                            style={[formStyles.checkbox, { width: 20, height: 20, marginBottom: 12, marginStart: 8 }]}
                                            value={selectedSteps[index]}
                                            onValueChange={(value) => updateStepSelection(index, value)}
                                        />
                                        <Image source={mapActionStepTypeToIcon(item.type)}
                                            style={[styles.icon, {}]} />
                                    </PageColumn>

                                    <PageColumn style={{ marginStart: 8, width: 300 }}>
                                        <AppText type={TextType.Subtitle3}>{mapActionStepTypeToTitle(item.type)}</AppText>
                                        <AppText type={TextType.Default}>{mapActionStepTypeToDetails(item.type)}</AppText>

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
        alignItems: 'center'
    },
    nameSection: {
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4,
        borderRadius: 8,
    },
    iconCard: {
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 4,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        opacity: 0.7,
        marginHorizontal: 10
    },
    selectedIconCard: {
        backgroundColor: '#bbeccc',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        opacity: 1
    },
    icon: {
        width: 28,
        height: 28,
        margin: 2,
        verticalAlign: 'middle',
    },
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
});

const mapDispatchToProps = {
    setOneForm
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOneForm);
