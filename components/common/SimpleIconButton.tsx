import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from './AppText';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { AppIcon, Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';

export type ISimpleIconButton = {
  iconSrc: AppIcon | null;
  title?: string | undefined;
  pageToOpen?: Page;
  onClick?: () => void;
  small?: boolean;
  customStyles?: any;
  disabled?: boolean;
  removeBackground?: boolean;

  openPage: (page: Page) => void;
}

function SimpleIconButton({
  iconSrc = null,
  title,
  pageToOpen,
  small = false,
  customStyles = {},
  disabled = false,
  removeBackground = false,
  openPage,
  onClick
}: ISimpleIconButton) {

  const onPress = () => {
    if (disabled) 
      return;

    if (onClick) {
      onClick();
    }

    if (pageToOpen) {
      openPage(pageToOpen);
    }
  }

  const stylesToUse = small ? smallStyles : styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        stylesToUse.container,
        customStyles.container,
        disabled && styles.disabledContainer // Apply disabled styles
      ]}
      activeOpacity={disabled ? 1 : 0.7} // Disable press effect when disabled
      disabled={disabled} // Disable interaction when disabled
    >
      <View style={[stylesToUse.content, customStyles.content]}>
        <View
          style={[
            stylesToUse.iconContainer,
            customStyles.iconContainer,
            disabled && styles.disabledIconContainer, // Apply disabled icon styles
            removeBackground && styles.iconContainerMinimal
          ]}
        >
          {iconSrc && (
            <Image
              source={iconSrc}
              style={[stylesToUse.icon, disabled && styles.disabledIcon]}
              contentFit="contain"
            />
          )}
        </View>
        {title && (
          <AppText
            type={TextType.Prefix}
            style={[
              stylesToUse.title,
              customStyles.title,
              disabled && styles.disabledTitle // Apply disabled title styles
            ]}
          >
            {title}
          </AppText>
        )}
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
    width: 36,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Space between the icon and the title
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainerMinimal: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
  icon: {
    width: 26,
    height: 26,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  disabledContainer: {
    opacity: 0.5, // Make the whole button appear faded when disabled
  },
  disabledIconContainer: {
    backgroundColor: '#DDD', // Change icon container background when disabled
    shadowOpacity: 0, // Remove shadow when disabled
    elevation: 0,
  },
  disabledIcon: {
    tintColor: '#AAA', // Change icon color when disabled
  },
  disabledTitle: {
    color: '#AAA', // Change title color when disabled
  },
});

const smallStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    marginBottom: 8,
  },
  iconContainer: {
    ...styles.iconContainer,
    width: 32,
    height: 32,
    borderRadius: 60,
  },
  icon: {
    ...styles.icon,
    width: 20,
    height: 20,
  },
  title: {
    ...styles.title,
    fontSize: 14,
  },
});

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  openPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleIconButton);
