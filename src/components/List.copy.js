import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,Alert} from 'react-native'

class List extends Component {
   state ={
      names: [
         {
         id: 0,
         name: 'Ben',
         },
         {
         id: 1,
         name: 'Susan',
         },
         {
         id: 2,
         name: 'Susan',
         }
      ]
    }
    alertItemName = (item) => {
      alert(item.name)
      }
    render() {
       return (
          <View style = {styles.container}  >
            <ScrollView >
               {
                  this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.TouchableOpacity}
                     onPress = {() => this.alertItemName(item)
                  }>
                  <Text style = {styles.text}>
                     {item.name}
                  </Text>
                  </TouchableOpacity>
                  ))
               }
            </ScrollView>
          </View>
       )
    }
 }
 export default List

 const styles = StyleSheet.create ({
     container:{
        flex:1,
        width: '100%',
        backgroundColor: '#d8fff4',
        
      
     },
    TouchableOpacity: {
       padding: 10,
       marginTop: 3,
       backgroundColor: '#d8ff41',
       alignItems:'center'
    },

    songs: {
       color: '#4f2f3c',
       

       
    }
 })