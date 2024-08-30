import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ViewProps, Animated, TextInput, Button, StyleSheet, Picker } from 'react-native';

import { formStyles } from '@/styles/Styles';
import { setSelectedBeaconId, updateBeacon } from '@/redux/actions';
import { PageSubHeader } from '../common/PageSubHeader';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { ThemedView } from '../common/ThemedView';
import { AppIcon, BeaconType, Priority } from '@/enums/enums';
import Beacon from '@/models/beacon';

export type IAddEditBeaconForm = ViewProps & {
    adding: boolean;
    selectedBeaconId: string | null;
    beacons: Beacon[];
    setSelectedBeaconId: Function;
    updateBeacon: Function;
};

function AddEditBeaconForm({ adding, selectedBeaconId, beacons, setSelectedBeaconId }: IAddEditBeaconForm) {
    const [formBeacon, setFormBeacon] = useState<Beacon>(
        (beacons.filter((beacon) => beacon.id === selectedBeaconId))[0] || Beacon.createNew()
    );
    
    const [bgColor, setBgColor] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(bgColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    const interpolatedBgColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'lightgreen']
    });

    const headerText = adding ? `Adding New Prayer Beacon` : `Editing Prayer Beacon`;

    const handleInputChange = (field: keyof Beacon, value: any) => {
        setFormBeacon({ ...formBeacon, [field]: value });
    };

    const handleSave = () => {
        console.log('Saved Prayer Beacon:', formBeacon);
        updateBeacon(formBeacon);
    };

    return (
        <View style={formStyles.container}>
            <Animated.View style={[formStyles.header, { backgroundColor: interpolatedBgColor }]}>
                <PageSubHeader title={headerText} iconSrc={AppIcon.NetworkPeople} />
            </Animated.View>

            <ThemedView>
                <View style={styles.inputGroup}>
                    <ThemedText type={ThemedTextType.Default}>Beacon Name</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="Beacon Name"
                        value={formBeacon.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <ThemedText type={ThemedTextType.Default}>Message</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="Message"
                        value={formBeacon.message}
                        onChangeText={(text) => handleInputChange('message', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <ThemedText type={ThemedTextType.Default}>Target Date</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD"
                        value={formBeacon.targetDate?.toISOString().split('T')[0] || ''}
                        onChangeText={(text) => handleInputChange('targetDate', new Date(text))}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <ThemedText type={ThemedTextType.Default}>Priority</ThemedText>
                    <Picker
                        selectedValue={formBeacon.priority}
                        style={styles.picker}
                        onValueChange={(itemValue: any) => handleInputChange('priority', itemValue)}
                    >
                        <Picker.Item label="Low" value={Priority.Low} />
                        <Picker.Item label="Normal" value={Priority.Normal} />
                        <Picker.Item label="High" value={Priority.High} />
                    </Picker>
                </View>

                <View style={styles.inputGroup}>
                    <ThemedText type={ThemedTextType.Default}>Beacon Type</ThemedText>
                    <Picker
                        selectedValue={formBeacon.type}
                        style={styles.picker}
                        onValueChange={(itemValue: any) => handleInputChange('type', itemValue)}
                    >
                        <Picker.Item label="To Community" value={BeaconType.Normal} />
                    </Picker>
                </View>

                <Button title="Save" onPress={handleSave} />
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
        borderRadius: 4,
    },
    picker: {
        height: 50,
        width: '100%',
        marginTop: 5,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    selectedBeaconId: state.beacons.selectedBeaconId,
    beacons: state.beacons.beacons,
});

const mapDispatchToProps = {
    setSelectedBeaconId,
    updateBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditBeaconForm);
