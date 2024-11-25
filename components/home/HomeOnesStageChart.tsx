import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, ViewProps } from "react-native";
import One from "@/models/one";
import { StageArray } from "@/utils/appUtils";
import ScrollLayout from "../common/ScrollLayout";

type IHomeOneStageChart = ViewProps & {
  ones: One[];
};

const HomeOneStageChart = ({ ones }: IHomeOneStageChart) => {

  const stageCounts = StageArray.map((stage) => ones.filter((one) => one.stage === stage.stage).length);

  return (
    <ScrollLayout horizontal>
      <LineChart
        data={{
          labels: StageArray.map((stage) => stage.label),
          datasets: [{ data: stageCounts }],
        }}
        width={600}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: "#fafafa",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontSize: 14, // Change the font size
            fontFamily: 'LeagueSpartan', // Customize the font family
            fill: "rgba(0, 0, 0, 0.8)", // Adjust the color of the labels
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollLayout>
  );
};

export default HomeOneStageChart;
