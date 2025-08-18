import React from 'react';
import { GestureResponderEvent, Switch, type ViewProps } from 'react-native';

import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { useGridStyles } from '@/styles/Styles';
import { Colors, useThemeColors } from '@/constants/Colors';

export type IUserPreferencesSection = ViewProps & {
    notifyOnEveryBeacon: boolean;
    notifyMorning: boolean;
    notifyEvening: boolean;
    setNotifyOnEveryBeacon: Function;
    setNotifyMorning: Function;
    setNotifyEvening: Function;
}

export function UserPreferencesSection({ notifyMorning, notifyEvening, notifyOnEveryBeacon,
    setNotifyMorning, setNotifyEvening, setNotifyOnEveryBeacon, style }: IUserPreferencesSection) {

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
                    {notifyOnEveryBeacon ? 'Beacon Notifications Enabled' : 'Beacon Notifications Disabled'}
                </AppText>
            </PageRow>

            <PageRow style={{ gap: 8, marginHorizontal: 16 }}>
                <Switch
                    trackColor={{ false: Colors.info, true: Colors.light.secondary }}
                    thumbColor={notifyMorning ? Colors.forestGreen : Colors.red}
                    ios_backgroundColor={Colors.info}
                    onValueChange={() => setNotifyMorning(!notifyMorning)}
                    value={notifyMorning}
                />
                <AppText type={TextType.Body} style={{ marginVertical: 'auto' }}>
                    {notifyMorning ? 'Morning Notifications Enabled' : 'Morning Notifications Disabled'}
                </AppText>
            </PageRow>

            <PageRow style={{ gap: 8, marginHorizontal: 16 }}>
                <Switch
                    trackColor={{ false: Colors.info, true: Colors.light.secondary }}
                    thumbColor={notifyEvening ? Colors.forestGreen : Colors.red}
                    ios_backgroundColor={Colors.info}
                    onValueChange={() => setNotifyEvening(!notifyEvening)}
                    value={notifyEvening}
                />
                <AppText type={TextType.Body} style={{ marginVertical: 'auto' }}>
                    {notifyEvening ? 'Evening Notifications Enabled' : 'Evening Notifications Disabled'}
                </AppText>
            </PageRow>
        </PageColumn>
    );
}