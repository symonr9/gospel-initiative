import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from './AppText';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';

export type ISimpleIconButton = {
  iconSrc: string | null;
  title?: string | undefined;
  pageToOpen?: Page;
  onClick?: () => void;
  small?: boolean;
  customStyles?: any;
  disabled?: boolean;

  openPage: (page: Page) => void;
}

function SimpleIconButton({
  iconSrc = null,
  title,
  pageToOpen,
  small = false,
  customStyles = {},
  disabled = false,
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
            disabled && styles.disabledIconContainer // Apply disabled icon styles
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
            type={TextType.Subtitle}
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
    width: 46,
    height: 46,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2, // Space between the icon and the title
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 16,
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
    width: 24,
    height: 24,
  },
  title: {
    ...styles.title,
    fontSize: 24,
  },
});

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  openPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleIconButton);
