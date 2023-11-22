import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/Firebaseconfig';
const firebaseConfig = {
    apiKey: "AIzaSyBCN00OlwnzP_qKvddhg8HRHSdsTC0z8zQ",
    authDomain: "chat-app-31ec9.firebaseapp.com",
    projectId: "chat-app-31ec9",
    storageBucket: "chat-app-31ec9.appspot.com",
    messagingSenderId: "605710442755",
    appId: "1:605710442755:web:0023c936730ff6feb50936",
    measurementId: "G-ZE207284JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);
const authentication = getAuth(app);

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('')


    const firebaseConfig = {
        apiKey: "AIzaSyBCN00OlwnzP_qKvddhg8HRHSdsTC0z8zQ",
        authDomain: "chat-app-31ec9.firebaseapp.com",
        projectId: "chat-app-31ec9",
        storageBucket: "chat-app-31ec9.appspot.com",
        messagingSenderId: "605710442755",
        appId: "1:605710442755:web:0023c936730ff6feb50936",
        measurementId: "G-ZE207284JZ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized:', app);
    const authentication = getAuth(app);

    const registerUser = async () => {
        console.log('hello world');
        createUserWithEmailAndPassword(authentication, email, password).then((usercredential) => {
            const userUID = usercredential.user.uid;
            const docRef = doc(db, 'users', userUID)
            const docSnap =setDoc(docRef,{
                
                avaterUrl: avatar ? avatar :'https://cdn.textstudio.com/output/sample/normal/8/7/7/3/1305-logo-600-13778.png',
                username,
                password,
                userUID,
                email
            })

        }).then((res)=>console.log('successfull',res)
        ).catch((Err) => {
            console.log(Err)
        })
    }
    return (

        <View style={styles.container}>
            <Input placeholder='Username'
                label='username' value={username}
                onChangeText={text => setUsername(text)}
                leftIcon={{ type: 'material', name: 'account-circle' }}
            />
            <Input placeholder='Avatar'
                label='Avatar' value={avatar}
                onChangeText={text => setAvatar(text)}
                leftIcon={{ type: 'material', name: 'link' }}
                style={{display:'none'}}
            />
            <Input placeholder='Enter Your email'
                label='email' value={email}
                onChangeText={text => setEmail(text)}
                leftIcon={{ type: 'material', name: 'email' }}
            />
            <Input placeholder='Enter Your password'
                onChangeText={text => setPassword(text)}
                label='password'
                value={password}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />
          


            <Button title='login' onPress={registerUser}
            />


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