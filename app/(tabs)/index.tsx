import React from 'react';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';

import PageView from '@/components/common/PageView';
import AppTabView from '@/components/common/AppTabView';
import HomeLayout from '@/components/home/HomeLayout';

export type IHome = {
    error: string,
};

const renderScene = SceneMap({
    home: HomeLayout,
});

function Home({ error }: IHome) {
    const [routes] = React.useState([
        { key: 'home', title: 'Home ' },
    ]);

    return (
        <PageView>
            <AppTabView title={'Share Christ'}
                        renderScene={renderScene}
                        routes={routes}/>
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
