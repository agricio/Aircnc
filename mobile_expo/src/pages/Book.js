import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity, AsyncStorage, Alert, Image } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('_id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spot/${id}/booking`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Booking solicitation send!');
    navigation.navigate('List');

  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: navigation.getParam('thumbnail_url') }} />
      <Text style={styles.title}>Make a book in: <Text style={styles.label}>{navigation.getParam('company')}</Text> </Text>
      <Text style={styles.title}>price: <Text style={styles.price} > {navigation.getParam('price')? `$${navigation.getParam('price')}/day` : 'Free'}</Text> </Text>
      <Text style={styles.label}>Date of Interest</Text>
            <TextInput
               style={styles.input}
               placeholder="What date do you want to book?"
               placeholderTextColor="#999"
               keyboardType="email-address"
               autoCapitalize="words"
               value={date}
               autoCorrect={false}
               onChangeText={setDate}
            />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
         <Text style={styles.buttonText}>Make a Book</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
         <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:30
  },

  thumbnail: {
    marginTop: 30,
    alignSelf: 'center',
    width: 310,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 2,
    marginBottom: 20,
  },

  price: {
    fontSize: 20,
    color: '#999',
  },

  title: {
    marginBottom: 10,
    fontSize: 18,
    marginTop: -10,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
  },

  input: {
    borderWidth: 1,
    borderRadius: '20%',
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,  
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cancelButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75 
  },

  cancelButtonText: {
    color: '#444',
    fontSize: 18,
  }

});