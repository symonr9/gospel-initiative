import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AppIcon } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import Story from '@/models/story';

export type IShareChristStoryCard = {
    story: Story;
    
    setActiveStoryId: Function;
};

export function ShareChristStoryCard({ story, setActiveStoryId }: IShareChristStoryCard) {
    const onPress = () => {
        setActiveStoryId(story.id);
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.spine} />
            <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.iconContainer}>
                <Image source={story.icon} style={styles.icon} contentFit="contain" />
            </Animated.View>
            <Animated.Text entering={FadeInUp.duration(400).delay(600)} style={styles.titleContainer}>
                <AppText type={TextType.BodyBold} style={styles.titleText}>
                    {story.title}
                </AppText>
            </Animated.Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        paddingVertical: 4,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
        height: 100,
    },
    spine: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 12,
        backgroundColor: '#8B4513',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    iconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#D2B48C',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    icon: {
        width: 40,
        height: 40,
    },
    titleContainer: {
        flexShrink: 1,
    },
    titleText: {
        color: '#2F4F4F', // Dark Slate Gray
        fontSize: 16,
    },
});
