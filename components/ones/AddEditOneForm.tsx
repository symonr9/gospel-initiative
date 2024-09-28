
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, TextInput } from 'react-native';

import One from '@/models/one';
import OneForm from '@/models/oneForm';
import { setOneForm } from '@/redux/actions';
import { formStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { AvatarIcon, OneCategory, OneStage } from '@/enums/enums';
import { AnimatedHeader } from '../common/AnimatedHeader';
import AvatarIconPicker from '../common/AvatarIconPicker';
import StagePicker from '../common/StagePicker';
import ActionStep from '@/models/actionStep';
import CategoryPicker from '../common/CategoryPicker';

export type IAddEditOneForm = ViewProps & {
    selectedOne: One;
    initialOneForm: OneForm;
    editing?: boolean;

    setOneForm: Function;
};

function AddEditOneForm({ selectedOne, editing = false, initialOneForm, setOneForm }: IAddEditOneForm) {    
    const [formData, setFormData] = useState(initialOneForm);

    useEffect(() => {
        setOneForm(formData);
    }, [formData]);

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

    const { name, icon, stage, category, actionSteps } = formData;
    const title = editing ? 'Editing One' : 'Adding One';

    return (
        <PageColumn>
            <AnimatedHeader title={title}/>

            <PageColumn style={styles.section}>
                <AvatarIconPicker selectedIcon={icon} setSelectedIcon={setIcon}/>
            </PageColumn>

            <PageColumn style={[styles.section, styles.nameSection]}>
                <AppText type={TextType.DefaultSemiBold}>Name of your One</AppText>
                <TextInput
                    style={formStyles.textInput}
                    placeholder="Enter response here..."
                    placeholderTextColor={'gray'}
                    value={name}
                    numberOfLines={4}
                    onChangeText={(text) => setName(text)}
                />
            </PageColumn>
            
            <PageColumn style={styles.section}>
                <StagePicker selectedStage={stage} 
                             setSelectedStage={setStage}/>
            </PageColumn>

            <PageColumn style={styles.section}>
                <CategoryPicker selectedCategory={category} 
                                setSelectedCategory={setCategory}/>
            </PageColumn>
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
        marginVertical: 12
    },
    nameSection: {
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
});


const mapDispatchToProps = {
    setOneForm
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOneForm);