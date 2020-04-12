import React from 'react';
import { Text, View, AsyncStorage, TouchableOpacity, StyleSheet, FlatList, ScrollView, StatusBar, TextInput, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import { withGlobalContext } from './UserContext';
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
import { db } from './firebase.js';

class Option extends React.Component {
    state = {
        selectThis: false
    }
    render() {
        const { name, email } = this.props;

        console.log("select =>", this.state.selectThis)
        return (
            <Button
                onPress={() => {
                    this.props.onPress()
                    this.setState({ selectThis: !this.state.selectThis })
                }}
                style={this.state.selectThis == true ? (styles.select) : (styles.unselect)}
            >
                <Content>
                    <Text style={styles.textContact}>{name}</Text>
                    <Text style={styles.textContact}>{email}</Text>
                </Content>
                {this.state.selectThis ? (
                    <Icon
                        style={{
                            color: "rgb(255, 209, 41)",
                            fontSize: 30,
                            textAlign: "center",
                            marginTop: 10
                        }}
                        name="ios-checkmark"
                    />
                ) : (console.log("unselect"))

                }
            </Button>
        )
    }
}
class SelectFriends extends React.Component {
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


        let account = this.props.global.account
        console.log("cuenta2", account)
        try {
            let itemsRef = db.ref('/users/user' + account + '/contacts');
            itemsRef.on('value', snapshot => {

                let data = snapshot.val();
                let items = Object.values(data);
                console.log("contactos", items)
                this.setState({ items });
            })

        } catch (e) {
            // error reading value
            console.log("error en list constactos", e)

        }
    }

    componentDidMount() {
        let account = this.props.global.account
        console.log("cuenta1", account)
        this.getData(account)
    }
    setFriends(list) {
        console.log("list amigos",list)
        this.props.global.setFriends(list)
    }
    render() {
        /*   console.log(this.state.items) */

        return (

            <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
               <Button
                            trasnparent
                            style={{ backgroundColor: "#fff", elevation: 0 }}
                            onPress={() => this.setFriends(this.state.selected)}
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
                            email={item.userName}
                            key={index}
                            onPress={() => this.isSelected(item.userName)}
                            selected={this.toggleStyles(item.email)}
                        />

                    ))}
                </View>
            </View>
        );
    }
}


export default withGlobalContext(SelectFriends)

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
})
/*
 <TouchableOpacity
 key = {index}
 style = {styles.TouchableOpacity}
 onPress={() => alert(item.name)}
>
<View style={styles.boxContact} key={index}>

<Icon
name='md-contact'
color='#5f25fe'
size={40}
/>
<Text style={styles.itemtext} >{item.name} </Text>

</View>
</TouchableOpacity> */

/* <ItemContact key={index} item={item.name}/> */