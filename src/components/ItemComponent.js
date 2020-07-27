import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator, 
  FlatList, 
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import IconLike from 'react-native-vector-icons/AntDesign';

class ItemComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      songsItems: this.props.items,
      search: '',
      typeOfSearch: 'name',
      search_mod: this.props.search_mode

    }

  }
  componentWillReceiveProps(e) {
    this.setState({songsItems:e.items,search_mod:e.search_mod})
    //console.log("componentWillReceiveProps is triggered", e.infoTask)
}
  componentWillUnmount() {
    this.setState({ search_mode: false })
  }
  componentDidMount(){
    
  }


  render() {
    /*  filter search coro  */
    if (this.state.songsItems == '' && this.props.mode == 'listSongs') {
      return (
        <View style={{margin:50,}}>
          <Text style={{textAlign:'center',fontSize:20,color: '#d3d3d3',margin:10}}>" ¡Lo sentimos!, no se encontraron resultados ;( "</Text>
        </View>
      )
    }
    return (

      <View >
        <FlatList
          data={this.state.songsItems }
          enableEmptySections={true}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              style={styles.songs}
              onPress={() => this.props.navigation.navigate('ContentItem', { item })}>
              <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                {/* <Text style={{fontSize:18,paddingRight:10}}>{index+1}</Text> */}
                <View style={{ width: '15%' }}>
                  <Icon
                    name='music'
                    color='#717070'
                    size={30}
                    style={{ paddingRight: 15 }}
                  />
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={{ fontSize: 18, color: '#717070' }}>{item.name}</Text>
                  <Text style={{ fontSize: 16, color: '#A0A0A0' }}>{item.category}</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Icon
                    name='eye'
                    color='#717070'
                    size={20}
                    style={{ textAlign: 'center' }}
                  />
                  <Text style={{ fontSize: 12, textAlign: 'center', color: '#A0A0A0' }}>{item.visits}</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <IconLike
                    name='like2'
                    color='#717070'
                    size={20}
                    style={{ textAlign: 'center' }}
                  />
                  <Text style={{ fontSize: 12, textAlign: 'center', color: '#A0A0A0' }}>{item.likes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
export default withNavigation(ItemComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d8fff4',


  },
  TouchableOpacity: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#e3e3e3',
    height: 80,
    alignItems: 'flex-start'
  },

  buttonPress: {
    width: '20%',
    height: 30,
    margin: 10,
    borderColor: '#3e64ef',
    borderWidth: 1,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center'
  },
  songs: {
    width: '100%',
    height: 80,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  btnfilter: {
    width: '20%',
    height: 30,
    margin: 10,
    borderRadius: 20,

    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  txtFilter: {
    color: '#000',
  }
})