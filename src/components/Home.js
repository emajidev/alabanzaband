import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
class Home extends Component {
 
    render() {
        return (
            <View style = {styles.container}  >
                <Text>
                   HOME 
                </Text>
                <Button
                    title='Go to Second Page'
                    onPress={() =>
                    navigate('List', { name: 'Awesomepankaj' })
                    }
                />
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create ({
    container:{
       flex:1,
       width: '100%',
       backgroundColor: '#d8fff4',
       
     
    },
})