import React, {useState,useEffect} from 'react';
import { View, Text, TextInput,  TouchableOpacity} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Modal from 'react-native-modal';
import { SERVER_IP } from './config';

export default function Reqhelp({navigation}) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Medical Assistance', value: 'Medical Assistance' },
    { label: 'Shelter', value: '2' },
  ]);
  const [userLocation, setUserLocation] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [address, setAddress] = useState();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissiona"); 
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync();
      setUserLocation(userLocation);

      reverseGeocode(userLocation);
  }
  
  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log(geocodedLocation);
    // update the state with the result
  };
  
  const reverseGeocode = async (location) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({ 
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
    const formattedAddress = `${reverseGeocodedAddress[0].name} ${reverseGeocodedAddress[0].street}, ${reverseGeocodedAddress[0].city}, ${reverseGeocodedAddress[0].region}, ${reverseGeocodedAddress[0].country} - ${reverseGeocodedAddress[0].postalCode}`;
    setAddress(formattedAddress);
  }  

  const initialRegion = userLocation
    ? {
      latitude: userLocation?.coords.latitude || 0,
      longitude: userLocation?.coords.longitude || 0,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
      }
    : null;

    
      const handleCheckBoxToggle = () => {
        setIsChecked(!isChecked);
      };
      const handleAddressConfirm = () => {
        setIsEditingAddress(false);
      };

      // const sendRequestToServer = async () => {
      //   // Prepare the data to send to the server
      //   if(value && isChecked && address){
      //   try {
      //     const requestData = {
      //       selectedNeed: value,
      //       address: address,
      //     };
          
      //     const reqresponse = await fetch(`${SERVER_IP}/sendhelprequest`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(requestData),
      //     });
      //     if(reqresponse.status === 200) {
      //       setPopupMessage('Help request sent.');
      //       setIsModalVisible(true);
      //     } else {
      //       setPopupMessage('Sending request failed. Please try again.');
      //       setIsModalVisible(true);
      //       console.log(reqresponse);
      //     }
      //   }
      //   catch(error){
      //     setPopupMessage('Error Sending Request');
      //     setIsModalVisible(true);
      //     console.log(error);
      //   }
      // } else {
      //   setPopupMessage('Please confirm the help needed from the dropdown and the address before sending the request.');
      //   setIsModalVisible(true);
      // }
          
      // };


    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.reqhelpcontent}>
        <Text style={styles.reqhelptext}>Select the emergency help you need</Text>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Select from the dropdown' 
        style={styles.searchdropdown}
        itemStyle={styles.dropdownItem}
        textStyle={styles.dropdownItem}
        />
        <MapView style={{flex: 0.8, marginTop: 15, marginBottom:10}} initialRegion={initialRegion}>
          {userLocation && (
             <Marker
              coordinate={userLocation.coords} 
              pinColor="blue"
              />
            )}
            
          </MapView>
          {isEditingAddress ? (
          <TextInput
            placeholder='Enter Address'
            value={address}
            onChangeText={setAddress}
            style={styles.addressBox} 
          />
        ) : (
          <Text style={{marginBottom: 10, fontSize: 20,fontWeight: 'bold'}}>Address: {address}</Text>

        )}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.editAddress}
          onPress={() => {
            if (isEditingAddress) {
              geocode();
            }
            setIsEditingAddress(!isEditingAddress);
          }}
        >
           <View style={styles.buttonContent}>
    <Icon name={isEditingAddress ? 'check' : 'pencil'} size={18} color="black" style={styles.icon} />
    <Text style={styles.buttonText}>{isEditingAddress ? 'Confirm Address' : 'Edit Address'}</Text>
  </View>
          </TouchableOpacity>
        <CheckBox
            title="Confirm your location"
            checked={isChecked}
            onPress={handleCheckBoxToggle}
            style={styles.checkbox}
            checkedColor="green" 
            uncheckedColor="red"
            iconType="material"
            checkedIcon="check-box" 
            uncheckedIcon="check-box-outline-blank" 
            checkedTitle="Location confirmed"
            uncheckedTitle="Location not confirmed"
          />
      <TouchableOpacity
          onPress={sendRequestToServer}
          style={styles.reqhelpbutton}
        >
          <Text style={styles.reqhelpbuttonText}>Request</Text>
        </TouchableOpacity>
        </View>

        </View>
        <Footer navigation={navigation}/>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{popupMessage}</Text>
            <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
  