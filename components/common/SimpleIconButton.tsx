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

  openPage: (page: Page) => void;
}

function SimpleIconButton({ iconSrc = null, title,
  pageToOpen, small = false, customStyles = {}, openPage, onClick }: ISimpleIconButton) {
  const backgroundColor = useBackgroundThemeColor();

  const onPress = () => {
    if (onClick) {
      onClick();
    }

    if (pageToOpen) {
      openPage(pageToOpen);
    }
  }

  const stylesToUse = small ? smallStyles : styles;

  return (
    <TouchableOpacity onPress={onPress} style={[stylesToUse.container, customStyles.container, { backgroundColor }]}>
      <View style={[stylesToUse.content, customStyles.content]}>
        <View style={[stylesToUse.iconContainer, customStyles.iconContainer]}>
          {
            iconSrc && (
              <Image source={iconSrc} style={stylesToUse.icon} contentFit="contain" />
            )
          }
        </View>
        {
          title && (
            <AppText type={TextType.Subtitle} style={[stylesToUse.title, customStyles.title]}>
              {title}
            </AppText>
          )
        }
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



const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleIconButton);