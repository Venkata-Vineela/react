import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Modal from 'react-native-modal';
import { SERVER_IP } from './config';
import { Ionicons } from '@expo/vector-icons'; 

export default function Viewpost({navigation}) {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [binaryData, setBinaryData] = useState();
  const [popupMessage, setPopupMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postVisibility, setPostVisibility] = useState('friends');

  const handleTextChange = (text) => {
    setText(text);
  }

  const selectDoc = async () => {
    try{
      const doc = await DocumentPicker.getDocumentAsync();
      const file = doc.assets[0];      
      // console.log(file);   
      // console.log(file.mimeType); 
      setSelectedFile(file);  
      // console.log(selectedFile);
    }
    catch(error){
        console.log(error);
    }
  }
  const clearSelectedFile = () => {
    setSelectedFile(null);
  }

  const handlePost = async () => {
    try {
      // Check if either text or file is not empty
      if (text || selectedFile) {
        if (selectedFile) {
          const fileBinaryData = await readFileAsBinary(selectedFile.uri);
          setBinaryData(fileBinaryData);

        }
        // console.log(binaryData);
        const data = {
          text: text,
          filedata: binaryData, // Use the variable here
          filename: selectedFile ? selectedFile.name : null,
          filetype: selectedFile ? selectedFile.mimeType : null,
          visibility: postVisibility,
        };
        console.log(data);
        // Assuming your server endpoint is '/api/posts'
        const response = await fetch(`${SERVER_IP}/add_post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (response.status === 200) {
          // Post was successful, you can navigate to a success screen or handle it accordingly
          console.log('Post successful');
          message = 'Post Successful';
          setPopupMessage(message);
          setIsModalVisible(true);
        } else {
          // Handle error case
          console.error('Post failed:', response.status, response.statusText);
        }
      } else {
        // Both text and file are empty, handle this case if needed
        setPopupMessage('Both text and file are empty');
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  const readFileAsBinary = async (uri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileContent;
    } catch (error) {
      throw new Error(`Failed to read file: ${error}`);
    }
  };  

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.addpostcontent}>
          <View style={styles.post}>
            <TouchableOpacity
            style={styles.editAddress}
            onPress={handlePost}          
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
         
          <TouchableOpacity
            style={styles.visibilityOption}
            onPress={() => setPostVisibility('friends')}
          >
            {postVisibility === 'friends' ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="black" />
            )}
            <Text style={styles.buttonText}>Friends</Text>
          </TouchableOpacity>
            <TouchableOpacity
              style={styles.visibilityOption}
              onPress={() => setPostVisibility('everyone')}
            >
              {postVisibility === 'everyone' ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="black" />
            )}
              <Text style={styles.buttonText}>Everyone</Text>
            </TouchableOpacity>
            
          </View>

          <TextInput
            multiline
            numberOfLines={5}
            style={{height:250, width: '90%', borderWidth:1, marginTop: 10, marginBottom: 10, borderRadius: 10}}
            value={text}
            onChangeText={handleTextChange}
          />
          <TouchableOpacity
            style={styles.editAddress}
            onPress={selectDoc}          
          >
            <Text style={styles.buttonText}>UploadFile</Text>
          </TouchableOpacity>
          {selectedFile && (
            <View>
              <Text style={styles.buttonText}>{selectedFile.name}</Text>
              <Image
                  source={{ uri: selectedFile.uri }}
                  style={{ width: 200, height: 150 }}
                  resizeMode="contain"
                  controls
                />
              <TouchableOpacity onPress={clearSelectedFile}>
                <Text>Delete selected file</Text>
              </TouchableOpacity>
            </View>
          )}
          </View>     
        </View>
        <Footer navigation={navigation}/>
        <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{popupMessage}</Text>
          <TouchableOpacity onPress={() => {
            setIsModalVisible(false);
            if (popupMessage === "Post Successful") {
              navigation.navigate('Home');
            }
          }}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    );
  }  

