import React from 'react';
import { GestureResponderEvent, Switch, type ViewProps } from 'react-native';

import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { useGridStyles } from '@/styles/Styles';
import { Colors, useThemeColors } from '@/constants/Colors';

export type IUserPreferencesSection = ViewProps & {
    notifyOnEveryBeacon: boolean;
    notifyMorningAndEveningOnly: boolean;
    setNotifyOnEveryBeacon: Function;
    setNotifyMorningAndEveningOnly: Function;
}

export function UserPreferencesSection({ notifyMorningAndEveningOnly, notifyOnEveryBeacon, 
    setNotifyMorningAndEveningOnly, setNotifyOnEveryBeacon, style}: IUserPreferencesSection) {

    const themeColors = useThemeColors();
    const gridStyles = useGridStyles(themeColors);

    return (
        <PageColumn style={{ gap: 12 }} center>
            <PageRow style={{ gap: 8, marginHorizontal: 16 }}>
                <Switch
                    trackColor={{ false: Colors.info, true: Colors.light.secondary }}
                    thumbColor={notifyOnEveryBeacon ? Colors.forestGreen : Colors.red}
                    ios_backgroundColor={Colors.info}
                    onValueChange={() => setNotifyOnEveryBeacon(!notifyOnEveryBeacon)}
                    value={notifyOnEveryBeacon}
                />
                <AppText type={TextType.Body} style={{ marginVertical: 'auto' }}>
                    {notifyOnEveryBeacon ? 'Notifications enabled for every prayer beacon' : 'Notifications disabled for every prayer beacon'}
                </AppText>
            </PageRow>

            <PageRow style={{ gap: 8, marginHorizontal: 16 }}>
                <Switch
                    trackColor={{ false: Colors.info, true: Colors.light.secondary }}
                    thumbColor={notifyMorningAndEveningOnly ? Colors.forestGreen : Colors.red}
                    ios_backgroundColor={Colors.info}
                    onValueChange={() => setNotifyMorningAndEveningOnly(!notifyMorningAndEveningOnly)}
                    value={notifyMorningAndEveningOnly}
                />
                <AppText type={TextType.Body} style={{ marginVertical: 'auto' }}>
                    {notifyMorningAndEveningOnly ? 'Morning and Evening Notifications Enabled' : 'Morning and Evening Notifications Disabled'}
                </AppText>
            </PageRow>
        </PageColumn>
    );
}