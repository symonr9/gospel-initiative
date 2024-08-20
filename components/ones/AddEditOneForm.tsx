
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IAddEditOneForm = ViewProps & {
    one: One;
};

function AddEditOneForm({ style, one, ...otherProps }: IAddEditOneForm) {
    const backgroundColor = useBackgroundThemeColor();

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>

        </View>
    );
}

const mapStateToProps = (state: IAddEditOneForm) => ({
    one: state.one,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOneForm);