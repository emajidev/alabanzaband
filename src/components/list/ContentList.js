import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ContentList extends React.Component {
    constructor(props) {
        super(props);
      };
    state = {  }
    render() {
        return (
        <View style={styles.container}>
            <Text>ContentList</Text> 
        </View>
           
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      backgroundColor: '#fff',
     
    }
  });