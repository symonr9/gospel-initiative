import React from "react";
import one from "@/models/one";
import { mapStageToIcon, mapStageToText } from "@/utils/appUtils";
import { ViewProps, View, StyleSheet } from "react-native";
import { AnimatedCount } from "./AnimatedCount";
import { Image } from "expo-image";
import { AppText, TextType } from "./AppText";
import { PageRow } from "./PageRow";
import { PageColumn } from "./PageColumn";
import { AppIcon, OneStage } from "@/enums/enums";

export type IOneDetailsSection = ViewProps & {
    iconSrc: AppIcon | string,
    prefix: any,
    title: any
};

function OneDetailsSection({ iconSrc, title, prefix, style }: IOneDetailsSection) {
    return (
        <PageColumn style={style}>
            <Image source={iconSrc} style={styles.icon} />
            <PageColumn style={{ marginTop: 6 }}>
                <AppText type={TextType.Body}>{prefix}</AppText>
                <AppText type={TextType.DefaultSemiBold}>{title}</AppText>
            </PageColumn>
        </PageColumn>
    );
}


const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
});

export default OneDetailsSection;