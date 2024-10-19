import React, {  } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { formStyles } from '@/styles/Styles';
import Checkbox from 'expo-checkbox';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { setHomeDailies } from '@/redux/actions';

export type IHomeChecklistItem = ViewProps & {
    title: string;
    subtitle: string;
    itemKey: string;

    homeDailies: any;
    setHomeDailies: Function;
};

function HomeChecklistItem({ homeDailies, setHomeDailies, title, subtitle, itemKey }: IHomeChecklistItem) {
    const onPress = () => {
        setHomeDailies({
            ...homeDailies,
            [itemKey]: !homeDailies.itemKey
        });
    };

    return (
        <TouchableOpacity onPress={onPress}>
        <PageRow style={styles.checklistItem}>
          <Checkbox
            value={homeDailies[itemKey]}
            onValueChange={onPress}
            color={homeDailies[itemKey] ? '#8ce665' : undefined}
            style={[formStyles.checkbox, { alignSelf: 'center', marginStart: 4, marginEnd: 12 }]}
          />
          <PageColumn>
            <AppText type={TextType.DefaultSemiBold}>
                {title}
            </AppText>
            <PageRow style={{ flexShrink: 1, width: '90%' }}>
              <AppText type={TextType.Body}>
                {subtitle}
              </AppText>
            </PageRow>
          </PageColumn>
        </PageRow>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checklistItem: {
        padding: 6,
      },
});

const mapStateToProps = (state: any) => ({
    homeDailies: state.app.homeDailies,
});


const mapDispatchToProps = {
    setHomeDailies
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeChecklistItem);
