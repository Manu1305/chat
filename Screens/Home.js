import { StyleSheet,View, Text, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../firebase/Firebaseconfig'
import { onSnapshot, where } from 'firebase/firestore'
import Listitem from '../assets/components/Listitem'
import { collection, query, getDocs } from 'firebase/firestore';

const Home = ({navigation}) => {
const [users,setUsers]=useState([])
  const getUsers = async () => {
    const docRef = collection(db, 'users');
    const q = query(docRef, where('userUID', '!=', authentication?.currentUser?.uid));
    const querySnapshot = await getDocs(q); // Await for the query to resolve

    let data = [];
    querySnapshot.forEach((user) => {
      data.push(user.data());
    });

    setUsers(data);
    console.log(users);
  }


  const LogoutUser = async()=>{
    authentication.signOut().then(()=>{
      navigation.replace('login')
    })

  }


useEffect(()=>{
    getUsers();
},[])

  return (
    <>
   
    <FlatList
      data={users}
      keyExtractor={(item) => item.email} // Use keyExtractor for unique keys
      renderItem={({ item }) => 
        <Listitem
        onPress={()=>
          navigation.navigate('chat',{name:item.username,uid:item.userUID})
        }
          title={item.username}
          subTitle={item.email} // Fixed typo in subTitle
          image={item.avaterUrl} 
          // Fixed typo in avatarUrl
        />
      }
        
    
    />
    <Button title='logout'
    onPress={LogoutUser} />
    </>
  );
}

export default Home