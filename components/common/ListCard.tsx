import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import LocalEvent from '@/models/localEvent';
import { AppIcon } from '@/enums/enums';
import { Colors } from '@/constants/Colors';

export type IListCard = {
  title: string;
  icon: AppIcon;
  hide?: boolean;
  onClick: Function;
};

export function ListCard({ title, icon, hide, onClick }: IListCard) {
  if (hide) {
    return <></>;
  }

  const onPress = () => {
    if (onClick) {
        onClick();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} contentFit="contain" />
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.Text entering={FadeInUp.duration(400).delay(600)} style={styles.titleText}>
          <AppText type={TextType.BodyBold} style={styles.title}>
            {title}
          </AppText>
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    padding: 16,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0', // Light gray background for a clean feel
    borderRadius: 16, // Circular for a modern design
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666', // Light gray for secondary text
  },
});

