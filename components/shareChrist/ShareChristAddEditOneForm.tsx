
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, TextInput } from 'react-native';

import One from '@/models/one';
import OneForm from '@/models/oneForm';
import { setOneForm } from '@/redux/actions';
import { formStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';

export type IShareChristAddEditOneForm = ViewProps & {
    selectedOne: One;
    oneForm: OneForm;

    setOneForm: Function;
};

function ShareChristAddEditOneForm({ selectedOne, oneForm, setOneForm }: IShareChristAddEditOneForm) {    
    const editing = selectedOne !== null;

    const [formData, setFormData] = useState(new OneForm(""));

    useEffect(() => {
        setOneForm(formData);
    }, [formData]);

    const setName = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            name
        }));
    };

    const { name } = formData;

    return (
        <View style={[styles.container]}>
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
    oneForm: state.ones.oneForm
});


const mapDispatchToProps = {
    setOneForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristAddEditOneForm);