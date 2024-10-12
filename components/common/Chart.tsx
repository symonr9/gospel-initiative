import React, {  } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppText, TextType } from './AppText';
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
  