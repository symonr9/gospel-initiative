import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { AppText, TextType } from './AppText';
import { ContributionGraph } from "react-native-chart-kit";
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { selectAllStoryActivities } from '@/redux/selectors';
import StoryActivity from '@/models/storyActivity'; 
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';
import { RectProps } from 'react-native-svg';

export type IStoryActivityHeatMapChart = ViewProps & {
    allActivities: StoryActivity[];
};

function StoryActivityHeatMapChart({ allActivities }: IStoryActivityHeatMapChart) {
    // Transform activities to a format that ContributionGraph can use
    const heatMapData = allActivities.map(activity => ({
        date: activity.date.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
        count: activity.openedChapters,
    }));

    // Extract unique months to display as labels at the top
    const uniqueMonths = [...new Set(allActivities.map(activity => 
        activity.date.toLocaleString('default', { month: 'short' })
    ))];

    return (
        <View style={styles.container}>
            <View style={styles.chartWrapper}>
                <AppText type={TextType.BodyBold} style={styles.chartTitle}>Story Activity Heatmap</AppText>

                {/* Custom Labels for Months (on the x-axis) */}
                <View style={styles.monthLabels}>
                    {uniqueMonths.map((month, index) => (
                        <AppText key={index} type={TextType.Caption} style={styles.monthLabel}>
                            {month}
                        </AppText>
                    ))}
                </View>

                <ContributionGraph
                    values={heatMapData}
                    endDate={new Date()}
                    numDays={90}
                    width={Dimensions.get('window').width - 40}
                    height={250}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#f0f0f0',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Navy blue for activity
                        labelColor: (opacity = 1) => `rgba(105, 105, 105, ${opacity})`, // Dark gray for labels
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#1f77b4",
                        }
                    }}
                    squareSize={22} // Adjust square size for better visibility
                    horizontal={true} // Set horizontal layout
                    tooltipDataAttrs={(value: ContributionChartValue) => ({
                        'data-tooltip': `Date: ${value.date}, Opened: ${value.count} chapters`,
                    })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    chartWrapper: {
        padding: 10,
    },
    chartTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    monthLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    monthLabel: {
        fontSize: 12,
        color: 'gray',
    },
});

const mapStateToProps = (state: any) => {
    const allActivities = selectAllStoryActivities(state);
    return {
        allActivities,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoryActivityHeatMapChart);
