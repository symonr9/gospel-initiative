import { AvatarIcon, AvatarIconArray } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { AppText, TextType } from './AppText';
import ScrollLayout from './ScrollLayout';

export type IAvatarIconPicker = ViewProps & {
    selectedIcon: AvatarIcon;
    setSelectedIcon: Function;
};

const AvatarIconPicker = ({ selectedIcon, setSelectedIcon }: IAvatarIconPicker) => {
    const renderIcon = ({ item }: { item: AvatarIcon }) => {
        const handleIconPress = () => {
            setSelectedIcon(item);
        };

        return (
            <TouchableOpacity onPress={handleIconPress}>
                <Image source={item} style={[styles.icon, selectedIcon === item && styles.selected]} />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.selectedContainer}>
                {selectedIcon ? (
                    <>                        
                        <AppText type={TextType.DefaultSemiBold}>Selected Icon:</AppText>
                        <Image source={selectedIcon} style={styles.selectedIcon} />
                    </>
                ) : (
                    <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                )}
            </View>

            <ScrollLayout style={{height: 200}}>
                <FlatList
                    data={AvatarIconArray}
                    renderItem={renderIcon}
                    numColumns={4}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollLayout>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    icon: {
        width: 50,
        height: 50,
        margin: 4,
        opacity: 0.4
    },
    selected: {
        opacity: 1
    },
    selectedContainer: {
        alignItems: 'center'
    },
    selectedText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedIcon: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default AvatarIconPicker;
