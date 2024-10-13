import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';

export default function Help({navigation}) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.helpcontent}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Help');
          }}
          style={styles.helpbutton}
        >
          <Text style={styles.helpbuttonText}>Request Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Help');
          }}
          style={styles.helpbutton}
        >
          <Text style={styles.helpbuttonText}>Offer Help</Text>
        </TouchableOpacity>
        </View>
        <Footer navigation={navigation}/>
      </View>
    );
  }
  