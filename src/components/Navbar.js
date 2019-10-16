import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Platform, ScrollView} from 'react-native';
import List from './src/components/List.js'

class Navbar extends Component {
   _onPress = () => {
    console.log('click');
 
  }
  render() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
          <View style={styles.icon_Menu}>
          <Button
            title="Press me"  
            onPress={_onPress}
            color="#841584"  
            />
          </View>
          <View>
            <Text style={styles.title}> Alabanza Band</Text>
          </View>
          <View style={styles.icon_navbar}>
            <Button
              onPress={_onPress}  
              title="A"  
              color="#841584"
            />
            <Button
              onPress={_onPress}  
              title="B"  
              color="#841584"
            />
            <Button
              onPress={_onPress}  
              title="C"  
              color="#841584"
            />
            <Button
              onPress={_onPress}  
              title="D"  
              color="#841584"
            />
          </View>
        </View>
        <View style={styles.body} >
          <List/>
        </View>
      
    </View>
  );
  }
}
export default Navbar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',


   
  },
  header:{
    flex: .5,
    flexDirection:'row',
    backgroundColor: '#eee',
    justifyContent:'space-around',
    alignItems:'center' , 
   
  }, 
  red:{
    
  },
  icon_Menu:{
    width: 50, 
    height: 50,
  },
  icon_navbar:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex: 5,
    backgroundColor: '#fff',
  },
 
  title: {
    color: '#777',
    fontSize:16,
   
  },
});