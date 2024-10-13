import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import { Share } from 'react-native';

import { SERVER_IP } from './config';

const Setting = ({ navigation }) => {
  const settings = [
    { type: 'Account', name: 'Update Profile' },
    { type: 'Account', name: 'Delete Account' },
    { type: 'Account', name: 'Logout' },
    { type: 'General', name: 'Notifications' },
    { type: 'General', name: 'Permissions' },
    { type: 'Privacy and FAQ', name: 'Privacy Policy' },
    { type: 'Privacy and FAQ', name: 'FAQ' },
    { type: 'General', name: 'Report' },
    { type: 'General', name: 'Share' },
  ];

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
  const sortedSettings = {};

  settings.forEach((setting) => {
    if (!sortedSettings[setting.type]) {
      sortedSettings[setting.type] = [];
    }
    sortedSettings[setting.type].push(setting);
  });

  const handleOptionSelect = (option) => {
    switch (option) {
      case 'Notifications':
        navigation.navigate('NotificationSetting');
        break;
      case 'Permissions':
        navigation.navigate('PermissionSetting');
        break;
      case 'Report':
        navigation.navigate('ReportIssue');
        break;
      case 'Share':
        shareApp();
        break;
      case 'Report':
        navigation.navigate('updateprofile.js');
        break;
      case 'Logout':
        handlelogout();
        
        break;
     
      default:
        navigation.navigate('Setting');
        break;
    }
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this app!',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header /><ScrollView >
      <View style={styles.container}>
        <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 30, fontWeight: 'bold' }}>
          Settings
        </Text>

        
        {['General', 'Privacy and FAQ', 'Account'].map((type, index) => (
            <View key={index}>
              <Text style={{marginTop: 20,marginLeft: 20, fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
                {type} Settings
              </Text>
              {sortedSettings[type].map((option, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  onPress={() => handleOptionSelect(option.name)}
                  style={{
                    paddingVertical: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: '#ddd',
                  }}
                >
                  <Text style={{marginLeft: 20, fontSize: 18 }}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        
      </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
    
  );
};

export default Setting;
