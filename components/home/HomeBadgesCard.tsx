import React from 'react';
import { type ViewProps, Modal, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import { setShowingBadgesAtHome } from '@/redux/actions';
import { useThemeColors } from '@/constants/Colors';
import { formStyles, useModalStyles } from '@/styles/Styles';
import { MAX_SHORT_TEXT_LENGTH } from '@/constants/Constants';
import { AppText, TextType } from '../common/AppText';
import AvatarIconPicker from '../common/AvatarIconPicker';
import LoadingLayout from '../common/LoadingLayout';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import { UserPreferencesSection } from '../common/UserPreferencesSection';
import { SimpleIcon } from '../common/SimpleIcon';
import { AnimatedHeader } from '../common/AnimatedHeader';

export type IHomeBadgesCard = ViewProps & {
    executor: User;
    showingBadgesAtHome: boolean;
    setShowingBadgesAtHome: Function;
};

function HomeBadgesCard({ executor, showingBadgesAtHome, setShowingBadgesAtHome }: IHomeBadgesCard) {
    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    const onClick = () => {
        setShowingBadgesAtHome(!showingBadgesAtHome);
    };

    if (!executor)
        return <></>;

    return (
        <>
            <Modal
                transparent={true}
                animationType='slide'
                visible={showingBadgesAtHome}
                onRequestClose={() => setShowingBadgesAtHome(false)}>
                <View style={modalStyles.modalContainer}>
                    <View style={[modalStyles.modalContent]}>
                        <AppText type={TextType.Subtitle} 
                            style={modalStyles.modalTitle}>
                            Your Badges
                        </AppText>

                        <PageRow>
                            <SimpleIcon iconSrc={executor?.icon || AppIcon.User} large />
                            <AnimatedHeader title={executor?.name || ''} />
                        </PageRow>

                        <PageRow style={{ alignSelf: 'center', gap: 32 }}>
                            <SimpleButton type={ButtonType.Edit}
                                text={'Back'}
                                onPress={() => setShowingBadgesAtHome(false)} />
                        </PageRow>
                    </View>
                </View>
            </Modal>

            <SimpleCard iconSrc={AppIcon.Star}
                style={[styles.card]}
                title={'Badges'}
                useTextTintForIcon={false}
                subtitle={'Tap on this card to go to view your badges.'}
                onClick={onClick} />
        </>
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
    showingBadgesAtHome: state.app.showingBadgesAtHome,
});


const mapDispatchToProps = {
    setShowingBadgesAtHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBadgesCard);