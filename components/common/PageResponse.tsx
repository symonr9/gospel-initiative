
import React, {  } from 'react';

import { connect } from 'react-redux';
import { View, ViewProps, StyleSheet } from 'react-native';

import { AppText, TextType } from './AppText';

export type IPageHeader = ViewProps & {
    title: string;
    details: string;
};

function PageResponse({ title, details }: IPageHeader) {

    return (
        <View style={[styles.container]}>
            <AppText type={TextType.Title}>
                {title}
            </AppText>
            <AppText type={TextType.Default}>
                {details}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    }
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageResponse);