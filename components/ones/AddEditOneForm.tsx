
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';

export type IAddEditOneForm = ViewProps & {
    one: One;
};

function AddEditOneForm({ style, one, ...otherProps }: IAddEditOneForm) {

    return (
        <View style={[styles.container, style]} {...otherProps}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    } 
});

const mapStateToProps = (state: any) => ({
    one: state.ones.one,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOneForm);