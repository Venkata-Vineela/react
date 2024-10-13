import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import { View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import shelterLocations from '../data/shelterLocations.json';
import geoJsonData from '../data/healthcareLocations.json';


const targetLocations = {
  shelter: shelterLocations,
  // healthcare: healthcareLocations,
  // food: foodLocations,
  // petcare: petcareLocations
};

export default function Find( {navigation} ) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Shelter', value: 'shelter' },
   // { label: 'Healthcare', value: 'healthcare' },
    // { label: 'Food', value: 'food'},
    // { label: 'Petcare', value: 'petcare'},
    // { label: 'Gas Options', value: 'gasoption'}
  ]);
    
    const [userLocation, setUserLocation] = useState(null);
    
    
    useEffect(() => {
      (async () => {
        // permissions check
  let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // do something when permission is denied
          return;
        }
  
        const location = await Location.getCurrentPositionAsync();
        
        setUserLocation(location);
      })()
    }, [])

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
    };

    const handleDropdownChange = (selectedValue) => {
      setValue(selectedValue);
    };

    // const selectedLocations = targetLocations[value] || [];

    // const nearbyLocations = selectedLocations.filter((location) => {
    //   if (userLocation) {
    //     const distance = calculateDistance(
    //       userLocation.coords.latitude,
    //       userLocation.coords.longitude,
    //       location.latitude,
    //       location.longitude
    //     );
    //     return distance <= 5; // Display locations within 5 kilometers of the user
    //   }
    //   return false;
    // });
  

    const initialRegion = userLocation
    ? {
      latitude: userLocation?.coords.latitude || 0,
      longitude: userLocation?.coords.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
      }
    : null;

    const features = geoJsonData.features || [];

    const nearbyLocations = features.filter(features => {
      if (userLocation) {
            const distance = calculateDistance(
              userLocation.coords.latitude,
              userLocation.coords.longitude,
              location.latitude,
              location.longitude
            );
            return distance <= 5; // Display locations within 5 kilometers of the user
          }
          return false;
    });

    const geoJsonMarkers = nearbyLocations.map(features => {
      return (
        <Marker 
          coordinate={{
            latitude: features.geometry.coordinates[1], 
            longitude: features.sgeometry.coordinates[0]
          }}
        />
      );
    });

    // const geoJsonMarkers = features
    // .filter((feature) => {
    //   if (userLocation) {
    //     const distance = calculateDistance(
    //       userLocation.coords.latitude,
    //       userLocation.coords.longitude,
    //       feature.geometry.coordinates[1],
    //       feature.geometry.coordinates[0]
    //     );
    //     return distance <= 5;
    //   }
    //   return false;
    // })
    // .map((feature, index) => {
    //   const title = feature.properties.DESCRIPT || '';
    //   return (
    //     <Marker
    //       key={index}
    //       coordinate={{
    //         latitude: feature.geometry.coordinates[1],
    //         longitude: feature.geometry.coordinates[0],
    //       }}
    //       title={title}
    //     />
    //   );
    // });
  
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.searchcontainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleDropdownChange}
            setItems={setItems}
            placeholder='Search nearby location'
            style={styles.searchdropdown}
          />
          {value && (
            <Text style={{marginTop: 20}} >Showing results for: {value}</Text>
          )}        
        <MapView style={{flex: 1,marginTop: 20}} initialRegion={initialRegion}>
          {userLocation && (
             <Marker
              coordinate={userLocation.coords} 
              pinColor="blue"
              />
            )}
            {geoJsonMarkers}
            
            {nearbyLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
            />
          ))}
          {/* //{geoJsonMarkers}  */}
        </MapView>
       
        
        </View>
        <Footer navigation={navigation} />
      </View>
    );
}