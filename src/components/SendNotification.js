import React, { useState } from 'react';
import { Text, View, FlatList,TouchableOpacity, StyleSheet,ScrollView,StatusBar,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'
import MusicIcon from 'react-native-vector-icons/Entypo'
import ContactsComponent from './ContactsComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import { db } from './firebase.js';
let phone = '04169029089'
let itemsRef = db.ref('user'+phone+'/'+'contacts' );




class Option extends React.Component {
  render() {
    const { selected, name } = this.props;
    return(
       <TouchableOpacity 
        onPress={() => this.props.onPress()}
        style={selected ? styles.select :styles.unselect}
       >
         <Text style={styles.textContact}>Item {name}</Text>
       </TouchableOpacity>
    )
  }
}
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: [],
      items: [],
    };

    this.isSelected = this.isSelected.bind(this);
  }

  toggleStyles(el, index) {
    const { selected } = this.state;
    return selected.indexOf(index) !== -1;
  }

  isSelected(i) {
    let { selected } = this.state;
    if (selected.indexOf(i) === -1) {
      selected.push(i);
    } else {
      selected = selected.filter(index => index !== i);
    }
    this.setState({ selected });
    
  }
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      
    });
  }
  SendNotification=(item)=>{
   
    console.log("enviar notificacion"+item)

    this.state.selected.map((item, index) =>{
      
      })
   
   }
 
  render() {
    const {ItemNotification} = this.props;
    let notif = ItemNotification
    console.log("pasando notif",notif)
  /*   console.log(this.state.items) */
    return (
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',width:'100%'}}>
        {this.state.items.map((item, index) => (
          <Option
            name={item.name}
            key={index}
            onPress={() => this.isSelected(item.phoneContact)}
            selected={this.toggleStyles("item", item.phoneContact)}
          />
          
        ))}
        <View style={{flexWrap:'wrap',flexDirection:'row',width:'80%'}}> 
        {this.state.selected.map((phone,index) =>(
          <Text key={index} style={styles.selectPhone}>{phone}</Text>
        ))}

        </View>
        <TouchableHighlight
               style={styles.btn_primary_light}
               underlayColor="#000"
               onPress={() => {
                 console.log("cosa",ItemNotification)
                 this.state.selected.map((phoneToSend, index) =>{
                   let phoneSender='04262216526'
                  db.ref('user'+phoneToSend+'/'+'notifications'+'/').push({
                    sender:'user'+phoneSender,
                    name:ItemNotification.item.name,
                    category:ItemNotification.item.category,
                    lyrics:ItemNotification.item.lyrics,
                    coment:ItemNotification.coment
                  }) 
                  console.log(ItemNotification.item.name)
                  console.log(ItemNotification.item.lyrics)
                  console.log(ItemNotification.coment)
                })
               
                }}
            >
               <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight>
      </View>
    );
  }
}

class SendNotification extends React.Component {
      
    
    

    render() {
      const ItemNotification = this.props.navigation.state.params.ItemNotification;
      console.log("item pasado",ItemNotification)
      return (
        <View style={styles.container}>
          <Select ItemNotification={ItemNotification} />
        </View>
        
      )
     
    }
 }


 export default withNavigation(SendNotification)

 const styles = StyleSheet.create ({

    itemtext:{fontSize:20,marginLeft:5},
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    textContact:{fontSize: 15,},
    
     container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:StatusBar.currentHeight+15,
        
        
      
     },
     btn_primary_light:{
        
      borderColor:'#5f25fe',
      borderWidth:2,
      borderRadius:50,
      marginTop:40,
      padding:20,
      height:50,
      borderRadius:50,
      justifyContent:"center",
      alignItems:'center',
      flexDirection:'row',
      shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10

    },
    buttonText: {
      fontSize: 18,
      color: '#000',
      alignSelf: 'center'
    },
  
    select:{
      width:'80%',
      height:30,
      margin:10,
      borderColor:'#3e64ef',
      borderWidth:1,
      borderRadius:10,
      
      justifyContent:'center',
      alignItems:'center'
     },
     selectPhone:{
    
      height:40,
      margin:8,
      borderColor:'#3e64ef',
      borderWidth:1,
      borderRadius:10,
      padding:10,
      justifyContent:'center',
      alignItems:'center'
     },
     unselect:{
      width:'80%',
      height:30,
      margin:10,
      borderRadius:20,
     
      borderColor:'#000',
      borderWidth:1,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
      
     },
 })
/* 
 <TouchableOpacity
 key = {index}
 style = {styles.TouchableOpacity}
 onPress={() => alert(item.name)}
>
<View style={styles.boxContact} key={index}>

<Icon 
name='md-contact'
color='#5f25fe'
size={40}
/>
<Text style={styles.itemtext} >{item.name} </Text>

</View>
</TouchableOpacity> */

/* <ItemContact key={index} item={item.name}/> */