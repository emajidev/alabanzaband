import React from "react";
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Spinner, } from "native-base";
import { withGlobalContext } from '../UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CacheImage extends React.Component {
    state = {
        uriPhoto: ""
    }
    
    componentDidMount() {
    
        this.photoProfile()

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
        const uri = this.props.uri
        return (
            <View>
                {
                    this.state.source != null ? (
                        <Image style={{ width: 150, height: 150, borderRadius: 400 }} source={this.state.uriPhoto} />
                    ) : (
                            <View style={{ width: 150, height: 150, borderRadius: 400, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', opacity: 1 }} >
                                <Icon
                                    name='user-alt'
                                    color='#717070'
                                    size={80}
                                />
                            </View>
                        )

                }

            </View>


        )
    }
}
export default withGlobalContext(CacheImage)
{/* <Image
style={{ width: 150, height: 150, borderRadius: 400 }}
source={{uri: source, cache: 'force-cache'}}
/> */}
/* {source != null ? (
    <Image
      style={{ width: 150, height: 150, borderRadius: 400 }}
      source={{uri: source, cache: 'force-cache'}}
    />
  ) : (
    <Image
      style={{ width: 150, height: 150, borderRadius: 400 }}
      source={require("./icon.jpg")}
    />
  )} */