import React, { useMemo } from 'react';
import { type ViewProps, Modal, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import { setShowingBadgesAtHome } from '@/redux/actions';
import { Colors, useThemeColors } from '@/constants/Colors';
import { useModalStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import { SimpleIcon } from '../common/SimpleIcon';
import Beacon from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { SimpleBadge } from '../common/SimpleBadge';
import { calculatePercentByTotals } from '@/utils/appUtils';
import StoryChapter from '@/models/storyChapter';

export type IHomeBadgesCard = ViewProps & {
    executor: User;
    showingBadgesAtHome: boolean;
    expiredBeacons: Beacon[];
    myStoryChapters: StoryChapter[];
    setShowingBadgesAtHome: Function;
};

// Prayers, Beacons, Stories, Notes

const badgeThresholds = [1, 3, 5, 10, 15, 20, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500];

// e.g. titleCallback = (threshold) => `You have prayed for someone ${threshold} time(s).`;
const getCountBadges = (titleCallback: Function, count: number, icon: AppIcon, subtitleCallback: Function) => {
    const badges = [];

    for (const threshold of badgeThresholds) {
        if (count >= threshold) {
            badges.push({
                title: `${threshold} ${titleCallback(threshold)}`,
                subtitle: subtitleCallback(threshold, true),
                threshold,
                count,
                icon,
                achieved: true,
            });
        } else {
            badges.push({
                title: `${threshold} ${titleCallback(threshold)}`,
                subtitle: subtitleCallback(threshold, false),
                threshold,
                count,
                icon,
                achieved: false,
            });
        }
    }

    return badges;
}

const renderBadges = (badges: any) => badges.map(({ title, subtitle, threshold, icon, count, achieved }: any): any => {
    const backgroundColor = achieved ? Colors.forestGreen : Colors.info;
    const opacity = achieved ? 1 : 0.3;
    return (
        <SimpleBadge title={title}
            subtitle={subtitle}
            iconSrc={icon}
            style={{ backgroundColor, opacity }} />
    );
});

function HomeBadgesCard({ executor, showingBadgesAtHome, expiredBeacons, myStoryChapters, setShowingBadgesAtHome }: IHomeBadgesCard) {
    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    const beaconBadges = useMemo(() => {
        return getCountBadges((threshold: number) => `Beacon${threshold === 1 ? '' : 's'}`, expiredBeacons.length, AppIcon.LightHouse, (threshold: number, achieved: boolean) => {
            if (achieved)
                return `You have sent ${threshold} beacon${threshold === 1 ? '' : 's'}.`;
            else 
                return `Send ${threshold} beacon${threshold === 1 ? '' : 's'} to achieve this badge.`;
        });
    }, [expiredBeacons]);

    const prayerBadges = useMemo(() => {
        if (!executor)
            return [];

        return getCountBadges((threshold: number) => `Time${threshold === 1 ? '' : 's'} Prayed`, executor.activityCount, AppIcon.Prayer, (threshold: number, achieved: boolean) => {
            if (achieved)
                return `You have prayed ${threshold} time${threshold === 1 ? '' : 's'} for a beacon.`;
            else
                return `Pray ${threshold} time${threshold === 1 ? '' : 's'} to achieve this badge.`;
        });
    }, [executor]);

    const storyBadges = useMemo(() => {
        return getCountBadges((threshold: number) => `Story Card${threshold === 1 ? '' : 's'}`, myStoryChapters.length, AppIcon.Book, (threshold: number, achieved: boolean) => {
            if (achieved)
                return `You have created ${threshold} story card${threshold === 1 ? '' : 's'}.`;
            else
                return `Create ${threshold} story card${threshold === 1 ? '' : 's'} to achieve this badge.`;
        });
    }, [myStoryChapters]);


    const { achievedCount, totalCount, percentComplete, badgesToRender } = useMemo(() => {
        const achievedBeaconCount = beaconBadges.filter((item) => item.achieved).length;
        const missingBeaconCount = beaconBadges.length - achievedBeaconCount;

        const achievedPrayerCount = prayerBadges.filter((item) => item.achieved).length;
        const missingPrayerCount = prayerBadges.length - achievedPrayerCount;

        const achievedStoryCount = storyBadges.filter((item) => item.achieved).length;
        const missingStoryCount = storyBadges.length - achievedStoryCount;

        const achievedCount = achievedBeaconCount + achievedStoryCount + achievedPrayerCount;
        const missingCount = missingBeaconCount + missingStoryCount + missingPrayerCount;

        const totalCount = achievedCount + missingCount;
        const percentComplete = calculatePercentByTotals(achievedCount, totalCount);

        const badgesToRender = renderBadges(beaconBadges.concat(prayerBadges).concat(storyBadges).sort((a, b) => {
            // Sort by achieved (true first)
            if (a.achieved !== b.achieved) {
                return a.achieved ? -1 : 1;
            }
            // Then by threshold ascending
            return a.threshold - b.threshold;
        }));

        return { achievedCount, totalCount, percentComplete, badgesToRender };
    }, [beaconBadges, prayerBadges, storyBadges]);

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
                            {executor.name}'s Badges
                        </AppText>

                        <PageColumn center>
                            <PageColumn center>
                                <SimpleIcon iconSrc={executor?.icon || AppIcon.User} />

                                <AppText type={TextType.Subtitle3}>
                                    {achievedCount} / {totalCount} Badges
                                </AppText>
                                <AppText>
                                    {percentComplete}% Complete
                                </AppText>

                                <ScrollLayout style={{ maxHeight: 400 }}>
                                    {badgesToRender}
                                </ScrollLayout>

                            </PageColumn>
                        </PageColumn>

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
    expiredBeacons: state.beacons.expiredBeacons,
    myStoryChapters: state.stories.myStoryChapters,
});


const mapDispatchToProps = {
    setShowingBadgesAtHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBadgesCard);