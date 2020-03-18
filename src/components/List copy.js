import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'
class List extends React.Component {
   
   constructor(pros){
      super(pros)
    };
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
                     key = {index}
                     style = {styles.TouchableOpacity}
                     onPress={() => this.props.navigation.navigate('AddItem')}
                  >
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
 export default withNavigation(List);

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