import React, { } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { formStyles } from '@/styles/Styles';
import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { setHomeDailies } from '@/redux/actions';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { standardPaddedWidth } from '@/constants/Dimensions';

export type IHomeDailyTasksItem = ViewProps & {
  title: string;
  subtitle: string;
  checked: boolean;
  onClick?: Function | undefined;
  iconSrc?: AppIcon | AvatarIcon | null;
};

function HomeDailyTasksItem({ title, subtitle, checked, onClick, iconSrc = null }: IHomeDailyTasksItem) {
  const onPress = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onClick === undefined ? 1 : 0.2}>
      <PageRow style={styles.checklistItem}>
        <Checkbox
          value={checked}
          color={checked ? '#8ce665' : undefined}
          style={[formStyles.checkbox, { alignSelf: 'center', marginStart: 4, marginEnd: 12 }]}
        />
        <PageRow>
          {
            iconSrc && (
              <Image source={iconSrc}
                style={styles.icon}
                contentFit="contain" />
            )
          }
          <PageColumn>
            <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
              <AppText type={TextType.Subtitle3}>
                {title}
              </AppText>
            </PageRow>
            <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
              <AppText type={TextType.Body}>
                {subtitle}
              </AppText>
            </PageRow>
          </PageColumn>
        </PageRow>
      </PageRow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checklistItem: {
    padding: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginEnd: 8,
    alignSelf: 'center'
  },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {
  setHomeDailies
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDailyTasksItem);
