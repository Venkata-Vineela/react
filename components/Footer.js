// Footer.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use other icon libraries as well
import { styles } from '../styles'; // Import your styles or define them here


export default function Footer ({ navigation }) {
  return (

    <View style={styles.footer}>
      <TouchableOpacity
      style={styles.footeritem}
       onPress={() => {
        navigation.navigate('Home');
       }}
       >
        <Icon name="home" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Find')}>
        <Icon name="search" size={24} color="black" />
        <Text>Find</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Help')}>
        <Icon name="help-circle" size={24} color="black" />
        <Text>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Connect')}>
        <Icon name="people" size={24} color="black" />
        <Text>Connect</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Icon name="settings" size={24} color="black" />
        <Text>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Userprofile')}>
        <Icon name="person" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>


    </View>
  );
};

