import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,StatusBar,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'
import MusicIcon from 'react-native-vector-icons/Entypo'
import DatePicker from 'react-native-datepicker'

class AddNotification extends React.Component {
   constructor(props){
      super(props)
      this.state = {date:"",
      dateCurrent:''}
    }      
  
      state = {
         coment: ''
      };
   
   handleChange = e => {
         this.setState({
         coment: e.nativeEvent.text
         });
      };
      handleSubmit = () => {
         addItem(this.state.coment);
         alert('Notification saved successfully');
      };

      componentDidMount() {
        
         var date = new Date().getDate(); //Current Date
         var month = new Date().getMonth() + 1; //Current Month
         var year = new Date().getFullYear(); //Current Year
         var hours = new Date().getHours(); //Current Hours
         var min = new Date().getMinutes(); //Current Minutes
         var sec = new Date().getSeconds(); //Current Seconds
         this.setState({
           //Setting the value of the date time
           dateCurrent:
           date + '/' + month + '/' + year + ' ',
         });
       }
    render() {
      const item = this.props.navigation.state.params.item;
      const ItemNotification = {
         item,
         coment:this.state.coment,
         date:this.state.date
      }
      console.log("item notifiction",JSON.stringify(ItemNotification))
       return (
    
            <View style={styles.container}>
            <Text style={styles.title}>Crear notificación</Text>
            <View style={{flexDirection:'row'}}>
                  <View style={{width:'20%', alignContent:'center',justifyContent:'center'}}>
                     <MusicIcon 
                     name='music'
                     color='#5f25fe'
                     size={80}
                     />
                  </View>
                
                  <View style={{width:'80%'}}>
                     <Text style={styles.song}>Canción: <Text style={{fontWeight:'bold'}}>{item.name}</Text> </Text>
                     
                  </View>
            </View>
            <TextInput style={styles.itemInput} onChange={this.handleChange} placeholder='Añadir comentario' />
            <Text>{this.state.date}</Text>
            <TouchableHighlight
               style={styles.btn_primary_light}
               underlayColor="#000"
               onPress={() => this.props.navigation.navigate('SendNotification',{ItemNotification})}
            >
               <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableHighlight>
            {/*   seleccionar fecha */}
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="datetime"
              placeholder="Selecciona una fecha"
              format="DD-MM-YYYY HH:mm"
              minDate={this.state.dateCurrent}
              maxDate="01-06-2030"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            </View>
          
       
       )
    }
 }
 export default withNavigation(AddNotification)

 const styles = StyleSheet.create ({
   main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    song:{fontSize: 25,},
    itemInput: {
      width:'95%',
      height: 50,
      padding: 10,
      marginRight: 5,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      marginTop:20
      
    },
    buttonText: {
      fontSize: 18,
      color: '#000',
      alignSelf: 'center'
    },
  
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
 })