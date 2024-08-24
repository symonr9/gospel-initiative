import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { ThemedText, ThemedTextType } from './ThemedText';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';

export type ISimpleIconButton = {
  iconSrc: string | null;
  title: string;
  pageToOpen?: Page;
  onClick?: () => void;
  
  openPage: (page: Page) => void;
}

export function SimpleIconButton({ iconSrc = null, title, 
  pageToOpen, openPage, onClick }: ISimpleIconButton) {
  const backgroundColor = useBackgroundThemeColor();

  const onPress = () => {
    if (onClick) {
      onClick();
    }
    
    if (pageToOpen) {
      openPage(pageToOpen);
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {
            iconSrc && (
              <Image source={iconSrc} style={styles.icon} contentFit="contain" />
            )
          }
        </View>
        <ThemedText type={ThemedTextType.Subtitle} style={styles.title}>
          {title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Space between the icon and the title
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
});


const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleIconButton);