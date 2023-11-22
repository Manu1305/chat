import { StyleSheet, Text, View } from 'react-native'

import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { authentication, db } from '../firebase/Firebaseconfig'
import { addDoc, collection, serverTimestamp, doc, query, onSnapshot, Query, orderBy } from 'firebase/firestore'

export default function Chat({ route }) {
    const uid = route.params.uid
    const [messages, setMessages] = useState([])
    const currentUser = authentication?.currentUser?.uid
    // useEffect(() => {
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, [])

    useEffect(() => {
        const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`
        const docRef = doc(db, 'chatrooms', chatId)
        const colRef = collection(docRef, 'messages')
        const q = query(colRef, orderBy('createdAt', 'asc')); // Sort by createdAt in descending order
        const unsubscribe = onSnapshot(q, (onSnap) => {
            const allMsg = onSnap.docs.map(mes => {
                const messageData = mes.data();
                const createdAt = messageData.createdAt ? messageData.createdAt.toDate() : new Date();

                return {
                    ...messageData,
                    createdAt
                };
            });
            setMessages(allMsg.reverse()); // Reverse the order to display the latest at the bottom
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);



    const onSend = useCallback((messagesArray) => {
        const msg = messagesArray[0];
        // console.log(myMsg);
        const MyMsg = {
            ...msg,
            sentBy: currentUser,
            sentTo: uid

            // chatrooms //12345674/messages/
        }
        console.log(MyMsg);
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, MyMsg))
        const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`
        const docRef = doc(db, 'chatrooms', chatId)
        const colRef = collection(docRef, 'messages')
        const chatSnap = addDoc(colRef,
            {
                ...MyMsg,
                createdAt: serverTimestamp(),
            })
    }, [])

    return (

        <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: currentUser,
            }}
        />

    )
}

const styles = StyleSheet.create({})