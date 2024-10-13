import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.welcomecontainer}>
      <Text style={styles.welcome}>Welcome to TRUCHE!</Text>
      <View style={styles.startbuttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={styles.startbutton}
        >
          <Text style={styles.startbuttonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
