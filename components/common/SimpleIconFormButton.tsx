import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from './AppText';
import { AppIcon, Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';
import { halfScreenWidth } from '@/constants/Dimensions';
import { PageRow } from './PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import { StyledImage } from './StyledImage';

export type ISimpleIconFormButton = {
    iconSrc: AppIcon | null;
    title?: string | undefined;
    pageToOpen?: Page;
    onClick?: () => void;
    small?: boolean;
    info?: boolean;
    success?: boolean;
    customStyles?: any;
    disabled?: boolean;
    removeBackground?: boolean;

    openPage: (page: Page) => void;
}

function SimpleIconFormButton({
    iconSrc = null,
    title,
    pageToOpen,
    small = false,
    info = false,
    success = false,
    customStyles = {},
    disabled = false,
    removeBackground = false,
    openPage,
    onClick
}: ISimpleIconFormButton) {

    const themeColors = useThemeColors();
    const { secondaryColor, textColor } = themeColors;

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
            <PageRow style={[
                stylesToUse.content,
                customStyles.content,
                info && { backgroundColor: secondaryColor },
                success && { backgroundColor: Colors.success },
            ]}>
                <View
                    style={[
                        stylesToUse.iconContainer,
                        customStyles.iconContainer,
                        disabled && styles.disabledIconContainer, // Apply disabled icon styles
                        removeBackground && styles.iconContainerMinimal
                    ]}
                >
                    {iconSrc && (
                        <StyledImage iconSrc={iconSrc} 
                            useTextTint={!success}
                            style={[stylesToUse.icon, disabled && styles.disabledIcon]} />
                    )}
                </View>
                {title && (
                    <AppText
                        type={TextType.Subtitle3}
                        style={[
                            customStyles.title,
                            success && { color: Colors.light.text },
                            disabled && styles.disabledTitle // Apply disabled title styles
                        ]}
                    >
                        {title}
                    </AppText>
                )}
            </PageRow>
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
        justifyContent: 'center',
        height: 42,
        width: 120,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        padding: 4,
        paddingEnd: 8,
        backgroundColor: Colors.success,
    },
    iconContainer: {
        marginEnd: 4,
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleIconFormButton);