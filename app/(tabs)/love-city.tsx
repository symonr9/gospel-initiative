
import React from 'react';
import { connect } from 'react-redux';
import PageView from '@/components/common/PageView';
import { FlatList, View, ViewProps } from 'react-native';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import PageHeader from '@/components/common/PageHeader';

export type ILoveCity = ViewProps & {

};

function LoveCity({ }: ILoveCity) {
    return (
        <PageView>
            <PageHeader title={"Love City"}/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCity);