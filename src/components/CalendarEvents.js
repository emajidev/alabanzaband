import React from "react";
import moment from "moment";
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";
import CalendarTimeline from "./calendar/CalendarTimeline";

export default class CalendarEvents extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarTimeline />

      </View>
    )
  }
}