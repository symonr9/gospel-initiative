
import React, { useState } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setAppError } from '@/redux/actions';
import ScrollLayout from '../common/ScrollLayout';
import User from '@/models/user';
import SettingsUserPrefs from './settings/SettingsUserPrefs';
import SettingsBeaconPrefs from './settings/SettingsBeaconPrefs';

export type IProfileLayout = ViewProps & {
    executor: User,
    setAppError: Function,
};

function SettingsLayout({ executor, setAppError }: IProfileLayout) {
    const [message, setMessage] = useState<string | null>(null);

    const BodyLayout: any[] = [
        <SettingsUserPrefs/>,
        <SettingsBeaconPrefs/>
    ];

    return (
        <ScrollLayout>
            <View style={styles.container}>
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
    return {
        executor: state.users.executor,
    };
};

const mapDispatchToProps = {
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLayout);