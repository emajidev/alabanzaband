import React from 'react';
import { Text, View, AsyncStorage,TouchableOpacity, StyleSheet,ScrollView,StatusBar,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'

import { db } from '../firebase.js';
class CreateGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        open: false,
        selected: [],
        items: [],
        groupName:'',
        };
    }

    CreateGroup = async (selected) => {
        try {
            const dataUser = await AsyncStorage.getItem('@storage_Key')
            let newDataUser = JSON.parse(dataUser);
            if(newDataUser.phone !== null) {
                const groups = db.ref('/users/groups')
                groups.push({
                    director:newDataUser.phone,
                    group_name:this.state.groupName,
                    members:selected
                   }).then((snapshot) => {
                    groups.child(snapshot.key).update({"id": snapshot.key})
                    let key = snapshot.key;
                    selected.map((phoneToSend, index) =>{
                        console.log("miembros",phoneToSend)
                        const groupsForUser = db.ref('/users/user'+phoneToSend+'/'+'groups')
                        groupsForUser.push({
                            key_group:key,
                            director:newDataUser.phone,
                            group_name:this.state.groupName,
                        })
                    });
                    
                  }); 
            }
            }catch(e){
                console.log(e)
            }
    }
    Groups_query = async(key_group)=>{
        try {
          const group_data  = db.ref('/users/groups/'+key_group)
          group_data.on('value',(snapshot) =>{
            let data = snapshot.val();
            if(data !== null){ 
              let items = Object.values(data);
                
            }else{
                console.log("no hay grupos")
              }
          })
        }catch(e){
      }               
      }

    render() {
      const selected = this.props.navigation.state.params.selected;
      console.log("item pasado",selected)
      return (
        <View style={styles.container}>
            <Text>{selected}</Text>
            <TextInput style={styles.itemInput} onChange={this.Group_Name} placeholder={'Titulo'}/>
            <TouchableOpacity onPress={()=>{this.CreateGroup(selected)}}>
                <Text style={styles.textContact}>crear</Text>
            </TouchableOpacity>
        </View>
        
      )
     
    }
 }


 export default withNavigation(CreateGroups)

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