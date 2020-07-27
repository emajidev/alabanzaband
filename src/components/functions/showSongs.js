import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ShowSongsComponent from "./ShowSongsComponent";

export function showSongs(selected, songsDb, mod) {
    console.log("showSongs", selected, songsDb)
    var songs = []
    if (selected.length > 0) {
        selected.map((id, index) => {
            let song = songsDb.find(item => item.id === id)
            songs.push(song)
        })

    }
    return (
        <View style={{ flexDirection: 'row', margin: 10 }}>
            {mod == 'mod1' ? (
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={songs}
                    contentContainerStyle={styles.cardcontainer}
                    enableEmptySections={true}
                    renderItem={({ item, index }) => (
                        <View style={styles.selectSong}>
                            <Text style={{ color: '#50e2c3ff' }}>hola{item.name}</Text>
                        </View>
                    )}
                />
            ) : (
                <ShowSongsComponent songs={songs} />
                )

            }

        </View>
    )
}

const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 0,
    },
    selectSong: {
        color: '#50e2c3ff',
        height: 40,
        margin: 8,
        borderColor: '#50e2c3ff',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },

})
