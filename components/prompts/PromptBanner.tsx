import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Image } from 'expo-image';
import { View, type ViewProps, StyleSheet } from 'react-native';

import { selectFirstPromptByUserId, selectPromptsByUserId } from '@/redux/selectors';
import { AppIcon } from '@/enums/enums';
import { AnimatedBanner } from '../common/AnimatedBanner';
import Prompt from '@/models/prompt';
import { AnimatedCard } from '../common/AnimatedCard';
import { PromptQuestions } from '@/constants/Strings';
import { getItemForDate } from '@/utils/appUtils';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';

export type IPromptBanner = ViewProps & {
    firstPrompt: Prompt,
};

function PromptBanner({ firstPrompt }: IPromptBanner) {
    if (!firstPrompt) {
        return <></>;
    }

    const promptQuestion = getItemForDate(new Date(), PromptQuestions);

    return (
        <Animated.View entering={FadeIn.duration(400).delay(0)}
            style={[styles.container]}>
            <PageColumn style={styles.textContainer}>

                <View>
                    <AppText type={TextType.Body}>
                        Prompt of the Day
                    </AppText>
                    <AppText type={TextType.BodyBold} style={[styles.textLabel]}>
                        {promptQuestion}
                    </AppText>
                </View>
            </PageColumn>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderRadius: 4,
        overflow: 'scroll',
        margin: 12,
    },
    header: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 1,  // Allow text container to shrink if necessary
        flexGrow: 1,    // Allow text container to grow as needed
        // flexWrap: 'wrap', // Ensure text wraps within the container
    },
    textLabel: {
        fontSize: 30,
        maxWidth: '100%', // Ensure text stays within the parent container
        color: '#333',    // Optional: better readability
    },
    icon: {
        height: 28,
        width: 28,
        alignSelf: 'center',
        marginEnd: 8,
    }
});

const mapStateToProps = (state: any) => {
    const executor = state.users.executor;
    if (!executor)
        return {};

    const firstPrompt = selectFirstPromptByUserId(state, executor.id);
    return {
        firstPrompt
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PromptBanner);
