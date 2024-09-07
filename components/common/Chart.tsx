import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';


export type IChart = ViewProps & {

};

function Chart({}: IChart) {


    return (
        <View>
            <AppText type={TextType.Body}>Chart</AppText>
        </View>
    )
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state: any) => {
    return {
    };
  };
  
  const mapDispatchToProps = {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chart);
  