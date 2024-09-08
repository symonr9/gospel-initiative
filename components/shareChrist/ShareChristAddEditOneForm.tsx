
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, TextInput } from 'react-native';

import One from '@/models/one';
import OneForm from '@/models/oneForm';
import { setOneForm } from '@/redux/actions';
import { formStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { AvatarIcon } from '@/enums/enums';
import { AnimatedHeader } from '../common/AnimatedHeader';
import AvatarIconPicker from '../common/AvatarIconPicker';

export type IShareChristAddEditOneForm = ViewProps & {
    selectedOne: One;
    initialOneForm: OneForm;
    editing?: boolean;

    setOneForm: Function;
};

function ShareChristAddEditOneForm({ selectedOne, editing = false, initialOneForm, setOneForm }: IShareChristAddEditOneForm) {    
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

    const { name, icon } = formData;
    const title = editing ? 'Editing One' : 'Adding One';

    return (
        <View style={[styles.container]}>
            <AnimatedHeader title={title}/>

            <PageColumn style={styles.section}>
                <AvatarIconPicker selectedIcon={icon} setSelectedIcon={setIcon}/>
            </PageColumn>

            <PageColumn style={styles.section}>
                <AppText type={TextType.Default}>Name of your One</AppText>
                <TextInput
                    style={formStyles.textInput}
                    placeholder="Enter name here..."
                    placeholderTextColor={'gray'}
                    value={name}
                    numberOfLines={1}
                    onChangeText={(text) => setName(text)}
                />
            </PageColumn>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 4,
        elevation: 4,
    },
    section: {
        marginBottom: 8,
        marginStart: 12,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
});


const mapDispatchToProps = {
    setOneForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristAddEditOneForm);