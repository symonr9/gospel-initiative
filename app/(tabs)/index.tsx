import React from 'react';
import { connect } from 'react-redux';
import PageView from '@/components/common/PageView';
import HomeLayout from '@/components/home/HomeLayout';

export type IHome = {
    error: string,
};

function Home({ error }: IHome) {
    return (
        <PageView>
            <HomeLayout/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
