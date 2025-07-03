import React, { useState, useEffect } from "react";
import { Button, View, ViewProps } from "react-native";
import { AppIcon } from "@/enums/enums";
import { AppText, TextType } from "@/components/common/AppText";
import { PageColumn } from "@/components/common/PageColumn";
import { SimpleButton, ButtonType } from "@/components/common/SimpleButton";
import { SimpleCard } from "@/components/common/SimpleCard";
import { PageRow } from "@/components/common/PageRow";
import User from "@/models/user";
import { connect } from "react-redux";
import { refreshData, setAppError } from "@/redux/actions";

type ISettingsBeaconPrefs = ViewProps & {
    executor: User;
    refreshData: Function;
    setAppError: Function;
};

function SettingsBeaconPrefs({ executor, refreshData, setAppError }: ISettingsBeaconPrefs) {
    return (
        <View>
            <AppText type={TextType.Subtitle}>Beacon Preferences</AppText>
            <PageColumn>
                <SimpleCard title={"Notification Settings"}>

                </SimpleCard>
            </PageColumn>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
    };
};

const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBeaconPrefs));