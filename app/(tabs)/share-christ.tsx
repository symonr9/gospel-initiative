
import React from 'react';

import { connect } from 'react-redux';
import { ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';

import PageHeader from '@/components/common/PageHeader';
import { Page, PrayerType, ShareChristPageState } from '@/enums/enums';
import { ShareChristContainer } from '@/components/shareChrist/ShareChristContainer';
import ShareChristFooter from '@/components/shareChrist/ShareChristFooter';

export type IShareChrist = ViewProps & {
    page: Page,
    shareChristPageState: ShareChristPageState,
    error: string,
};

function ShareChrist({ page, shareChristPageState, error }: IShareChrist) {

    return (
        <PageView>
            <PageHeader title={"Share Christ"} />

            <ShareChristContainer page={page} pageState={shareChristPageState} />
            <ShareChristFooter page={page} pageState={shareChristPageState} />
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        page: state.app.page,
        shareChristPageState: state.app.shareChristPageState,
        error: state.errors.error,
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);