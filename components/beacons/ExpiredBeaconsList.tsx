
import React, { useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { useBeaconStyles, listStyles } from '@/styles/Styles';
import { setAppError } from '@/redux/actions';
import User from '@/models/user';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { getAppTimeAgoText } from '@/utils/appUtils';
import { mapBeaconTypeToIcon } from "@/utils/iconUtils";
import { PageRow } from '../common/PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import Beacon from '@/models/beacon';
import { standardPaddedWidth } from '@/constants/Dimensions';
import { BeaconCard } from './BeaconCard';

export type IExpiredBeaconsList = ViewProps & {
    selectedOneId: string | null;
    executor: User,
    setAppError: Function,
    expiredBeacons: Beacon[],
};

function ExpiredBeaconsList({ selectedOneId, executor, setAppError, expiredBeacons }: IExpiredBeaconsList) {
    const [modalVisible, setModalVisible] = useState(false);

    const themeColors = useThemeColors();
    const beaconStyles = useBeaconStyles(themeColors);

    const onChangeTag = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <PageRow style={beaconStyles.beaconCard}>
                <PageColumn style={{ gap: 8 }}>
                    <PageColumn style={beaconStyles.beaconHeader}>
                        <PageRow>
                            <Image source={mapBeaconTypeToIcon(item.type)}
                                style={beaconStyles.icon}
                                contentFit="contain" />
                            <PageColumn style={{ gap: 4 }}>
                                <AppText type={TextType.Subtitle3} style={beaconStyles.beaconNameText}>
                                    {item.name}
                                </AppText>
                                {
                                    item.message && (
                                        <AppText type={TextType.Body} style={beaconStyles.beaconDetailsText}>
                                            {item.message}
                                        </AppText>
                                    )
                                }
                                <AppText type={TextType.Italic}>
                                    {getAppTimeAgoText(item.activeUntil, true)}
                                </AppText>
                            </PageColumn>
                        </PageRow>
                    </PageColumn>
                </PageColumn>
            </PageRow>
        )
    };

    return (
        <PageColumn style={[listStyles.container, { marginTop: 20 }]}>
            <PageColumn style={{ marginBottom: 16 }}>
                <AppText type={TextType.Subtitle}>
                    Completed Beacons
                </AppText>
                <AppText>
                    These beacons have been completed.
                </AppText>
            </PageColumn>

            <FlatList
                data={expiredBeacons}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    section: {
        marginBottom: 8
    },
    selectedTag: {
        backgroundColor: Colors.selected,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
    executor: state.users.executor,
    expiredBeacons: state.beacons.expiredBeacons,
});


const mapDispatchToProps = {
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredBeaconsList);