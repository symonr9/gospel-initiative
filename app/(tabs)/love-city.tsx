
import React from 'react';
import { connect } from 'react-redux';
import PageView from '@/components/common/PageView';
import { FlatList, View, ViewProps } from 'react-native';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';

export type ILoveCity = ViewProps & {

};

function LoveCity({ }: ILoveCity) {
    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type={ThemedTextType.Title}>Love City</ThemedText>
            </ThemedView>
        </PageView>
    );
}

const mapStateToProps = (state: ILoveCity) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);