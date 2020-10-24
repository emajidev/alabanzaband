import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { View,Text, TextInput, StyleSheet } from 'react-native'
import filter from 'js-filter';

class FilterSearcher extends Component {
  constructor(props) {
    super(props);
  }
  state={
    searchName="";
  }
  componentDidMount(){

arrayFilter.filter( data, {'categoryName': 'free', 'heigth': 100 } );

  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.searchName}
          onChangeText={(text)=>this.setState(searchName:text)}
    placeholder={'Buscar'}
      placeholderTextColor="#202020"
                underlineColorAndroid='rgba(0,0,0,0)'

        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  }
})

export default FilterSearcher;
