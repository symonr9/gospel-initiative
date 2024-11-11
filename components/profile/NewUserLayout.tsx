
import React, { useState } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppIcon } from '@/enums/enums';
import { setAppError } from '@/redux/actions';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import User from '@/models/user';

export type INewUserLayout = ViewProps & {
    executor: User,
    setAppError: Function,
};

function NewUserLayout({ executor, setAppError }: INewUserLayout) {
    const [message, setMessage] = useState<string | null>(null);

    const BodyLayout: any[] = [];

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

export default connect(mapStateToProps, mapDispatchToProps)(NewUserLayout);