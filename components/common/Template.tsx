import React, {  } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ViewProps } from 'react-native';

export type ITemplate = ViewProps & {

};

function Template({ }: ITemplate) {
    return (

    );
}

const styles = StyleSheet.create({
    container: {    
    },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
