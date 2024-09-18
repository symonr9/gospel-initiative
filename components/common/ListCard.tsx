import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from './PageColumn';
import { truncateString } from '@/utils/appUtils';
import { PageRow } from './PageRow';

export type IListCard = {
  title: string;
  details?: string;
  icon: AppIcon;
  hide?: boolean;
  onClick: Function;
};

export function ListCard({ title, details, icon, hide, onClick }: IListCard) {
  if (hide) {
    return <></>;
  }

  const onPress = () => {
    if (onClick) {
      onClick();
    }
  };

  const detailsToRender = details ? truncateString(details, 100) : null;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View entering={FadeInUp.duration(300).delay(200)} style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} contentFit="contain" />
      </Animated.View>
      <PageColumn style={styles.textContainer}>
        <PageRow style={{ flexShrink: 1, width: '90%'}}>
          <Animated.Text entering={FadeInUp.duration(400).delay(400)}>
            <AppText type={TextType.BodyBold}>
              {title}
            </AppText>
          </Animated.Text>
        </PageRow>
        
        {
          detailsToRender && (
            <PageRow style={{ flexShrink: 1, width: '90%' }}>
                <Animated.Text entering={FadeInUp.duration(400).delay(600)}>
                  <AppText type={TextType.Prefix}>
                    {detailsToRender}
                  </AppText>
                </Animated.Text>
            </PageRow>
          )
        }
      </PageColumn>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8
  
  },
  iconContainer: {
    width: 42,
    height: 42,
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
    width: 32,
    height: 32,
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: 'center',
  },
});

