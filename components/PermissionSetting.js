import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from './config';

let PERMISSION_KEY = 'permissionSetting';
const PermissionSetting = ({ navigation }) => {
  const [permissionSetting, setPermissionSetting] = useState({
    Camera: true,
    Location: true,    
    Media: true,
  });
  useEffect(() => {    
    loadPermissionSettings();
  }, 
  []);
  const loadPermissionSettings = async () => {
    try {
      const savedpSettings = await AsyncStorage.getItem(PERMISSION_KEY);

      if (savedpSettings !== null) {
        setPermissionSetting(JSON.parse(savedpSettings));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };
  const handleTogglePermission = (type) => {
    setPermissionSetting((prevState) => {
      const updatedSettings = {
        ...prevState,
        [type]: !prevState[type],
      };  
      try {
        AsyncStorage.setItem(PERMISSION_KEY, JSON.stringify(updatedSettings))
          .then(() => {
            setPermissionSetting(updatedSettings);
          })
          .catch((error) => {
            console.error('Error saving notification settings:', error);
          });
      } catch (error) {
        console.error('Error saving notification settings:', error);
      }  
      return updatedSettings;
    });
  };  
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.settingscontent}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
          Permission Settings
        </Text>        
        {Object.keys(permissionSetting).map((type, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, flex: 1 }}>{type}</Text>
            <Switch
              value={permissionSetting[type]}
              onValueChange={() => handleTogglePermission(type)}
            />
          </View>
        ))}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};
export default PermissionSetting;
