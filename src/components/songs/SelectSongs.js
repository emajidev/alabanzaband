import React from 'react';
import { Text, View, AsyncStorage, TouchableOpacity, StyleSheet, FlatList, ScrollView, StatusBar, TextInput, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import { withGlobalContext } from '../UserContext';
import IconLike from 'react-native-vector-icons/AntDesign';
import IconSocial from 'react-native-vector-icons/Feather';

import {
    Container,
    Content,
    Card,
    Tabs,
    Tab,
    TabHeading,
    CardItem,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Badge,
    FooterTab,
    Footer,
    StyleProvider,
    Drawer
} from "native-base";
import { db } from '../firebase.js';

class Option extends React.Component {
    state = {
        selectThis: false
    }
    render() {
        const { name, category,visits,likes } = this.props;

        console.log("select =>", this.state.selectThis)
        return (

            <TouchableOpacity
                style={styles.songs}
                onPress={() => {
                    this.props.onPress()
                    this.setState({ selectThis: !this.state.selectThis })
                }}>
                <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Text style={{fontSize:18,paddingRight:10}}>{index+1}</Text> */}
                    <View style={{ width: '15%' }}>
                        <IconSocial
                            name='music'
                            color='#717070'
                            size={30}
                            style={{ paddingRight: 15 }}
                        />
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={{ fontSize: 18, color: '#717070' }}>{name}</Text>
                        <Text style={{ fontSize: 16, color: '#A0A0A0' }}>{category}</Text>

                    </View>
                    <View style={{ width: '10%', justifyContent: 'center' }}>
                        <Icon
                            name='eye'
                            color='#717070'
                            size={20}
                            style={{ textAlign: 'center' }}
                        />
                        <Text style={{ fontSize: 12, textAlign: 'center', color: '#A0A0A0' }}>{visits}</Text>
                    </View>
                    <View style={{ width: '10%', justifyContent: 'center' }}>
                        <IconLike
                            name='like2'
                            color='#717070'
                            size={20}
                            style={{ textAlign: 'center' }}
                        />
                        <Text style={{ fontSize: 12, textAlign: 'center', color: '#A0A0A0' }}>{likes}</Text>
                    </View>

                </View>

            </TouchableOpacity>   
           
        )
    }
}
class SelectSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: [],
            items: [],
        };

        this.isSelected = this.isSelected.bind(this);
    }

    toggleStyles(el, index) {
        const { selected } = this.state;
        console.log("sleccion", selected)
        return selected.indexOf(index) !== -1;
    }

    isSelected(i) {
        let { selected } = this.state;
        if (selected.indexOf(i) === -1) {
            selected.push(i);
        } else {
            selected = selected.filter(index => index !== i);
        }
        this.setState({ selected });

    }
    getData = async () => {
      
        try {
            let itemsRef = db.ref('/songs');
            itemsRef.on('value', snapshot => {

                let data = snapshot.val();
                let items = Object.values(data);
                this.setState({ items });
            })

        } catch (e) {
            // error reading value
            console.log("error en list constactos", e)

        }
    }

    componentDidMount() {
      this.getData()
    }
    setSongs(list) {
        console.log("list canciones", list)
        this.props.global.setSongs(list)
        console.log("subido", this.props.global.songs)
    }
    render() {
        /*   console.log(this.state.items) */

        return (

            <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
                <Button
                    trasnparent
                    style={{ backgroundColor: "#fff", elevation: 0 }}
                    onPress={() => {
                        console.log("enviar selecion",this.state.selected)
                        this.setSongs(this.state.selected)
                        }}
                >
                    <Icon
                        style={{ color: "#50e2c3ff", fontSize: 40 }}
                        name="md-checkmark"
                    />
                </Button>
                <View style={{ flexDirection: 'row', height: 50, marginBottom: 20, marginTop: 20 }}>

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.selected}
                        enableEmptySections={true}
                        renderItem={({ item, index }) => (
                            <Text style={styles.selectPhone}>{item}</Text>
                        )}

                    />
                </View>
                <View style={{ flex: 1 }}>
                    {this.state.items.map((item, index) => (
                        <Option
                            name={item.name}
                            category={item.category}
                            visits={item.visits}
                            likes={item.likes}
                            key={index}
                            onPress={() => this.isSelected(item.name)}
                            selected={this.toggleStyles(item.id)}
                        />

                    ))}
                </View>
            </View>
        );
    }
}


export default withGlobalContext(SelectSongs)

const styles = StyleSheet.create({

    itemtext: { fontSize: 20, marginLeft: 5 },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    textContact: { fontSize: 15, },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight + 15,



    },
    btn_primary_light: {

        borderColor: '#5f25fe',
        borderWidth: 2,
        borderRadius: 50,
        marginTop: 40,
        padding: 20,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',

    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },

    select: {
        width: '80%',
        height: 60,
        margin: 10,
        backgroundColor: "#b8ffc1",
        flexDirection: 'row',
        elevation: 0,
        padding: 10,
        borderRadius: 10
    },
    selectPhone: {
        color: '#3e64ef',
        height: 40,
        margin: 8,
        borderColor: '#3e64ef',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
    unselect: {
        width: '100%',
        height: 60,
        margin: 10,
        backgroundColor: "#d6f9ff",
        flexDirection: 'row',
        elevation: 0,
        padding: 10,
        borderRadius: 10
    },
    songs: {
        width:'100%',
        height:80,
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1,
        justifyContent:'center'
     },
})
