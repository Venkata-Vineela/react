import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

let NOTIFICATION_KEY = 'notifications';

const NotificationSetting = ({ navigation }) => {
  const [notifications, setNotificationSettings] = useState({
    Alerts: true,
    HelpRequests: true,
    Messages: true,
    
  });

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(NOTIFICATION_KEY);

      if (savedSettings !== null) {
        setNotificationSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const handleToggleNotification = (type) => {
    // Update the state and save the updated settings
    setNotificationSettings((prevState) => {
      const updatedSettings = {
        ...prevState,
        [type]: !prevState[type],
      };  
      // Save the updated settings
      try {
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updatedSettings))
          .then(() => {
            // After saving, set the state to reflect the latest change
            setNotificationSettings(updatedSettings);
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
          Notification Settings
        </Text>
        {Object.keys(notifications).map((type, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, flex: 1 }}>{type}</Text>
            <Switch
              value={notifications[type]}
              onValueChange={() => handleToggleNotification(type)}
            />
          </View>
        ))}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default NotificationSetting;
