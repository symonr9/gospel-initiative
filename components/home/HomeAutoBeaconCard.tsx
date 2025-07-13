import React, { useEffect, useState } from 'react';
import { type ViewProps, FlatList, Modal, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { AppIcon, AutoBeaconType, BeaconTag, RefreshSpec } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import User from '@/models/user';
import { refreshData, setAppError } from '@/redux/actions';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import { AppText, TextType } from '../common/AppText';
import AppError from '@/models/error';
import { updateUser } from '@/requests/userRequests';
import { mapAutoBeaconTypeToDetailsText, mapAutoBeaconTypeToTitleText, mapBeaconTagToTitleText } from '@/utils/textUtils';
import { mapAutoBeaconTypeToIcon } from '@/utils/iconUtils';
import { screenWidth, standardModalHeight, standardPaddedWidth } from '@/constants/Dimensions';
import { useModalStyles } from '@/styles/Styles';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import { beaconTagArray } from '@/constants/Constants';
import { PageChip } from '../common/PageChip';
import { StyledImage } from '../common/StyledImage';

const autoBeaconTypeArray = Object.keys(AutoBeaconType)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: AutoBeaconType[key as keyof typeof AutoBeaconType],
        label: mapAutoBeaconTypeToTitleText(AutoBeaconType[key as keyof typeof AutoBeaconType]),
        details: mapAutoBeaconTypeToDetailsText(AutoBeaconType[key as keyof typeof AutoBeaconType]),
        icon: mapAutoBeaconTypeToIcon(AutoBeaconType[key as keyof typeof AutoBeaconType]),
    }));

export type IHomeAutoBeaconCard = ViewProps & {
    executor: User;

    refreshData: Function;
    setAppError: Function;
};

function HomeAutoBeaconCard({ executor, refreshData, setAppError }: IHomeAutoBeaconCard) {

    const [selectedType, setSelectedType] = useState(AutoBeaconType.Opportunities);
    const [selectedTags, setSelectedTags] = useState<BeaconTag[]>([]);
    const [isInfoExpanded, setIsInfoExpanded] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    useEffect(() => {
        if (executor) {
            setSelectedType(executor.autoBeaconType);
            setSelectedTags(executor.autoBeaconTags);
        }
    }, [executor]);

    if (!executor) {
        return <></>;
    }

    const toggleSwitch = async () => {
        if (!executor) {
            return;
        }

        const updatedUser = {
            ...executor,
            enableAutoBeacons: !executor.enableAutoBeacons,
        };

        const response = await updateUser(updatedUser);
        if (response.error) {
            setAppError(new AppError('Error Updating User', response.error));
            return;
        }

        refreshData(RefreshSpec.User);
    };

    const enabled = executor.enableAutoBeacons;
    const type = executor.autoBeaconType;

    const onAutoBeaconTypeCardClick = () => {
        if (executor) {
            setModalVisible(true);
        }
    }

    const onSaveAutoBeaconClick = async () => {
        if (!executor) {
            return;
        }

        const updatedUser = {
            ...executor,
            autoBeaconType: selectedType,
            autoBeaconTags: selectedTags,
        };

        setLoading(true);
        const response = await updateUser(updatedUser);
        setLoading(false);
        if (response.error) {
            setAppError(new AppError('Error Updating User', response.error));
            return;
        }

        refreshData(RefreshSpec.User);
        setModalVisible(false);
    };

    const renderTypeItem = ({ item, index }: { item: { value: AutoBeaconType, icon: AppIcon, label: string, details: string }; index: number }) => {
        const handlePress = () => {
            setSelectedType(item.value);
        };

        return (
            <TouchableOpacity onPress={handlePress}>
                <PageRow style={[modalStyles.card, selectedType === item.value && modalStyles.selectedCard]}>
                    <StyledImage iconSrc={item.icon} 
                        useTextTint={false}
                        style={[modalStyles.icon, selectedType === item.value && modalStyles.selected]}/>
                    <PageColumn style={{ marginStart: 8, width: standardPaddedWidth, flexShrink: 1 }}>
                        <AppText type={TextType.DefaultSemiBold} style={{}}>{item.label}</AppText>
                        <AppText type={TextType.Italic} style={{}}>{item.details}</AppText>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        );
    }

    const onTagSelect = (tag: BeaconTag) => {
        const isSelected = selectedTags.includes(tag);
        if (isSelected) {
            setSelectedTags([...selectedTags].filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const detailsView = (
        <PageColumn style={{ gap: 8 }}>
            <PageRow style={{ gap: 8 }}>
                <Switch
                    trackColor={{ false: Colors.info, true: Colors.light.secondary }}
                    thumbColor={enabled ? Colors.forestGreen : Colors.red}
                    ios_backgroundColor={Colors.info}
                    onValueChange={toggleSwitch}
                    value={enabled}
                />
                <AppText type={TextType.Body} style={{ marginVertical: 'auto' }}>
                    {enabled ? 'Auto beacons are enabled' : 'Auto beacons are disabled'}
                </AppText>
            </PageRow>

            <View>
                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(!isModalVisible)}>
                    <View style={modalStyles.modalContainer}>
                        <View style={[modalStyles.modalContent]}>
                            <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>Select Your Auto Beacon Template</AppText>

                            <PageColumn style={{ height: standardModalHeight / 1.5 }}>
                                <FlatList
                                    data={autoBeaconTypeArray}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderTypeItem}
                                />
                            </PageColumn>

                            <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>Select Your Tags</AppText>

                            <PageColumn style={{ height: standardModalHeight / 2.5 }}>
                                <FlatList
                                    data={beaconTagArray}
                                    keyExtractor={(item) => item.value.toString()}
                                    renderItem={({ item }) => (
                                        <PageChip
                                            title={item.title}
                                            subtitle={item.details}
                                            onClick={() => onTagSelect(item.value)}
                                            style={[{ marginBottom: 12 }, selectedTags.includes(item.value) && styles.selectedTag]}
                                        />
                                    )}
                                />
                            </PageColumn>

                            <PageRow style={{ alignSelf: 'center', gap: 32 }}>
                                <SimpleButton type={ButtonType.Edit}
                                    text={'Cancel'}
                                    disabled={loading}
                                    onPress={() => setModalVisible(false)} />

                                <SimpleButton type={ButtonType.Save}
                                    text={'Save'}
                                    disabled={loading}
                                    onPress={onSaveAutoBeaconClick} />
                            </PageRow>
                        </View>
                    </View>
                </Modal>
            </View>

            {
                enabled && (
                    <PageColumn style={{ width: standardPaddedWidth, flexShrink: 1 }}>
                        <SimpleCard title={mapAutoBeaconTypeToTitleText(type)}
                            iconSrc={mapAutoBeaconTypeToIcon(type)}
                            onClick={onAutoBeaconTypeCardClick}
                            subtitle={mapAutoBeaconTypeToDetailsText(type)}
                            useTextTintForIcon={false}
                            detailsView={
                                <PageColumn style={{ maxHeight: 100, marginVertical: 4 }}>
                                    <FlatList
                                        data={executor.autoBeaconTags}
                                        keyExtractor={(item) => item.toString()}
                                        numColumns={2}
                                        renderItem={({ item }) => (
                                            <PageChip
                                                title={mapBeaconTagToTitleText(item)}
                                                small
                                            />
                                        )}
                                    />
                                </PageColumn>
                            } />
                    </PageColumn>
                )
            }

        </PageColumn>
    );

    const subtitle = isInfoExpanded 
        ? 'Auto beacons are generated daily from a pool of users that have them enabled. They help the community pray for each other regularly. They cycle through all enabled users before restarting and can be found on the Pray page.'
        : 'Tap for more info.';

    return (
        <SimpleCard iconSrc={AppIcon.LightHouse}
            style={[styles.card]}
            title={'Auto Beacons'}
            subtitle={subtitle}
            onClick={() => setIsInfoExpanded(val => !val)}
            detailsView={detailsView} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16
    },
    selectedTag: {
        backgroundColor: Colors.selected,
    },
});

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
});


const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAutoBeaconCard);
