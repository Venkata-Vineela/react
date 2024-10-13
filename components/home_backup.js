import React from 'react';
import { View, Text,  TouchableOpacity} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';

export default function HomePage({navigation}) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.homecontent}>
        <TouchableOpacity
          style={styles.editAddress}
          onPress={() => {
            navigation.navigate('Addpost');                
          }}          
        >
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
         
        </View>
        <Footer navigation={navigation}/>
      </View>
    );
  }  