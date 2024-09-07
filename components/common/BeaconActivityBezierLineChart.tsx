import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from "react-native-chart-kit";
import { AppText, TextType } from './AppText'; // Assuming AppText is your custom text component
import { selectAllBeaconActivities } from '@/redux/selectors';
import BeaconActivity from '@/models/beaconActivity';

export type IBeaconHeatmapChart = {
  allActivities: BeaconActivity[];
};

const screenWidth = Dimensions.get('window').width;

function BeaconHeatmapChart({ allActivities }: IBeaconHeatmapChart) {
  const data = {
    labels: ["Aug 1", "Aug 3", "Aug 5", "Aug 7", "Aug 9", "Aug 10", "Aug 12"],
    datasets: [
      {
        data: [5, 2, 3, 3, 3, 2, 3], // Sample data for each date (can map from real activities)
        strokeWidth: 2, // Line thickness
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#f5f5f5", // Light gray background
    backgroundGradientTo: "#f5f5f5", // Light gray background
    decimalPlaces: 0, // No decimals in the labels
    color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`, // Navy blue line
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Gray labels
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#003366", // Navy blue dots
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AppText type={TextType.BodyBold} style={styles.title}>Beacon Activity</AppText>
        <LineChart
          data={data}
          width={screenWidth - 70} // Adjust width for padding
          height={250}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
          fromZero={true}
          withShadow={false}
          withInnerLines={false} // Remove gridlines
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = (state: any) => {
  const allActivities = selectAllBeaconActivities(state);
  return {
    allActivities,
  };
};

export default connect(mapStateToProps)(BeaconHeatmapChart);
