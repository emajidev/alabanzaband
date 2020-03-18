import React from 'react'
import { View, Text, StatusBar, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native'
import { withNavigation } from 'react-navigation'
import Shareicon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import MusicIcon from 'react-native-vector-icons/MaterialCommunityIcons'



   
    

class ContentItem extends React.Component {

    render() {
        const {item} = this.props.navigation.state.params;
        const FortmatLyrics = item.lyrics.replace(/\+/g, "\n");
        console.log(item.name)
       return (
          
         <View style = {styles.container}  >
            <View>
               <View style={{flexDirection:'row'}}>
                  <View style={{width:'20%', alignContent:'center',justifyContent:'center'}}>
                     <MusicIcon 
                     name='bookmark-music'
                     color='#000'
                     size={60}
                     />
                  </View>
                
                  <View style={{width:'60%'}}>
                     <Text style={styles.title}>Titulo: <Text style={{fontWeight:'bold'}}>{item.name}</Text> </Text>
                     <Text style={styles.subtitle}>Categoria:  <Text style={{fontWeight:'bold'}}>{item.category}</Text></Text>
                  </View>
                  <View style={{width:'20%', alignContent:'center',justifyContent:'center'}}>
                     <TouchableOpacity style={styles.btn_nav}>
                     <Shareicon 
                        name='share-2'
                        color='#000'
                        onPress={() => this.props.navigation.navigate('AddNotification',{item})}
                        size={50}
                     />
                     </TouchableOpacity>
                  </View>
        
               </View>
               <View style={styles.lyrics}>
                  <Text>{FortmatLyrics}</Text>
               </View>
            </View>
     
              
                
            <TouchableOpacity style={{ marginTop:50}}  onPress={() => this.props.navigation.goBack()}>
                <Icon name='chevron-circle-left' size={40}/>
              
            </TouchableOpacity>
          </View>
       )
    }
 }
 export default withNavigation(ContentItem);

 const styles = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'flex-start',
       alignItems:'center',
       marginTop:StatusBar.currentHeight+15,
       margin:15,
    },
    lyrics:{
      margin:15,
    },
    title:{
       fontSize:20,
    },
    subtitle:{
      fontSize:15,
    }
 })
