
import React from 'react';

import { connect } from 'react-redux';
import { ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';

import PageHeader from '@/components/common/PageHeader';
import { PageColumn } from '@/components/common/PageColumn';
import { PageRow } from '@/components/common/PageRow';
import NavigateToPrayersCard from '@/components/prayers/NavigateToPrayersCard';
import NavigateToOnesCard from '@/components/ones/NavigateToOnesCard';

export type IShareChrist = ViewProps & {
    error: string,
};

function ShareChrist({ error }: IShareChrist) {

    return (
        <PageView>
            <PageColumn spaceBetween>
                <PageRow>
                    <PageHeader title={"Share Christ"}/>
                </PageRow>

                <PageRow spaceBetween>
                    <NavigateToPrayersCard/>
                    <NavigateToOnesCard/>
                </PageRow>
            </PageColumn>
        </PageView>
    );
}

const mapStateToProps = (state: any) => ({
    error: state.errors.error,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);