
import React, { useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { beaconStyles, listStyles } from '@/styles/Styles';
import { setAppError } from '@/redux/actions';
import One from '@/models/one';
import User from '@/models/user';
import { selectExpiredBeaconsWithActivities } from '@/redux/selectors/beaconSelectors';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { mapBeaconTypeToAppIcon, getAppTimeAgoText } from '@/utils/appUtils';
import { PageRow } from '../common/PageRow';

export type IExpiredBeaconsList = ViewProps & {
    selectedOneId: string | null;
    executor: User,
    setAppError: Function,
};

function ExpiredBeaconsList({ selectedOneId, executor, setAppError }: IExpiredBeaconsList) {
    const expiredBeaconsWithActivities = useSelector(selectExpiredBeaconsWithActivities(selectedOneId));

    const [modalVisible, setModalVisible] = useState(false);

    const onChangeTag = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => {

        return (
            <PageRow style={beaconStyles.beaconCard}>
                <PageColumn style={{ gap: 8 }}>
                    <PageColumn style={beaconStyles.beaconHeader}>
                        <PageRow>
                            <Image source={mapBeaconTypeToAppIcon(item.type)}
                                style={beaconStyles.icon}
                                contentFit="contain" />
                            <PageColumn style={{ gap: 4 }}>
                                <AppText type={TextType.Subtitle} style={beaconStyles.beaconNameText}>
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

                    <PageColumn style={{ width: 350 }}>
                        <AppText>
                            This beacon has been completed!
                        </AppText>
                    </PageColumn>
                </PageColumn>
            </PageRow>
        )
    };

    return (
        <PageColumn style={[listStyles.container]}>
            <AppText type={TextType.Subtitle}>
                Completed Beacons
            </AppText>

            <FlatList
                data={expiredBeaconsWithActivities}
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
        backgroundColor: '#d0e0e3',
    },
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
    executor: state.users.executor,
});


const mapDispatchToProps = {
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredBeaconsList);