import React from 'react'
import { View, StyleSheet, Platform, Image} from 'react-native'
import Logo from '../assets/logo.png'

const Header = ()=>{
    return(
        <View  style={style.container}>
            <Image source={Logo}/>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        marginTop: 10,
        alignItems: 'center'
    }
})
export default Header