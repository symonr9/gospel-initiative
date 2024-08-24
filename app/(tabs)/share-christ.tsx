
import React from 'react';

import { connect } from 'react-redux';
import { ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import NavigateToPrayersCard from '@/components/prayers/NavigateToPrayersCard';
import NavigateToOnesCard from '@/components/ones/NavigateToOnesCard';
import { PageContainer } from '@/components/common/PageContainer';
import { Page, PrayerType } from '@/enums/enums';
import { ShareChristFooter } from '@/components/shareChrist/ShareChristFooter';
import { ShareChristContainer } from '@/components/shareChrist/ShareChristContainer';

export type IShareChrist = ViewProps & {
    page: Page,
    error: string,
};

function ShareChrist({ page, error }: IShareChrist) {

    return (
        <PageView>
            <PageHeader title={"Share Christ"} />

            {getPageContainer(page)}
            <ShareChristFooter page={page}/>
        </PageView>
    );
}

const getPageContainer = (page: Page): any => {
    if (page == Page.OnesList) {
        return (
            <PageContainer>
                <PageHeader title={"ONES"} />
            </PageContainer>
        );
    } else if (page == Page.PrayersList) {
        return (
            <PageContainer>
                <PageHeader title={"PRAYERS"} />
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ShareChristContainer />
        </PageContainer>
    );
}

const mapStateToProps = (state: any) => ({
    page: state.app.page,
    error: state.errors.error,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);