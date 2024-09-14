import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, Animated, TextInput, KeyboardAvoidingView } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from '../common/AppText';
import { AppIcon, Priority, ShareChristPageState } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { getShowHideIcon, mapPriorityToText } from '@/utils/appUtils';
import { PageChip } from '../common/PageChip';
import BeaconTemplate from '@/models/beaconTemplate';
import { BeaconTemplateCard } from './BeaconTemplateCard';
import One from '@/models/one';
import { setBeaconForm } from '@/redux/actions';
import BeaconForm from '@/models/beaconForm';
import { formStyles } from '@/styles/Styles';
import AppKeyboardAvoidingComponent from '../common/AppKeyboardAvoidingView';
import ScrollLayout from '../common/ScrollLayout';

export type IBeaconTemplateDetails = ViewProps & {
    template: BeaconTemplate;
    shareChristPageState: ShareChristPageState;
    selectedOne: One;

    setBeaconForm: Function;
};

function BeaconTemplateDetails({ shareChristPageState, template, selectedOne, setBeaconForm }: IBeaconTemplateDetails) {
    const [formData, setFormData] = useState(new BeaconForm(false, true, null, Priority.Normal, []));

    useEffect(() => {
        setBeaconForm(formData);
    }, [formData]);

    const setShareOneName = (shareOneName: boolean) => {
        setFormData((prev) => ({
            ...prev,
            shareOneName
        }));
    };

    const setShareOwnName = (shareOwnName: boolean) => {
        setFormData((prev) => ({
            ...prev,
            shareOwnName
        }));
    };

    const setNotes = (notes: string) => {
        setFormData((prev) => ({
            ...prev,
            notes
        }));
    };

    const setPriority = (priority: Priority) => {
        setFormData((prev) => ({
            ...prev,
            priority
        }));
    };

    const onSetPriorityClick = () => {
        let newPriority;
        if (priority === Priority.Low) {
            newPriority = Priority.Normal;
        } else if (priority === Priority.Normal) {
            newPriority = Priority.High;
        } else {
            newPriority = Priority.Low;
        }
        setPriority(newPriority);
    }

    const { shareOneName, shareOwnName, priority, notes } = formData;

    return (
        <ThemedView style={[styles.container]}>
            <BeaconTemplateCard template={template}
                selectedTemplateId={template.id} />

            <PageColumn style={styles.section}>
                <PageChip iconSrc={getShowHideIcon(shareOwnName)}
                    style={{ width: 180 }}
                    onClick={() => setShareOwnName(!shareOwnName)}
                    title={shareOwnName ? `Show your name` : `Hide your name`} />
            </PageColumn>

            <PageColumn style={styles.section}>
                <PageChip iconSrc={AppIcon.Star}
                    style={{ width: 180 }}
                    onClick={onSetPriorityClick}
                    title={`Priority: ${mapPriorityToText(priority)}`} />
            </PageColumn>

            <PageColumn style={styles.section}>
            <AppText type={TextType.Default}>Notes</AppText>
                <AppKeyboardAvoidingComponent>
                    <ScrollLayout>
                    <TextInput
                    style={formStyles.multiLineTextInput}
                    placeholder="Enter note here..."
                    placeholderTextColor={'gray'}
                    value={notes}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setNotes(text)}
                />             
                    </ScrollLayout>

       
                </AppKeyboardAvoidingComponent>

            </PageColumn>

            <PageColumn style={styles.section}>
                <AppText type={TextType.Subtitle}>
                    When you send...
                </AppText>
                <AppText type={TextType.Default}>
                    Your beacon will be delivered to friends in your community and will
                    be active for 24 hours.
                </AppText>
            </PageColumn>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 4,
        elevation: 4,
    },
    section: {
        marginBottom: 8,
    },
    icon: {
        margin: 8,
        width: 48,
        height: 48,
    },
});

const mapStateToProps = (state: any) => {
    return {
        shareChristPageState: state.app.shareChristPageState,
        selectedOne: state.ones.selectedOne
    };
};

const mapDispatchToProps = {
    setBeaconForm
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplateDetails);