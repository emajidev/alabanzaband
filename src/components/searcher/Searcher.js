import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';

export default class Searcher extends Component {
  constructor(props) {
    super(props);
    this.passSongs = this.passSongs.bind(this)
    this.state = {
      data: this.props.songsDb,
      type: 'titulo',
      search: '',
      typeOfSearch: 'name',
      color: ''
    }
  }
  componentDidMount() {
    this.searchFilterFunction('')
  }
  passSongs(newData){
    this.props.returnSongs(newData)
  }
  searchFilterFunction = text => {
    let type = this.state.type.toLowerCase()
    let textData = text.toUpperCase();
    let element
    const newData = this.props.songsDb.filter(item => {
      switch (type) {
        case 'titulo':
          element = item.name.toUpperCase()
          break;
        case 'nota musical':
          element = item.note.toUpperCase()
          break;
        case 'clasificacion':
          element = item.category.toUpperCase()
          break;
      }
      return element.indexOf(textData) > -1;


    });

    this.setState({ data: newData });
    this.passSongs(newData)
  };
  render() {
    return (
      <View style={{ marginLeft: 15, marginRight: 15 }} >

        <Item rounded >
          <Input placeholder='Buscar'
            placeholderTextColor={'#d3d3d3'}
            style={{ marginLeft: 10, color: '#959595' }}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
        </Item>
        <FlatList
          style={{ width: '100%', marginLeft: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={['Titulo', 'Nota musical', 'Clasificacion']}
          enableEmptySections={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginRight: 20, marginTop: 10, }}
              onPress={() => { this.setState({ type: item }) }}
            >
              {item.toLowerCase() == this.state.type.toLowerCase() ? (
                <Text style={styles.select}>{item}</Text>

              ) : (
                  <Text style={{ textAlign: 'center', color: '#959595' }}>{item}</Text>
                )
              }
            </TouchableOpacity>
          )}
        />
      </View>



    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  select: {
    textAlign: 'center', color: '#4f4', borderBottomWidth: 1, borderBottomColor: '#4f4'
  }

})
