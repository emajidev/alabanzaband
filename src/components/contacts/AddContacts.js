import React, { Component } from 'react';
import { Container, Header, Title,Text, Button, Left, Right, Body, Icon, Label, Spinner, Content, Form, Item, Input } from 'native-base';
import { Alert,StatusBar,StyleSheet ,View} from 'react-native'

import UserContext from "../UserContext";
import getTheme from "../../../native-base-theme/components";
import { db } from '../firebase.js';
import { withGlobalContext } from '../UserContext';


 
class AddContacts extends Component {
   
   constructor(props) {
      super(props);
      this.state = {
         userName:'',
         name:'',
         phone:'',
         band:'',
         next:false,
         uploadEvent: false

      };

   }

   handleSubmit = () => {
      addItem(this.state.userName , this.state.name,this.state.phone,this.state.band);
      alert('Notification saved successfully');
     
   };
   validateEmail = email => {
      var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    
   };

 addItem = async (userName,name,phoneContact,band) => {
   console.log("cuenta",this.props.global.account)
   let account = this.props.global.account
   db.ref('/users/user'+ account +'/'+'contacts/').push({
      userName:userName,
      name: name,
      phoneContact:phoneContact,
      band:band
    })

 };
   handleNext(email){
      if (this.validateEmail(email)) {
         this.setState({ uploadEvent: true })
         setTimeout(() => {
           let pushContact = this.addItem(this.state.userName , this.state.name,this.state.phone,this.state.band)
           .then((resolve) => {
            this.setState({ uploadEvent: false })
            resolve(this.props.navigation.goBack())
          })
         }, 200);
      

      }else{
         Alert.alert("Formato de correo invalido")

      }
   }

   render() {
      console.log("props",this.props.global)
      let name = this.state.name;
      let userName = this.state.userName;
      let next = false;
      if (name.length != 0 && userName.length != 0) {
         next = true;
       }
      return (
         
         <Container>
          {this.state.uploadEvent ?
          (<View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 2,
              left: 0,
              right: 0,
              backgroundColor: "#ffffffcd"
            }}
          >
            <Spinner color="rgba(80,227,194,1)" />
          </View>) : (console.log("en curso"))
        }
            <Header >
               <Left>
                  <Button transparent
                  onPress={() => this.props.navigation.goBack()}
                  >
                     <Icon name='ios-arrow-back' />
                  </Button>
               </Left>
               <Body>
                  <Title>Agregar amigo</Title>
               </Body>
               <Right />
            </Header>
            <Content>
               <Form>
                  <Item floatingLabel>
                  <Label>Nombre</Label>
                     <Input   
                        style={{ marginTop: 15}}
                        onChangeText={(name) => {
                           this.setState({ name })}
                        }
                        value={this.state.name}
                     />
                  </Item>
                  <Item floatingLabel>
                  <Label>Correo</Label>
                     <Input 
                        style={{ marginTop: 15}}
                        placeholder="ingresa un correo... "
                        onChangeText={(userName) => {
                           this.setState({ userName })}
                        }
                        value={this.state.userName}
                     />
                  </Item>
                  <Item stackedLabel last style={{justifyContent:'center'}}>
                  <Text style={{fontSize:20,color:"#999"}}>Datos extras</Text>
                  </Item>
                  <Item floatingLabel>
                  <Label>telefono</Label>
                     <Input 
                        style={{ marginTop: 15}}
                        onChangeText={(phone) => {
                           this.setState({ phone })}
                        }
                        value={this.state.phone}
                     />
                  </Item>
                  <Item floatingLabel>
                  <Label>Banda o grupo musical</Label>

                     <Input 
                        style={{ marginTop: 15}}
 
                        onChangeText={(band) => {
                           this.setState({ band })}
                        }
                        value={this.state.band}
                     />
                  </Item>
               </Form>
               
               <Text style={{ textAlign:'center',padding:40,color: "rgba(80,227,194,1)",fontSize:16}}>Alabanzaband respalda tus contactos en la nube
               para tenerlos a disposicion desde cualquier dispositivo movil...</Text>
               <Button
               transparent
          style={styles.button}
          onPress={() => {
            next == true ? this.handleNext(this.state.userName) : console.log("falso");
          }}
        >
          <Icon 
          style={next == false ? styles.inactive : styles.active}
           name="md-checkmark-circle-outline" />
        </Button>
            </Content>
         </Container>
      );
   }
}
export default withGlobalContext(AddContacts);

const styles = StyleSheet.create({
   button: {
      elevation: 0,
      marginTop: 10,
      width: 100,
      height: 80,
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 300,
      alignItems: "center",
    },
   inactive: {
     fontSize:60,
     color: "#d5d5d5"
   },
   active: {
     elevation: 0,
     fontSize:60,
     color: "rgba(80,227,194,1)"
   }
 });
 