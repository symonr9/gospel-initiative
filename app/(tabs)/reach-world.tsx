import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';
import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';

export type IReachWorld = ViewProps & {

};

function ReachWorld({ }: IReachWorld) {

    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type={ThemedTextType.Title}>Reach World</ThemedText>
            </ThemedView>
        </PageView>
    );
}

const mapStateToProps = (state: IReachWorld) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorld);