import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput ,FlatList,  RefreshControl,
ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {Container,Songs, Header} from './conext/themes/styled'
import Icon from 'react-native-vector-icons/Feather';
import IconLike from 'react-native-vector-icons/AntDesign';

import {ThemeContext, themes} from './conext/theme-context';
import {ThemeProvider} from 'styled-components/native'
import PouchDB from 'pouchdb-react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { db } from './firebase.js';

class SelectSongs extends React.Component{

  constructor(props){
    super(props)

    this.state={
      songsItems:this.props.items,
      refreshing: true,
      search:'',
      typeOfSearch:'name',
      search_mod:this.props.search_mode,
      items:[]
    }

  }
  componentWillUnmount(){
    this.setState({search_mode:false})
  }


  getData = async () => {
    try {
        let itemsRef = db.ref('/items');
        itemsRef.on('value', snapshot => {

            let data = snapshot.val();
            let items = Object.values(data);
            console.log("canciones", items)
            this.setState({ items });
        })

    } catch (e) {
        // error reading value
        console.log("error en list constactos", e)

    }
}

async componentDidMount() {
    this.getData()
}

render() {
 
    return (
      
      <View style={styles.itemsList}>
        {this.props.search_mode==true?(
        <View >
          <TextInput
          style={{ height: 40, backgroundColor:'#e3e3e3', paddingLeft:10 }}
          onChangeText={search =>this.setState({search})}
          value={this.state.search}
          placeholder='Escribe aqui para buscar...'
        />
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity
            style={
              this.state.typeOfSearch == 'temas'
                  ? styles.buttonPress
                  : styles.btnfilter
            }
            onPress={() =>this.setState({typeOfSearch:"temas"})}
            >
              <Text style={styles.txtFilter}>temas</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={
              this.state.typeOfSearch == 'notas'
                  ? styles.buttonPress
                  : styles.btnfilter
            }
            onPress={() =>this.setState({typeOfSearch:"notas"})}
            >
              <Text style={styles.txtFilter}>notas</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={
              this.state.typeOfSearch == 'coros'
                  ? styles.buttonPress
                  : styles.btnfilter
            }
            onPress={() =>this.setState({typeOfSearch:"coros"})}
            >
              <Text style={styles.txtFilter}>coros</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={
              this.state.typeOfSearch == 'name'
                  ? styles.buttonPress
                  : styles.btnfilter
            }
            onPress={() =>this.setState({typeOfSearch:"name"})}
            >
              <Text style={styles.txtFilter}>titulo</Text>
            </TouchableOpacity>
          </View>
        </View>
        ):(<View>
        </View>)}
       
          <FlatList
          data={this.state.items}
          enableEmptySections={true}
          renderItem={({item,index}) => (
                
                  <TouchableOpacity 
                  style={styles.songs}
                  onPress={() => this.props.navigation.navigate('ContentItem',{item})}>
                  <View style={{paddingLeft:15, flexDirection:'row', alignItems:'center'}}>
                  {/* <Text style={{fontSize:18,paddingRight:10}}>{index+1}</Text> */}
                    <View style={{width:'15%'}}>
                    <Icon 
                        name='music'
                        color='#000'
                        size={30}
                        style={{paddingRight:15}}
                      />
                    </View>
                    <View style={{width:'60%'}}>
                      <Text style={{fontSize:18}}>{item.name}</Text>
                      <Text style={{fontSize:16}}>{item.category}</Text>
                    </View>
                    <View style={{width:'10%',justifyContent:'center'}}>
                      <Icon 
                        name='eye'
                        color='#000'
                        size={20}
                        style={{textAlign:'center'}}
                      />
                      <Text style={{fontSize:12,textAlign:'center'}}>{item.rating}</Text>
                    </View>
                    <View style={{width:'10%',justifyContent:'center'}}>
                      <IconLike 
                        name='like2'
                        color='#000'
                        size={20}
                        style={{textAlign:'center'}}
                      />
                      <Text style={{fontSize:12,textAlign:'center'}}>{item.rating}</Text>
                    </View>
        
                  </View>
                  
                  </TouchableOpacity>   
              
          )}
     
          /> 
      </View>
    );
  }
}
export default withNavigation(SelectSongs);

const styles = StyleSheet.create ({
    container:{
       flex:1,
       width: '100%',
       backgroundColor: '#d8fff4',
       
     
    },
   TouchableOpacity: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#e3e3e3',
      height:80,
      alignItems:'flex-start'
   },

   buttonPress:{
    width:'20%',
    height:30,
    margin:10,
    borderColor:'#3e64ef',
    borderWidth:1,
    borderRadius:10,
    
    justifyContent:'center',
    alignItems:'center'
   },
   songs: {
      width:'100%',
      height:80,
      borderBottomColor:'#000',
      borderBottomWidth:1,
      justifyContent:'center'
   },
   btnfilter:{
    width:'20%',
    height:30,
    margin:10,
    borderRadius:20,
   
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
    
   },
   txtFilter:{
    color:'#000',
   }
})