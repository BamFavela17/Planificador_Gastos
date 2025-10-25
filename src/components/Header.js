import React from "react";
import { Text, View, StyleSheet } from 'react-native'

const Header = () => {
    return(
        <View style={style.header}>
            <Text style={style.texto}> Planificador de Gastos</Text>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        backgroundColor: '#3B82F6',
        paddingTop: 30,
    },
    texto: {
        textAlign: 'center',
        fontSize: 40,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default Header;