import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class ModalComponent extends React.Component {
    handleModalChild = () => {
        this.props.handleModal(false);            
    }
    render() {
        const advice = this.props.advice;
        const comment = this.props.comment
        return (
            <View style={styles.modalBackground}>
                <View style={{ backgroundColor: '#fff', padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ fontSize: 16 }}>{advice}</Text>
                    <Text style={{ marginTop: 10 }}>{comment}</Text>
                    <TouchableOpacity
                        style={{ marginTop: 25, }}
                        onPress={() => {
                            this.handleModalChild()
                        }}
                    >
                        <Text style={{ color: '#50e2c3ff', fontSize: 16, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#50e2c3ff' }}>Entiendo</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create ({
    modalBackground:{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
        left: 0,
        right: 0,
        backgroundColor: "#00000080",
    },

})