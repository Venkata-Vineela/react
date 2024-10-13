import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import { SERVER_IP } from './config';

export default function Profile ({ route, navigation }) {
    const {username} = route.params;
    const [userData, setUserData] = useState(null);
    const [Data, setData] = useState(null);
    const [isFriend, setIsFriend] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    useEffect(() => {
        checkFriendStatus(username);
        fetchUserData(username);        
      }, [username]);

    

    const fetchUserData = async (username) => {
        try {
            
            const response = await fetch(`${SERVER_IP}/get_user_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username})
            });
    
            if (response.status === 200) {
            const data = await response.json();
            setUserData(data);
            console.log('User Data:')
            console.log(data);
            } else {
            console.error('API request failed with status:', response.status);
            
            }
        } catch (error) {
            console.error('Error occurred while making the API request:', error);       
        }
        };

    const checkFriendStatus = async (username) => {
        try {
            
            const response = await fetch(`${SERVER_IP}/friendstatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username}),
            });            

            if (response.status===200){
                const data = await response.json()
                setData(data);
                console.log('Friend Status:')
                console.log(data);
                setIsRequested(data.isrequested);
                setIsFriend(data.isfriend);
            }
        } catch(error){
            console.error('Error checking friend status:', error);
        }
    }

    const connectusers = async () => {
        if(isFriend){
            console.log('remove pressed');
            try {
                const response = await fetch(`${SERVER_IP}/removefriend`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ username }),
                });
                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data);
                    setIsFriend(false);
                    
                } else {
                  console.error('Failed to remove friend:', response.status);
                }
              } catch (error) {
                console.error('Error removing friend:', error);
              }
        } 
        // else if(isRequested) {
            // try {
            //     console.log('Accept Pressed');
            //     const response = await fetch(${SERVER_IP}/acceptfirend,{
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({username}),
            //     })
            //     if (response.status === 200) {
            //         const data = await response.json();
            //         setIsFriend(data);
    
            //         // Friend request sent successfully
                    
            //     } else {
            //         console.error('Failed to send friend request:', response.status);
            //     }
            // } catch (error) {
            //     console.error('Error sending friend request:', error);
            // }
       // }
         else {
            try {
                console.log('request Pressed');
                const response = await fetch(`${SERVER_IP}/requestfriend`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username}),
                })
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setIsRequested(true);
                    // Friend request sent successfully
                } else {
                    console.error('Failed to send friend request:', response.status);
                }
            } catch (error) {
                console.error('Error sending friend request:', error);
            }

        }              
    };    
   
    return (
       <View style={styles.container}>
        <Header />
            <View style={styles.addpostcontent}>
                <Text style={styles.profiletitle}>Profile</Text>
                {userData && (
                    <View>
                        <Text style={styles.profileusername}>{userData[0].firstname} {userData[0].lastname}</Text>
                        
                        <Text style={styles.profilefirstname}>{userData[0].organization}</Text>
                        <TouchableOpacity
                            style={[
                                styles.signupButton,
                                isRequested && styles.disabledButton,
                            ]}
                            onPress={isRequested ? null : connectusers}
                        >
                            <Text style={styles.signupButtonText}>
                                {isFriend ? 'Remove' : isRequested ? 'Requested' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            </View>
        <Footer navigation={navigation} />            
       </View>
    );
   };