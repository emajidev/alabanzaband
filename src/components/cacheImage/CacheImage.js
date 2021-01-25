import React from "react";
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Spinner, } from "native-base";
import { withGlobalContext } from '../UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CacheImage extends React.Component {
    state = {
        source: null,
        refresh: false,
        uri: null
    }
    async cache_img() {
        let uri = this.props.uri
        if (uri != null) {
            const email = this.props.global.account
            const name = shorthash.unique(uri)
            const path = FileSystem.cacheDirectory + name
            const image = await FileSystem.getInfoAsync(path);
            if (image.exists) {
                this.setState({
                    source: {
                        uri: image.uri
                    }
                })
                return;
            } else {
                const newImage = await FileSystem.downloadAsync(uri, path)
                    .then(({ uri }) => {
                        this.setState({
                            source: { uri: uri }
                        })
                        if (uri != null) {
                            this.pushPersistense(uri)
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }
    async pushPersistense(uri) {
        await AsyncStorage.setItem("avatar", uri)
         
    }
    async getPersistense(uri) {
        let daaPersist = await AsyncStorage.getItem("avatar")
            .then((uri) => {
                if (uri != null) {
                    this.setState({
                        source: { uri: uri }
                    })
                }
            })
    }

    componentDidMount() {
        if (this.props.uri == null) {
            this.getPersistense()
        } else { this.cache_img() }


    }

    render() {
/*         "https://firebasestorage.googleapis.com/v0/b/alabanzaband.appspot.com/o/uploads%2Fphotof1d948141c3c7b78ff5d2fab5c0123ff.jpg?alt=media&token=ac5104b4-5250-4e6a-b126-bdb395aa35c8"
 */        const uri = this.props.uri

        return (
            <View>
                {
                    this.state.source != null ? (
                        <Image style={{ width: 150, height: 150, borderRadius: 400 }} source={this.state.source} />
                    ) : (
                            <View style={{ width: 150, height: 150, borderRadius: 400, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', opacity: 1 }} >
                                {/*  <Spinner color="rgba(80,227,194,1)" /> */}
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