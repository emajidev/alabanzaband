import React, { Component } from 'react'
import { Text, View, StatusBar,FlatList,TouchableOpacity } from 'react-native'
import { withNavigation } from "react-navigation";
import { Container, Header, Left, Body, Right, Title, Content, List, ListItem, Button } from 'native-base';
import Base64 from 'Base64';
import { formatToProcess, showFormatHumman } from "../functions/FormatDate"
import {showSongs} from '../functions/showSongs'
import { withGlobalContext } from '../UserContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class ViewerNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: ''
        }
    }
    componentDidMount() {
        console.log(this.props.navigation.state.params.infoEvent)
        this.setState({ event: this.props.navigation.state.params.infoEvent })
    }
    render() {
        const songsDb = this.props.global.songsDb;
        const event = this.props.navigation.state.params.infoEvent
        const director =event.director
        const dateStart = showFormatHumman(event.dateStart)
        const dateEnd = showFormatHumman(event.dateEnd)
        const note = event.note
        const songsSelected = event.songs
        console.log("vv", songsSelected)
        return (
            <Container>

                <Header >
                    <StatusBar
                        backgroundColor={this.state.event.colorTag}
                        barStyle="light-content"
                    />
                    <Left>
                    <Icon name="library-music" size={50} color={this.state.event.colorTag}/>
                    </Left>
                    <Body>
                        <Title style={{ color: this.state.event.colorTag, fontSize: 24 }}>{this.state.event.title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem>
                            <Content>
                                <Text style={{ color: '#959595', fontSize: 20 }}>Director: {director}</Text>
                                <Text style={{ color: '#959595', fontSize: 15 }}>Inicia: {dateStart}</Text>
                                <Text style={{ color: '#959595', fontSize: 15 }}>Termina:{dateEnd}</Text>
                                <Text style={{ color: '#959595', fontSize: 15 }}>{note}</Text>
                            </Content>
                        </ListItem>
                        <ListItem itemDivider style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18 }}>canciones</Text>
                        </ListItem>
                        {showSongs(songsSelected,songsDb,'mod2')}
                            
                    </List>
                </Content>
            </Container>
        )
    }
}
export default withGlobalContext(withNavigation(ViewerNotification))