import React from 'react';
import { StatusBar,StyleSheet, Text, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import List from './List.js'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ItemComponent from '../components/ItemComponent';

import ContactsIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import * as firebase from "firebase/app";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
let itemsRef = db.ref('/items');
import { db } from './firebase.js';

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Container,Header} from './conext/themes/styled'
import { styles } from '../styles/Styles.js';


class Navbar extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      modalVisible: false,
      optionCategory:'all',
      items: null,
    }
  }
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    console.log("modal de busqueda activado",this.state.modalVisible)
  }

  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
  removeStoreData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
      /* console.log("storage clear") */
      this.props.navigation.navigate('AuthLoading')
      
    }
    catch(e) {
    
      console.log("error en remover ",e)
    }
   
  }
  
  singOut = () =>{
    firebase
    .auth()
    .signOut()
    .then(() => {this.removeStoreData();console.log('cerrar')})
    .catch(error => this.setState({ errorMessage: error.message }))
    

    
  }
  componentDidMount(){
    this.songsBd()

    if( this.state.optionCategory == "all"){
      this.songsBd()
    }
    this.show_songs(this.state.optionCategory)
  }
  songsBd(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      if(data !== null){ 
      let items = Object.values(data);
      this.setState({ items });
      }
      })
    
  }
  show_songs(option){
 
    if( option =="bandas"){
      this.select_category("bandas")
    }
    
    
  }
  select_category(category){
    let query = itemsRef.orderByChild('category').equalTo(category).once('value')
    query.then((snapshot)=> {
       let query_category = snapshot.val();
       let items = Object.values(query_category);
       this.setState({ items});
        console.log("consulta data base",items)
      }).catch((e)=>{
      console.log("valor no encontrado",e)
    })
  }
  render() {
  return (
 
    <View style={navbarStyles.container} >
       
    <ThemeContext.Consumer>
        {data => 
      <ThemeProvider theme={data}>

        <Header>

          <View style={navbarStyles.iconMenu}>
          <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={() => this.props.navigation.openDrawer()}
          >

            
              <Icon 
                name='menu'
                color={data.text}
                size={30}
            
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex:1}}>
            <Text style={{color:data.text,textAlign:'center',fontSize:20}}> ALABANZABAND</Text>
          </View>
          <View >
          <TouchableOpacity style={navbarStyles.btn_nav}>
              <Icon2 
                name='ios-search'
                color={data.text}
                onPress={() => this.props.navigation.navigate('Search',{items:this.state.items})}
                size={25}
            
            />
            </TouchableOpacity> 
{/*        <TouchableOpacity style={navbarStyles.btn_nav}>
              <ContactsIcon 
                name='contacts'
                color={data.text}
                onPress={() => this.props.navigation.navigate('Contacts')}
                size={25}
            
            />
            </TouchableOpacity>  */}
          {/*    <TouchableOpacity >
              <Icon 
                name='bell'
                color='#fff'
                onPress={() => this.props.navigation.navigate('ListNotification')}
                size={25}
            
              />
            </TouchableOpacity> */}
    {/*         <TouchableOpacity style={navbarStyles.btn_nav}
            onPress={() => this.props.navigation.navigate('Suggestion')}>
              <Icon 
                name='music'
                color='#5f25fe'
                size={25}
              />
              <Icon 
                name='plus'
                color='#5f25fe'
                size={10}
              />
            </TouchableOpacity> */}
    {/*         <Menu style={navbarStyles.btn_nav}
              ref={this.setMenuRef}
              button={
              <TouchableOpacity onPress={this.showMenu}>
                <Icon 
                name='user'
                color='#5f25fe'
                size={25}
              />
              </TouchableOpacity>}
            >
              <MenuItem onPress={this.hideMenu}>Perfil</MenuItem>
              <MenuItem onPress={this.singOut}>Cerrar sesión </MenuItem>
              <MenuDivider />
            </Menu> */}
            
          </View>

        </Header>
    

          <List items={this.state.items}/>
      </ThemeProvider>
    }
      </ThemeContext.Consumer>
  </View>
  );
  }
}
export default withNavigation(Navbar);

const navbarStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
    height:'100%'

   
  },
  header:{
    flex: .5,
    flexDirection:'row',
    /* backgroundColor: '#f43', */
    justifyContent:'space-around',
    alignItems:'center' , 
   
  },

  btn_nav:{
    margin:8
  },
 
  iconMenu:{
    width: 50, 
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },

  iconnavbar:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex: 5,
    backgroundColor: '#fff',
  },
 
  title: {
    fontSize:20,
    textAlign:'center'
   
  },
});