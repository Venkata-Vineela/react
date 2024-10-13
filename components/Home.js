import React from 'react';
import { View, Text,  TouchableOpacity,  ImageBackground} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import { SERVER_IP } from './config';

export default function HomePage({navigation}) {

  const handlelogout = async () => {
    try {
      console.log("entered logout");
      const reqlogout = await fetch(`${SERVER_IP}/logout`);
      // console.log(reqlogout)

    if(reqlogout.status==200) {
      console.log("logged out Successfully...")
      navigation.navigate('Login');
    }
    else {
      console.log("....")
    }
    }
    catch{
      console.log(error);
      setPopupMessage('Network Error while logging out...');
    }
  }

    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require('../assets/home_background_map.png')} // Replace with the path to your map image
        resizeMode="cover" 
        style={styles.backgroundImage}
       >
          <Header />
          <View style={styles.homecontent}>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Addpost');                
              }}          
            >
              <Text style={styles.buttonText}>Share Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Home');                
              }}          
            >
              <Text style={styles.buttonText}>View Feed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Help');                
              }}          
            >
              <Text style={styles.buttonText}>Request Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Help');                
              }}          
            >
              <Text style={styles.buttonText}>View Help Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Find');                
              }}          
            >
              <Text style={styles.buttonText}>Find Emergency Locations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Connect');                
              }}          
            >
              <Text style={styles.buttonText}>connect with people</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => {
                navigation.navigate('Setting');                
              }}          
            >
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homefunction}
              onPress={() => handlelogout()}          
            >
              <Text style={styles.buttonText}>LogOut</Text>
            </TouchableOpacity>
          </View>        
        </ImageBackground>
      </View>
    );
  }  