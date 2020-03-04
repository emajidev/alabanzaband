import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,StatusBar,TextInput,TouchableHighlight, Alert} from 'react-native'
import { withNavigation } from 'react-navigation'
import MusicIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-datepicker'

class AddNotification extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         date:'',
         dateCurrent:'',
         timestamp:'',
         coment:'' 
      }
   }      
  

   handleChange = e => {
      this.setState({
      coment: e.nativeEvent.text,

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
      let inputTIme = this.state.date
      const dateParams = inputTIme.split(/[\s-:]/)
      dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString()
      let newformatUTC = [dateParams[2],dateParams[1],dateParams[0],dateParams[3],dateParams[4]]
      let dateFormat = new Date(Date.UTC(...newformatUTC))
      let timestamp = (dateFormat.getTime())
      console.log("fechaaaa en milisegundos",timestamp)
    
      const item = this.props.navigation.state.params.item;
      const ItemNotification = {
         item,
         coment:this.state.coment,
         date:timestamp
      }
      
      console.log("item notifiction",JSON.stringify(ItemNotification))
       return (
    
            <View style={styles.container}>
            <Text style={{fontSize:20,marginBottom:10}}>Nuevo Evento</Text>
            <Text style={styles.comentarie}>Comparte con tus colegas eventos para ensayar o realizar toques entre bandas...</Text>
            <View style={{flexDirection:'row'}}>
                  <View style={{width:'20%', alignContent:'center',justifyContent:'center'}}>
                     <MusicIcon 
                     name='bookmark-music'
                     color='#000'
                     size={60}
                     />
                  </View>
                
                  <View style={{width:'80%'}}>
                     <Text style={styles.title}>Titulo: <Text style={{fontWeight:'bold'}}>{item.name}</Text> </Text>
                     <Text style={styles.subtitle}>Categoria:  <Text style={{fontWeight:'bold'}}>{item.category}</Text></Text>
                  </View>
            </View>
            
            <TextInput 
            maxLength = {90}
            multiline = {true}
            style={styles.itemInput} 
            onChange={this.handleChange} 
            placeholder='Añadir comentario' 
            />
            <View style={{width:'100%',justifyContent:'flex-end',paddingRight:20,marginTop:10}}>
            <Text style={{textAlign:'right'}}>
               {this.state.coment.length}/90
            </Text>
            </View>
            <View style={{padding:50}}>
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
                  width:100,
                  height:100
                  
                },
                dateInput: {
                  position: 'absolute',
                  top:50,
                  borderColor:0,
                  width:200,
                  height:100
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            </View>
            <Text>{this.state.date}</Text>

            <View>

            
            <TouchableHighlight
               style={styles.btn_primary_light}
               underlayColor="#000"
               onPress={() =>{
                  if(this.state.coment==''|| this.state.date ==''){
                     Alert.alert("Hay campos vacios")
                  }else{
                     this.props.navigation.navigate('SendNotification',{ItemNotification})
                  }
                  
               }}
            >
               <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableHighlight>
            </View>
            </View>
          
       
       )
    }
 }
 export default withNavigation(AddNotification)

 const styles = StyleSheet.create ({
   title:{
      fontSize:20,
   },
   subtitle:{
     fontSize:15,
   },
    comentarie: {
      marginBottom: 20,
      fontSize: 15,
      textAlign: 'center',
      color:"#999"
    },
    song:{fontSize: 20,},
    itemInput: {
      width:'95%',
      height: 150,
      padding: 10,
      marginRight: 5,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      marginTop:20,
      textAlignVertical:'top'
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
        marginTop:15,

        
      
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