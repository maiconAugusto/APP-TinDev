import React, { Component, useState, useEffect } from 'react'
import { View, Image, StyleSheet,  TouchableOpacity, TextInput, Text, AsyncStorage } from 'react-native'
import axios from 'axios'
import Logo from '../assets/logo.png'


function Login({navigation}){
        const [ user, setUser ] = useState('')
        
        /*useEffect(()=>{
            AsyncStorage.getItem('user')
                .then((user)=>{
                    if(user){
                        navigation.navigate('Main',user)
                    }
                })
        },[])*/
        
        async function handlerLogin(){   
        //                                        { IP local  }
        const response = await axios.post('http://192.168.1.37:8880/devs/',{
            username: user
        })
        const { _id } = response.data.checkUser
        console.log(_id)
        await AsyncStorage.setItem('user',_id)
        navigation.navigate('Main',{user : _id})
        }
        return(
                <View style={style.container}>
                    <Image style={style.img} source={Logo}/>
                    <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={style.input}
                    placeholder = 'INSIRA SEU USUÁRIO DO GITHUB'
                    placeholderTextColor = '#DF4723'
                    value={user}
                    onChangeText={setUser}
                    />
                    <TouchableOpacity onPress={()=> handlerLogin()}  style={style.button}>
                        <Text style={style.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            )
}
export default Login

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5F5F5'
    },
    img:{
        marginBottom: 20
    },
    input:{
        textAlign: 'center',
        backgroundColor: 'white',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius :4,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#DDD',
        borderWidth: 0.5,
        alignSelf:'stretch',
        borderRadius: 4
    },
    button:{
        backgroundColor: '#DF4723',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        alignSelf:'stretch',
        borderRadius: 4
    },
    buttonText:{
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        textAlign:'center',
        fontSize: 16
        
    }
})
