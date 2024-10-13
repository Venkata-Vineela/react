// ReportIssue.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';

const ReportIssue = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [subject, setSubject] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    // Handle issue submission here
    // You can use the userID, subject, and issue state values
  };

  return (
    <View style={styles.container}>
    <Header />
    <View style={styles.reportcontainer}>
      <Text style={{  fontSize: 30, fontWeight: 'bold' }}>Report an Issue</Text>
      <TextInput
        placeholder="User ID"
        value={userID}
        onChangeText={setUserID}
        style={styles.reportinput}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.reportinput}
      />
      <TextInput
        placeholder="Issue"
        multiline={true}
        value={issue}
        numberOfLines={10}
        onChangeText={setIssue}
        style={styles.reportinput}
      />
      <View style={styles.reportbuttoncontainer}>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting');                
          }}      
          style={styles.reportButton}    
        >
          <Text style={styles.signupButtonText} >Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
    <Footer navigation={navigation} />
    </View>
  );
};

export default ReportIssue;