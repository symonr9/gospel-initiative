
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Prayer from '@/models/prayer';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IAddEditPrayerForm = ViewProps & {
    prayer: Prayer;
};

function AddEditPrayerForm({ style, prayer }: IAddEditPrayerForm) {
    const backgroundColor = useBackgroundThemeColor();

    return (
        <View style={[{ backgroundColor }, style]}>

        </View>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPrayerForm);