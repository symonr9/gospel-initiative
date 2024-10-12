
import React, {  } from 'react';

import { connect } from 'react-redux';
import { View, ViewProps, StyleSheet, Dimensions } from 'react-native';

import { useBackgroundThemeColor } from '@/constants/Colors';
import { AppText, TextType } from './AppText';

export type IPageHeader = ViewProps & {
    title: string
};

function PageHeader({ style, title }: IPageHeader) {
    const backgroundColor = useBackgroundThemeColor();

    return (
        <View style={[{ backgroundColor }, styles.container]}>
            <AppText type={TextType.Title}>
                {title}
            </AppText>
        </View>
    );
}

const { height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: viewportHeight * 0.05,
        paddingTop: 4,
        paddingStart: 4,
    }
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);