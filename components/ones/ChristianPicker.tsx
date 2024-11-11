import { AppIcon, RefreshSpec } from '@/enums/enums';
import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ViewProps, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { formStyles } from '@/styles/Styles';
import SelectDatePicker, { DatePickerVariation } from '../common/SelectDatePicker';
import { refreshData, setAppError } from '@/redux/actions';
import { createChristian, removeChristian, updateChristian } from "@/requests/oneRequests";
import User from '@/models/user';
import AppError from '@/models/error';
import Christian from '@/models/christian';
import AvatarIconPicker from '../common/AvatarIconPicker';
import CategoryPicker from '../common/CategoryPicker';
import { ChristianCard } from './ChristianCard';
import { getSelectedOne } from '@/utils/appUtils';

export type IChristianPicker = ViewProps & {
    executor: User;
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

enum PickerState {
    Normal,
    Adding,
    Editing,
    Removing,
}

const ChristianPicker = ({ executor, selectedOneId, ones, refreshData, setAppError }: IChristianPicker) => {
    const isFirstRender = useRef(false);

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedChristianId, setSelectedChristianId] = useState<string | null>(null);
    const [formChristian, setFormChristian] = useState<Christian>(Christian.createDefault(selectedOneId || ""));
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const christians = selectedOne?.christians || [];
    const selectedChristian = selectedChristianId ? christians.find((christian) => christian.id === selectedChristianId) : null;
    const adding = pickerState === PickerState.Adding;
    const removing = pickerState === PickerState.Removing;

    const oneKnownSinceEvents = formChristian.oneKnownSince ? [formChristian.oneKnownSince] : [];
    const knownSinceEvents = formChristian.knownSince ? [formChristian.knownSince] : [];

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        if (pickerState === PickerState.Normal) {
            setSelectedChristianId(null);
            setFormChristian(Christian.createDefault(selectedOneId || ""));
        }
    }, [pickerState]);

    useEffect(() => {
        if (!selectedChristianId || !selectedChristian) {
            return;
        }
        setFormChristian(selectedChristian);
    }, [selectedChristianId]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item }: { item: Christian }) => {
        const isSelected = selectedChristianId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedChristianId(null);
                setFormChristian(Christian.createDefault(selectedOneId || ""));
            } else {
                setSelectedChristianId(item.id);
            }
        };

        return (
            <ChristianCard christian={item} 
                selected={isSelected}
                handleOnPress={handleOnPress}/>
        );
    };

    const onBackClick = () => {
        setSelectedChristianId(null);
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = async () => {
        let response;
        if (adding) {
            response = await createChristian(formChristian);
        } else if (removing) {
            response = await removeChristian(formChristian);
        } else {
            response = await updateChristian(formChristian);
        }

        if (response.error) {
            setAppError(new AppError('Error saving christian: ', response.error));
            return;
        }

        refreshData(RefreshSpec.Ones);
        setPickerState(PickerState.Normal);
        setSelectedChristianId(null);
        setFormChristian(Christian.createDefault(selectedOneId || ""));
    };

    const Body = [];

    const Form = (
        <PageColumn>
            <PageRow spaceEvenly>
                <PageColumn style={styles.section}>
                    <AvatarIconPicker selectedIcon={formChristian.icon}
                        setSelectedIcon={(icon) => setFormChristian((prev) => ({ ...prev, icon }))} />
                </PageColumn>

                <PageColumn style={[styles.section, styles.nameSection]} spaceEvenly>
                    <AppText type={TextType.DefaultSemiBold}>Name of Christian</AppText>
                    <TextInput
                        style={formStyles.textInput}
                        placeholder="Enter name here..."
                        placeholderTextColor={'gray'}
                        value={formChristian.name}
                        numberOfLines={1}
                        onChangeText={(name) => setFormChristian((prev) => ({ ...prev, name }))}
                    />
                </PageColumn>
            </PageRow>

            <PageRow spaceEvenly>
                <PageColumn style={[styles.section, { gap: 8, width: '50%' }]}>
                    <AppText type={TextType.DefaultSemiBold}>Relationship with One</AppText>
                    <CategoryPicker selectedCategory={formChristian.oneCategory}
                        setSelectedCategory={(oneCategory) => setFormChristian((prev) => ({ ...prev, oneCategory }))}
                    />
                </PageColumn>

                <PageColumn style={[styles.section, { gap: 8, width: '50%' }]}>
                    <AppText type={TextType.DefaultSemiBold}>Relationship with You</AppText>
                    <CategoryPicker selectedCategory={formChristian.category}
                        setSelectedCategory={(category) => setFormChristian((prev) => ({ ...prev, category }))}
                    />
                </PageColumn>
            </PageRow>

            <PageRow spaceEvenly>
                <PageColumn style={[styles.section, { gap: 8, width: '45%' }]}>
                    <AppText type={TextType.DefaultSemiBold}>Known One since</AppText>
                    <SelectDatePicker events={oneKnownSinceEvents}
                        variation={DatePickerVariation.KnownSince}
                        onDateSelected={(oneKnownSince) => setFormChristian((prev) => ({ ...prev, oneKnownSince }))} />
                </PageColumn>
                <PageColumn style={[styles.section, { gap: 8, width: '45%' }]}>
                    <AppText type={TextType.DefaultSemiBold}>Known You since</AppText>
                    <SelectDatePicker events={knownSinceEvents}
                        variation={DatePickerVariation.KnownSince}
                        onDateSelected={(knownSince) => setFormChristian((prev) => ({ ...prev, knownSince }))} />
                </PageColumn>
            </PageRow>

            <PageColumn style={{ marginHorizontal: 12, marginVertical: 10 }}>
                <AppText type={TextType.DefaultSemiBold}>Notes</AppText>
                <TextInput
                    style={formStyles.multiLineTextInput}
                    placeholder="Enter text here..."
                    placeholderTextColor={'gray'}
                    value={formChristian.notes}
                    numberOfLines={4}
                    onChangeText={(notes) => setFormChristian((prev) => ({ ...prev, notes }))}
                />
            </PageColumn>

            <PageColumn style={{ marginHorizontal: 12, marginVertical: 10 }}>
                <AppText type={TextType.DefaultSemiBold}>Mutual Interests</AppText>
                <TextInput
                    style={formStyles.multiLineTextInput}
                    placeholder="Enter mutual interests here..."
                    placeholderTextColor={'gray'}
                    value={formChristian.mutualInterests}
                    numberOfLines={4}
                    onChangeText={(mutualInterests) => setFormChristian((prev) => ({ ...prev, mutualInterests }))}
                />
            </PageColumn>

        </PageColumn>
    );

    if (pickerState !== PickerState.Normal) {
        const saveIcon = removing ? AppIcon.Trash : AppIcon.Checkmark;
        const saveText = removing ? 'Confirm' : 'Save';
        Body.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    title={'Back'}
                    onClick={onBackClick} />
                <SimpleIconButton iconSrc={saveIcon}
                    title={saveText}
                    onClick={onSaveClick} />
            </PageRow>
        );
    } else {
        Body.push(
            <PageRow spaceEvenly>
                {
                    selectedChristianId === null && (
                        <SimpleIconButton iconSrc={AppIcon.Plus}
                            customStyles={{ container: { marginStart: 10, marginEnd: 10 } }}
                            title={'Add'}
                            onClick={() => setPickerState(PickerState.Adding)} />
                    )
                }

                {
                    selectedChristianId !== null && (
                        <>
                            <SimpleIconButton iconSrc={AppIcon.Edit}
                                title={'Edit'}
                                onClick={() => setPickerState(PickerState.Editing)} />
                            <SimpleIconButton iconSrc={AppIcon.Trash}
                                title={'Remove'}
                                onClick={() => setPickerState(PickerState.Removing)} />
                        </>
                    )
                }
            </PageRow>
        );
    }

    if (pickerState === PickerState.Normal) {
        Body.push(
            <PageColumn>
                <FlatList
                    data={christians}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.iconList}
                />
            </PageColumn>
        );
    } else if (pickerState === PickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Adding Christian
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Editing) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Editing Christian
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Removing && selectedChristian) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Are you sure you want to remove this Christian?
                </AppText>
                <ChristianCard christian={selectedChristian}/>
            </View>
        );
    } else {
        Body.push(
            <View>
                <AppText type={TextType.Body}>
                    Weird state!
                </AppText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppText type={TextType.Subtitle} style={styles.title}>Christians</AppText>
            {Body.map((item) => item)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
    },
    pageHeader: {
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
    },
    section: {
        marginVertical: 12,
        alignItems: 'center'
    },
    nameSection: {
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4,
        borderRadius: 8,
    },
    list: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
    },
    noteCard: {
        backgroundColor: '#FAF7DC',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 2,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        marginHorizontal: 10
    },
    selectedNoteCard: {
        backgroundColor: '#bbeccc',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    iconList: {
    },
    icon: {
        width: 32,
        height: 32,
        margin: 2,
        verticalAlign: 'middle',
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        selectedOneId: state.ones.selectedOneId,
        ones: state.ones.ones,
    };
};

const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(ChristianPicker);