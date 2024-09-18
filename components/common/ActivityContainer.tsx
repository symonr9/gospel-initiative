import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LocalMinistry from '@/models/localMinistry';
import LocalEvent from '@/models/localEvent';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import { AppIcon } from '@/enums/enums';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectAllMinistryActivitiesByExecutor } from '@/redux/selectors';
import MinistryActivity from '@/models/ministryActivity';
import { PageColumn } from './PageColumn';
import { AppText, TextType } from './AppText';
import { Image } from 'expo-image';
import { formatDateTime } from '@/utils/appUtils';

export type IActivityContainer = ViewProps & {
    activities: MinistryActivity[];
    title?: string;
};

function ActivityContainer({ activities, title = 'Your Activity' }: IActivityContainer) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    console.log("activities: ", activities);


    const renderItem = ({ item, index }: { item: MinistryActivity, index: number }) => {
        const onPress = () => {

        };

        return (
            <TouchableOpacity onPress={onPress}>
                <PageRow style={[styles.activityCard]}>
                    <DetailsSection iconSrc={AppIcon.Marker}
                        prefix={`${item.hours} Hours`}/>

                    <PageColumn style={{ marginStart: 8, flexShrink: 1}}>
                        {
                            item.note && (
                                <PageRow style={{ flexShrink: 1, width: '90%'}}>
                                    <AppText type={TextType.Default}>
                                        {item.note}
                                    </AppText>
                                </PageRow>
                            )
                        }
                        <AppText type={TextType.Prefix}>
                            {formatDateTime(item.date)}
                        </AppText>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        );
    };

    return (
        <PageColumn style={{ gap: 8 }}>
            <AppText type={TextType.DefaultSemiBold}>
                {title}
            </AppText>
            <ScrollLayout style={{ maxHeight: 300 }}>
                <FlatList
                    data={activities}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.itemList}
                />
            </ScrollLayout>
        </PageColumn>

    );
}

const styles = StyleSheet.create({
    activityCard: {
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
    },
    icon: {
        height: 32,
        width: 32,
    },
    itemList: {
        gap: 12
    }
});

const mapStateToProps = (state: any) => {

    return {};
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);