import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
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


  render() {
    /*  filter search coro  */
    if (this.state.songsItems == '') {
      return (
        <View>
          <Text>Cargando canciones</Text>
        </View>
      )
    } else {
      if (this.state.typeOfSearch == 'temas') {
        /*  console.log("category") */
        let coros = this.props.items.filter(
          (item) => {
            return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase()) !== -1;
          }
        );
        var filtered = coros.filter(
          (item) => {
            /* console.log(item) */
            /* console.log("temas") */
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );

      }
      if (this.state.typeOfSearch == 'notas') {
        /* console.log("category") */
        let coros = this.props.items.filter(
          (item) => {
            return item.notes.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase()) !== -1;
          }
        );
        var filtered = coros.filter(
          (item) => {
            /* console.log(item) */
            /*  console.log("notas") */
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );

      }
      if (this.state.typeOfSearch == 'coros') {
        /*  console.log("category") */
        let coros = this.props.items.filter(
          (item) => {
            return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase()) !== -1;
          }
        );
        var filtered = coros.filter(
          (item) => {
            /* console.log(item) */
            /* console.log("coros") */
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );

      }
      if (this.state.typeOfSearch == 'titulo') {
        /* console.log("category") */
        let coros = this.props.items.filter(
          (item) => {
            return item.category.toLowerCase().indexOf(this.state.typeOfSearch.toLowerCase()) !== -1;
          }
        );
        var filtered = coros.filter(
          (item) => {
            /* console.log(item) */
            /* console.log("titulo") */
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );

      }
      if (this.state.typeOfSearch == 'name') {
        var filtered = this.props.items.filter(
          (item) => {
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );
      }

    }

    return (

      <View style={styles.itemsList}>
        {this.props.search_mode == true ? (
          <View >
            <TextInput
              style={{ height: 40, backgroundColor: '#e3e3e3', paddingLeft: 10 }}
              onChangeText={search => this.setState({ search })}
              value={this.state.search}
              placeholder='Escribe aqui para buscar...'
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={
                  this.state.typeOfSearch == 'temas'
                    ? styles.buttonPress
                    : styles.btnfilter
                }
                onPress={() => this.setState({ typeOfSearch: "temas" })}
              >
                <Text style={styles.txtFilter}>temas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.typeOfSearch == 'notas'
                    ? styles.buttonPress
                    : styles.btnfilter
                }
                onPress={() => this.setState({ typeOfSearch: "notas" })}
              >
                <Text style={styles.txtFilter}>notas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.typeOfSearch == 'coros'
                    ? styles.buttonPress
                    : styles.btnfilter
                }
                onPress={() => this.setState({ typeOfSearch: "coros" })}
              >
                <Text style={styles.txtFilter}>coros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.typeOfSearch == 'name'
                    ? styles.buttonPress
                    : styles.btnfilter
                }
                onPress={() => this.setState({ typeOfSearch: "name" })}
              >
                <Text style={styles.txtFilter}>titulo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (<View>
        </View>)}

        <FlatList
          data={filtered}
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