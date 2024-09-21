import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInUp, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { AppIcon } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import Story from '@/models/story';

export type IStoryCard = {
    story: Story;
    
    setActiveStoryId: Function;
};

export function StoryCard({ story, setActiveStoryId }: IStoryCard) {
    const onPress = () => {
        setActiveStoryId(story.id);
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View entering={ZoomIn} style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image source={story.icon} style={styles.icon} contentFit="contain" />
                </View>
                <View style={styles.titleContainer}>
                    <AppText type={TextType.DefaultSemiBold}>
                        {story.title}
                    </AppText>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
    },
    iconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#D2B48C',
        borderRadius: 32,
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
});
