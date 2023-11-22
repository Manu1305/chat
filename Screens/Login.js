import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { authentication } from '../firebase/Firebaseconfig';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginUser = async () => {

        signInWithEmailAndPassword(authentication, email, password).then(() => {
            console.log("user logged in ")
            navigation.navigate('home')
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(()=>{
onAuthStateChanged(authentication,(user)=>{
    if(user){
        navigation.navigate('home')
    }
    else{
        console.log('no user');
        navigation.canGoBack()&& navigation.popToTop();
    }
})
    },[])
    return (

        <View style={styles.container}>
            <Input placeholder='Enter Your email'
                label='email' value={email}
                onChangeText={text => setEmail(text)}
                leftIcon={{ type: 'material', name: 'email' }}
            />
            <Input placeholder='Enter Your password'
                onChangeText={text => setPassword(text)}
                label='password'
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />
            <Button title='login' onPress={loginUser}
            />
            <View style={styles.btfn} >

                <Button title='register' onPress={() => navigation.navigate('register')} />
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100

    },
    btfn: {
        marginTop: 10,

    }
});