import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, Text, TouchableOpacity, View } from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';
import { Feather } from '@expo/vector-icons'; 

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    handleLogName();
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });

  }, []);

  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate('Login');
  }

  async function handleLogName() {
    const name = await AsyncStorage.getItem('email');
    setEmail(name);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.painel}>
         <Text style={styles.title}>Welcome: <Text style={styles.bold}>{email}</Text></Text>
         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Feather name="log-out" size={24} color="black" />
            <Text style={styles.cancelButtonText}>Log out</Text>
          </TouchableOpacity>
      </View>
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  painel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, 
    marginBottom: 5,
    marginTop: 10,   
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    color: '#444',
    marginLeft: 30,
  },

  bold: {
    fontWeight: 'bold',
  },

  logoutButton: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 60,
  }
});