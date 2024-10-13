// Header.js

import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from '../styles';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
      <Text style={styles.headerText}>TRUCHE</Text>
    </View>
    </SafeAreaView>
  
  );
}

export default Header;
