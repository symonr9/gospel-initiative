import React from 'react';
import { connect } from 'react-redux';

import PageView from '@/components/common/PageView';
import HomeLayout from '@/components/home/HomeLayout';
import { clearAppError } from '@/redux/actions';
import AppError from '@/models/error';
import { AnimatedBanner } from '@/components/common/AnimatedBanner';
import { AppIcon } from '@/enums/enums';

export type IHome = {
    error: AppError,
    clearAppError: Function
};

function Home({ error, clearAppError }: IHome) {
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
