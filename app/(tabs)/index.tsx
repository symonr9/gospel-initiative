import React from 'react';
import { connect } from 'react-redux';

import PageView from '@/components/common/PageView';
import HomeLayout from '@/components/home/HomeLayout';

export type IHome = {
};

function Home({ }: IHome) {
    return (
        <PageView>
            <HomeLayout />
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
