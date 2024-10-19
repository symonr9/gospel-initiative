import React from 'react';
import { connect } from 'react-redux';
import { SceneMap } from 'react-native-tab-view';

import PageView from '@/components/common/PageView';
import AppTabView from '@/components/common/AppTabView';
import HomeLayout from '@/components/home/HomeLayout';
import { clearAppError } from '@/redux/actions';
import Error from '@/models/error';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';

export type IHome = {
    error: Error,
    clearAppError: Function
};

const renderScene = SceneMap({
    home: HomeLayout,
});

function Home({ error, clearAppError }: IHome) {
    const [routes] = React.useState([
        { key: 'home', title: 'Home ' },
    ]);

    return (
        <PageView>
            {
                error && (
                    <AnimatedBanner iconSrc={AppIcon.Info}
                        text={error.title}
                        prefixText={error.details}
                        onClick={() => clearAppError()} />
                )
            }
            
            <HomeLayout/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        error: state.errors.error,
    };
};

const mapDispatchToProps = {
    clearAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
