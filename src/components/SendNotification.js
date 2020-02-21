import React from 'react';
import { Text, View, AsyncStorage,TouchableOpacity, StyleSheet,ScrollView,StatusBar,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'

import { db } from './firebase.js';

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
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      let itemsRef = db.ref('/users/user'+newData.phone+'/contacts' );

      if(newData.phone !== null) {
        // value previously stored
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          let contact = Object.values(data);
          console.log("contactos",contact)
          this.setState({ items:contact });
          
        });
      }
    } catch(e) {
      // error reading value
    }
  }
  generateID(){
    var d = new Date().getDate();
    var Id ='xxxxxxxxxxx4xxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r =(d+Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return ( c=='x'?r:(r&0x3 | 0x8)).toString(16);
    });
    return Id
  }
  componentDidMount() {
    this.getData()
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
            selected={this.toggleStyles( item.phoneContact)}
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
               onPress={async () => {
                try {
                  const dataUser = await AsyncStorage.getItem('@storage_Key')
                  let newDataUser = JSON.parse(dataUser);
                  
                  if(newDataUser.phone !== null) {
                    // value previously stored
                    this.state.selected.map((phoneToSend, index) =>{
                    let userName= newDataUser.nick
                   
                    const arrival = db.ref('/users/user'+phoneToSend+'/'+'notificationsReceived')

                    arrival.push({
                      sender:userName,
                      
                      phoneTransmitter:newDataUser.phone,
                      phoneReceiver:phoneToSend,
                      name:ItemNotification.item.name,
                      category:ItemNotification.item.category,
                      lyrics:ItemNotification.item.lyrics,
                      coment:ItemNotification.coment,
                      time:ItemNotification.date,
                      accepted: 'waiting',
                      toSent:'yes',
                      read:false

                     }).then((snapshot) => {
                      arrival.child(snapshot.key).update({"id": snapshot.key})
                    }); 

                    const sent = db.ref('/users/user'+newDataUser.phone+'/'+'notificationsSent')

                    sent.push({
                      sender:userName,
                      phoneUser:newDataUser.phone,
                      phoneSender:phoneToSend,
                      name:ItemNotification.item.name,
                      category:ItemNotification.item.category,
                      lyrics:ItemNotification.item.lyrics,
                      coment:ItemNotification.coment,
                      time:ItemNotification.date,
                      accepted: 'waiting',
                      toSent:'yes',
                      read:false

                     }).then((snapshot) => {
                      sent.child(snapshot.key).update({"id": snapshot.key})
                    }); 
                     let postId = newNotifReceived.key;
                     console.log("id push",postId) 
                   })
                  
                  }
                 
              
                }catch(e){

                }               
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