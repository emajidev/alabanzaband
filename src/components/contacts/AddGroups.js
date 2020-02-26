import React from 'react';
import { Text, View, AsyncStorage,TouchableOpacity, StyleSheet,FlatList,StatusBar,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'

import { db } from '../firebase.js';

class Option extends React.Component {
  render() {
    const { selected, name  } = this.props;
    return(
       <TouchableOpacity 
        onPress={() => this.props.onPress()}
        style={selected ? styles.select :styles.unselect}
       >
         <Text style={styles.textContact}>{name}</Text>
       </TouchableOpacity>
    )
  }
}
class AddGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: [],
      items: [],
      next:false
    };

    this.isSelected = this.isSelected.bind(this);
  }

  toggleStyles(el,index) {
    const { selected } = this.state;
    return selected.indexOf(index) !== -1;
  }

  isSelected(i,index) {
    let { selected } = this.state;
    if (selected.indexOf(i) === -1) {
      selected.push(i);
    } else {
      selected = selected.filter(index => index !== i);
    }
    this.setState({ selected });
    console.log("grupo",this.state.selected)

    
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

  componentDidMount() {
    this.getData()
  }
 
  render() {
    return (
      <View style={{width:'100%'}}>
        <View>
          <View style={{flexWrap:'wrap',flexDirection:'row'}}> 
            {this.state.selected.map((phone,index) =>(
            <Text key={index} style={styles.selectPhone}>{phone}</Text>
            ))}
          </View>     
          <FlatList
            data={this.state.items}
            enableEmptySections={true}
            renderItem={({item,index}) => (
              <Option
              name={item.name}
              key={index}
              onPress={() => this.isSelected(item.phoneContact,index)}
              selected={this.toggleStyles( item.phoneContact,index)}
              />          
              )}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CreateGroups',{selected:this.state.selected})}>
              <Text>
                siguiente
              </Text>
            </TouchableOpacity>
            </View>
    </View>
    );
  }
}


 export default withNavigation(AddGroups)

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

    },
    buttonText: {
      fontSize: 18,
      color: '#000',
      alignSelf: 'center'
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
      width:'100%',
      height:50,
      margin:10,
      
     
      borderBottomWidth:.5,
     
      justifyContent:'center',
     
      
     },
 })
