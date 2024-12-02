import React, { useState } from "react";
import { Image } from 'expo-image';
import { Button, TextInput, View, ViewProps } from "react-native";
import { AppIcon, AvatarIcon, AvatarIconArray, NewUserStep } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleTextList } from "@/components/common/SimpleTextList";
import AvatarIconPicker from "@/components/common/AvatarIconPicker";
import { formStyles } from "@/styles/Styles";
import { getRandomElement } from "@/utils/appUtils";
import { updateUser } from "@/requests/userRequests";
import User from "@/models/user";
import AppError from "@/models/error";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { MAX_SHORT_TEXT_LENGTH } from "@/constants/Constants";

type INewUserCreateAProfile = ViewProps & {
    executor: User;
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    styles: any;

    setAppError: Function;
};

const MAX_NAME_LENGTH = 16;

const isValidForm = (name: string, icon: AvatarIcon) => {
    if (!name || name.length === 0 || name.length > MAX_NAME_LENGTH) {
        return false;
    }
    return true;
}

export default function NewUserCreateAProfile({ executor, newUserStep, setNewUserStep, setAppError, styles }: INewUserCreateAProfile) {
    const [name, setName] = useState<string>("");
    const [icon, setIcon] = useState<AvatarIcon>(getRandomElement(AvatarIconArray));

    const isValid = isValidForm(name, icon);
    const shouldShowNameError = name.length > MAX_NAME_LENGTH;

    const onContinue = async () => {
        const updatedUser = {
            ...executor,
            name,
            icon
        };

        const response = await updateUser(updatedUser);
        if (response.error) {
            setAppError(new AppError('Error Updating User', response.error));
            return;
        }
        setNewUserStep(NewUserStep.Finished);
    };

    return (
        <PageColumn style={{}}>
            <AppText type={TextType.Title}>New Profile</AppText>

            <AppText>
                Time to create a profile! Add a nickname and picture. You can edit this information later.
            </AppText>

            <PageColumn style={styles.section}>
                <AvatarIconPicker selectedIcon={icon} setSelectedIcon={setIcon} />
            </PageColumn>

            <PageColumn style={[styles.section, styles.nameSection]} spaceEvenly>
                <AppText type={TextType.DefaultSemiBold}>Your Nickname (Max: {MAX_SHORT_TEXT_LENGTH}</AppText>
                <TextInput
                    style={formStyles.textInput}
                    placeholder={`Enter nickname here...`}
                    placeholderTextColor={'gray'}
                    value={name}
                    numberOfLines={1}
                    maxLength={MAX_SHORT_TEXT_LENGTH}
                    onChangeText={(text) => setName(text)}
                />
                {
                    shouldShowNameError && (
                        <AppText style={{ color: 'red' }}>Name should be less than {MAX_NAME_LENGTH} characters.</AppText>
                    )
                }
            </PageColumn>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Continue'}
                    disabled={!isValid}
                    onPress={onContinue}/>
            </PageColumn>

            <View style={{ height: 300 }} />
        </PageColumn>
    );
}