import React, { Component } from 'react';
import { View, FlatList,StyleSheet } from 'react-native';
import {profile_Information} from '../functions/functionsFirebase'
import * as firebase from "firebase/app";
import { db } from "../firebase";
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Title, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Base64 from "Base64";
export default class YourProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile:{},
      uriPhoto:""
    };
  }

  async componentDidMount(){
    this.profile_Information()
    this.photoProfile()
  }
 
  async profile_Information() {
    try {
      let yourEmail  = await firebase.auth().currentUser.email;
      let convertMd5 = await Base64.btoa(yourEmail);
      let ref = await db.ref("/users/user" + convertMd5 + "/profile/");
      await ref.on("value", (snapshot) => {
        let data = snapshot.val();
        if (data !== null) {
          this.setState({profile:data});
          console.log("dataProfile",data)

        }
      });
    } catch (error) {
      console.log("error remove event", error);
    }
  }

  photoProfile() {
    let email =  firebase.auth().currentUser.email;
    let convertMd5 = Base64.btoa(email);
    firebase
      .storage()
      .ref()
      .child("uploads/photo" + convertMd5 + ".jpg")
      .getDownloadURL()
      .then((url) => {
        console.log("URL",url)
        this.setState({ uriPhoto: url });
      })
      .catch((e) => {
        console.log("no hay foto de perfil");
      });
  }
  render() {
    const {
      name,
      lastName,
      birthDate,
      contactPhone,
      ipucSite, 
      musicianLicense,
      typeOfLicense,
      musicalInstrument
    }=this.state.profile
    console.log("instruments",musicalInstrument)
    let uriPhoto = this.state.uriPhoto;
    return (
      <Container>
      <Content>
        <Card style={{flex: 0, elevation:0}}>
          <CardItem>
            <View >
              <View style={{display:"flex",alignItems:"center"}} >
                <Image source={{uri: uriPhoto}} style={{height: 100, width:100, borderRadius:200}}/>
              </View>
            </View>
            <Body style={{display:"flex",width:500, justifyContent:"center",padding:10}} >
                <Text style={styles.responsiveText}>{name}</Text>
                <Text style={styles.responsiveText}>{lastName}</Text>

                <Text note>{birthDate}</Text>
            </Body>
        
          </CardItem>
     
          <CardItem>
            <Body>
                  <Title>Informacion Personal</Title>
                  <Text>Telefono de contacto {contactPhone} </Text>
                  <Text>Sede Ipuc {ipucSite} </Text>
                  <Text>Licencia musical {typeOfLicense} </Text>
                  <FlatList
                    data={musicalInstrument}
                    renderItem={({item}) => (
                      <Text>
                        {item.name}
                      </Text>
                    )}
                  />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
      
    );
  }
}
const styles = StyleSheet.create({
  responsiveText: {
    fontSize:  RFValue(24, 580) ,
  },
})