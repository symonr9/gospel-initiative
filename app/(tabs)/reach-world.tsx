import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';
import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import PageHeader from '@/components/common/PageHeader';

export type IReachWorld = ViewProps & {

};

function ReachWorld({ }: IReachWorld) {

    return (
        <PageView>
            <PageHeader title={"Reach the World"}/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorld);