import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

import One from '@/models/one';
import { AvatarIcon } from '@/enums/enums';
import { Colors } from '@/constants/Colors';

import { OneCardView } from './OneCardView';

const onesData = require('../../data/sample-ones.json');

export type ThemedViewProps = ViewProps & {

};

export function OnesListView({ style, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

    const [ones, setOnes] = useState<One[]>([]);

    useEffect(() => {
        const loadedOnes = onesData.map(item => {
            const icon = AvatarIcon[item.icon as keyof typeof AvatarIcon];
            return new One(item.id, item.name, icon);
        });
        setOnes(loadedOnes);
    }, []);

    const renderItem = ({ item }: { item: One }) => (
        <OneCardView one={item} />
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={ones}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );

}
