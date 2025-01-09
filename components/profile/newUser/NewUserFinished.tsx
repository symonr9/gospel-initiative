import React from "react";
import { Image } from 'expo-image';
import { Button, View, ViewProps } from "react-native";
import { AppIcon, NewUserStep, RefreshSpec } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { setLocalNewUserStep } from "@/utils/storageUtils";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { Colors } from "@/constants/Colors";

type INewUserFinished = ViewProps & {
    newUserStep: NewUserStep;
    setNewUserStep: Function;
    refreshData: Function;
    styles: any;
};

export default function NewUserFinished({ newUserStep, setNewUserStep, refreshData,
    styles }: INewUserFinished) {
    const onDone = async () => {
        refreshData(RefreshSpec.All);
        setNewUserStep(NewUserStep.Completed);
        await setLocalNewUserStep(NewUserStep.Completed);
    };

    return (
        <PageColumn style={{ gap: 4 }}>
            <AppText type={TextType.Title}>Setup Complete</AppText>

            <Image source={AppIcon.AppLogoTransparent}
                tintColor={Colors.light.darkAlternative}
                style={styles.logoIcon} />

            <AppText>
                Thank you for downloading our app and we hope that it is helpful as you share your life
                and faith with those around you!
            </AppText>

            <PageColumn style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                    text={'Done'}
                    onPress={onDone} />
            </PageColumn>

            
            <View style={{ height: 300 }}/>
        </PageColumn>
    );
}