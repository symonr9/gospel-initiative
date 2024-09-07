import React from 'react';
import { Platform, Button, View, Alert, ViewProps } from 'react-native';
import * as Calendar from 'expo-calendar';

export type IAddToCalendarButton = ViewProps & {
    startDate: Date,
    endDate: Date,
    title: string,
    details: string,
    location: string
};

const AddToCalendarButton = ({ startDate, endDate, title, details, location }: IAddToCalendarButton) => {

    // Request calendar permissions
    async function requestCalendarPermissions() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You need to enable calendar permissions to add events.');
            return false;
        }
        return true;
    }

    // Add event to calendar (Apple/Google)
    async function addToCalendar() {
        const hasPermission = await requestCalendarPermissions();
        if (!hasPermission) return;

        // Get or create default calendar
        const defaultCalendarSource = Platform.OS === 'ios'
            ? await Calendar.getDefaultCalendarAsync()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        const calendarId = await Calendar.createCalendarAsync({
            title: 'My Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendar',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        // Create event
        await Calendar.createEventAsync(calendarId, {
            title,
            startDate,
            endDate,
            location,
            notes: details,
        });

        Alert.alert('Success', 'Event added to your calendar.');
    }

    return (
        <View>
            <Button
                title="Add to Calendar"
                onPress={() => addToCalendar()}
            />
        </View>
    );
};

export default AddToCalendarButton;
