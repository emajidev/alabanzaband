import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput ,FlatList,  RefreshControl,
ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {Container,Songs, Header} from './conext/themes/styled'

import {ThemeContext, themes} from './conext/theme-context';
import {ThemeProvider} from 'styled-components/native'
import PouchDB from 'pouchdb-react-native'

class ItemComponent extends React.Component{

  constructor(props){
    super(props)
    this.song_DB = new PouchDB('songs')

    this.state={
      songsItems:[],
      refreshing: true,
      search:'',
      typeOfSearch:'name',
    }
    this.GetData();

  }
  componentWillMount(){
  }
  componentDidMount(){
    this.get_localdb("songs")
  }
  
  GetData = () => {
    //Service to get the data from the server to render

    return  this.get_localdb("songs")
      .then(responseJson => {
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: this.state.songsItems
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
 

  get_localdb=async(name)=>{

    try {
      var doc = await this.song_DB.get('songs');
    } catch (err) {
      console.log(err);
    }
    console.log("obtenindo datos en component",doc)
    this.setState({songsItems:doc})
  }
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    this.get_localdb("songs")

    //Call the Service to get the latest data
   
    

   
  }
render() {
    /*  filter search coro  */
  if(this.state.songsItems.data==undefined){
  return(
    <View>
      <Text>Cargando canciones</Text>
    </View>
  )
  }
    if (this.state.typeOfSearch == 'temas'){
     /*  console.log("category") */
      let coros = this.state.songsItems.data.filter(
        (item) => {
          return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase())!==-1;
        }
      );
      var filtered = coros.filter(
        (item) => {
          /* console.log(item) */
          /* console.log("temas") */
         return item.name.toLowerCase().indexOf(this.state.search.toLowerCase() )!==-1;
        }
      );  
      
    }
    if (this.state.typeOfSearch == 'notas'){
      /* console.log("category") */
      let coros = this.state.songsItems.data.filter(
        (item) => {
          return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase() )!==-1;
        }
      );
      var filtered = coros.filter(
        (item) => {
          /* console.log(item) */
         /*  console.log("notas") */
         return item.name.toLowerCase().indexOf(this.state.search.toLowerCase() )!==-1;
        }
      );  
      
    }
    if (this.state.typeOfSearch == 'coros'){
     /*  console.log("category") */
      let coros = this.state.songsItems.data.filter(
        (item) => {
          return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase() )!==-1;
        }
      );
      var filtered = coros.filter(
        (item) => {
          /* console.log(item) */
          /* console.log("coros") */
         return item.name.toLowerCase().indexOf(this.state.search.toLowerCase() )!==-1;
        }
      );  
      
    }
    if (this.state.typeOfSearch == 'titulo'){
      /* console.log("category") */
      let coros = this.state.songsItems.data.filter(
        (item) => {
          return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase() )!==-1;
        }
      );
      var filtered = coros.filter(
        (item) => {
          /* console.log(item) */
          /* console.log("titulo") */
         return item.name.toLowerCase().indexOf(this.state.search.toLowerCase() )!==-1;
        }
      );  
      
    }
    if (this.state.typeOfSearch == 'name'){
    var filtered = this.state.songsItems.data.filter(
        (item) => {
         return item.name.toLowerCase().indexOf(this.state.search.toLowerCase() )!==-1;
        }
      );
      }
  
    return (
      
      <View style={styles.itemsList}>

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
    
          <FlatList
          data={filtered}
          enableEmptySections={true}
          renderItem={({item}) => (
            <ThemeContext.Consumer>
              {data =>
                <ThemeProvider theme={data}>
                  <Songs onPress={() => this.props.navigation.navigate('ContentItem',{item})}>
                  <Text style={styles.itemtext}>{item.name}</Text>
                  </Songs>   
                </ThemeProvider>
               }
            </ThemeContext.Consumer>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          /> 
      </View>
    );
  }
}
export default withNavigation(ItemComponent);

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
      color: '#4f2f3c',
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