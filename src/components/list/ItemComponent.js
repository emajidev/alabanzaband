import React, { Component } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
export default class ItemComponent extends Component {
  constructor(props){
    super(props)
  };
  static propTypes = {
    items: PropTypes.array.isRequired
  };render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <TouchableOpacity
            key = {index}
            style = {styles.TouchableOpacity}
            onPress = {() =>  console.log(this.props.navigation)
         }>
                
              <Text style={styles.itemtext}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}const styles = StyleSheet.create({
  itemsList: {
    
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  TouchableOpacity: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#d8ff41',
    alignItems:'center'
 },
});