import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Modal from 'react-native-modal';
import { SERVER_IP } from './config';

export default function Login( {navigation} ) {

  const [username, setUsername] = useState();
  const [pass, setPassword] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleLogin = async () => {
    // Create object to send in POST request
    console.log('login pressed');
    const userData = {
      username: username,
      password: pass
    }    
    console.log(userData);
    try {
      // Make POST request to Flask server
      const response = await fetch(`${SERVER_IP}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      // Check if login was successful
      if(response.status==200) {        
        const protectedResponse = await fetch(`${SERVER_IP}/protected`);        
        if (protectedResponse.status === 200) {
          navigation.navigate('Home');
        }
      } else {
        setPopupMessage('Login Failed');
        setIsModalVisible(true);
      }
    } catch(error) {
      console.log(error);
      setPopupMessage('An error occurred. Please try again later.');
      setIsModalVisible(true);
    }
  }
  return (    
    <View style={styles.container}>
      <Header />
      <Text style={styles.signuptext}>Login to continue..!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={pass}
          onChangeText={setPassword}
        />
        <View style={styles.signupcontainer}>
        <TouchableOpacity          
          onPress={handleLogin}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{popupMessage}</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>    
  );
}