
import React from 'react';

import { connect } from 'react-redux';
import { ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';

import { Page, ShareChristPageState } from '@/enums/enums';
import ShareChristFooter from '@/components/shareChrist/ShareChristFooter';
import ShareChristContainer from '@/components/shareChrist/ShareChristContainer';

export type IShareChrist = ViewProps & {
    error: string,
};

function ShareChrist({ error }: IShareChrist) {

    return (
        <PageView>
            <ShareChristContainer/>
            <ShareChristFooter />
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);