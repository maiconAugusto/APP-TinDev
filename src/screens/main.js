import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import  Header  from '../components/Header';
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import Like from '../assets/like.png'
import Dislike from '../assets/dislike.png'
import io from 'socket.io-client'


function Main({navigation}){

    const id = navigation.getParam('user')
    const [ users, setUsers ] = useState([])
    const [ macthuser, macthSetSate ] = useState([])

    useEffect(()=>{
        async function handlerIndex(){
            const response = await axios.get('http://192.168.1.37:8880/devs',{
                headers:{
                    user: id
                }
            })
            setUsers(response.data)
        }
        handlerIndex()
    },[id])
    async function handleLike(element){
        console.log(element)
        const response = await axios.post(`http://192.168.1.37:8880/devs/${element}/likes`,null,{
            headers:{
                user: id
            }
        })
        console.log(response.data)
        setUsers(users.filter(user=> user._id != element))
    }
    async function handleDislike(element){
        console.log(element)
        const response = await axios.post(`http://192.168.1.37:8880/devs/${element}/deslike`,null,{
            headers:{
                user: id
            }
        })
        setUsers(users.filter(user=> user._id != element))
    }

    useEffect(()=>{
        const socket = io('http://localhost:8880',{
            query:{
                user: id
            }
        })
        socket.on('match',dev=>{
            macthSetSate(dev)
        })
        
    },[id])
    return(
        <View>
            <StatusBar backgroundColor='#DF4723'/>
                <Header style={style.header}/>
                <ScrollView style={{marginTop: 14}}>
                        { users.length === 0 ?  <View style={style.container_end}><Text style={style.end}> Acabou :(</Text></View>
                        : users.map(function(element){
                            const { _id } = element
                            
                            return(
                                <View key={element._id} style={style.containerUser}>
                                    <Image source={{uri: element.avatar}} style={style.avatar}/>
                                    <Text style={style.textName}>{element.name}</Text>
                                    <Text style={style.text}>{element.bio}</Text>
                                    <View style={style.buttons}>
                                        <TouchableOpacity onPress={()=> handleLike(_id)}>
                                            <Image style={style.buttonIcons} source={Like}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=> handleDislike(_id)}>
                                            <Image style={style.buttonIcons} source={Dislike}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',      
    },
    containerUser:{
        flex: 1,
        backgroundColor:'#ECF0F1',
        justifyContent: 'center',
        marginBottom: 18,
        alignItems: 'center',
        borderColor: '#273746',
        borderWidth: 0.8,
        margin: 10,
        paddingBottom: 30
    },
    textName:{
        color:'#273746',
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold'
    },
    text:{
        textAlign:'center',
        color:'#273746',
        marginTop: 8,
        fontSize: 16,
        fontFamily:'arial',
        marginBottom:18
    },
    buttons:{
        alignSelf:'stretch',
        justifyContent:'space-around',
        flexDirection:'row',
        marginBottom: 18,
        marginTop: 10
    },
    container_end:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    avatar:{
        width: 300,
        height:300, 
        borderRadius: 4, 
        marginTop: 8
    },
    end:{
        marginTop: 50,
        color: '#DF4723',
        fontWeight:'900',
        fontSize: 30
    }
})
export default Main