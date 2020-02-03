import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {Container,Songs, Header} from './conext/themes/styled'

import {ThemeContext, themes} from './conext/theme-context';
import {ThemeProvider} from 'styled-components/native'

class ItemComponent extends React.Component{
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  state = {
    search:'',
    typeOfSearch:'name',
    
  };
 
render() {
    /*  filter search coro  */
    if (this.state.typeOfSearch == 'temas'){
     /*  console.log("category") */
      let coros = this.props.items.filter(
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
      let coros = this.props.items.filter(
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
      let coros = this.props.items.filter(
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
      let coros = this.props.items.filter(
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
    var filtered = this.props.items.filter(
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
       
        {filtered.map((item, index) => {
          return (
            <View  key={index}>
            <ThemeContext.Consumer>
               {data =>
             <ThemeProvider theme={data}>
                <Songs
                 
                  onPress={() => this.props.navigation.navigate('ContentItem',{item})}
                  >
                  <Text style={styles.itemtext}>{item.name}</Text>
                </Songs>
             </ThemeProvider>
          }
            </ThemeContext.Consumer>
           </View>
         
    
          );
        })}
    
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