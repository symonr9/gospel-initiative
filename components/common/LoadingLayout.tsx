
import React from 'react';

import { ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setAppError } from '@/redux/actions';
import { PageColumn } from './PageColumn';
import { SimpleLoadingSection } from './SimpleLoadingSection';

export type ILoadingLayout = ViewProps & {

};

function LoadingLayout({ }: ILoadingLayout) {
    return (
        <PageColumn style={{ marginVertical: 32 }}>
            <SimpleLoadingSection />
        </PageColumn>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = {
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingLayout);