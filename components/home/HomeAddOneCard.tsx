import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import One from '@/models/one';

export type IHomeAddOneCard = ViewProps & {
    executor: User;
    ones: One[];
};

function HomeAddOneCard({ executor, ones }: IHomeAddOneCard) {
    const router = useRouter();

    const onClick = () => {
        router.replace('/ones?tab=0');
    };

    if (!executor || ones.length > 0) {
        return <></>;
    }

    return (
        <SimpleCard iconSrc={AppIcon.User}
            style={[styles.card]}
            title={'Add your One'}
            subtitle={'Please add your One on the Ones page to get started.'}
            onClick={onClick} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16
      },
});

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    ones: state.ones.ones,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAddOneCard);
