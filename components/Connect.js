import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import { SERVER_IP } from './config';

export default function Connect({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [defaultSuggestions, setDefaultSuggestions] = useState([]); 
  const [connectionRequests, setConnectionRequests] = useState([]); // Define defaultSuggestions state

  const renderItem = ({ item }) => {
    if (connectionRequests.includes(item)) {
      return renderItemConnectionRequest({ item });
    } else {
      return renderItemlist({ item });
    } 
  };
  
  const renderItemlist = ({item})=> (
    <Pressable onPress={()=> handlePress(item)}>
      <View style={styles.cardContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.firstname}</Text>
          
        </View>
      </View>
    </Pressable>
  );

  const renderItemConnectionRequest = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.requserInfo}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>
            {item.firstname} 
          </Text>
        </View>
        <View style={styles.acceptbuttonContainer}>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={() => acceptrequest(item.username)}
          >
            <Text style={styles.signupButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>           
      </View>
    </View>
  );

  const acceptrequest = async (username) => {
    try {
      console.log('Accept Pressed');
      const response = await fetch(`${SERVER_IP}/acceptfriend`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
      })
      console.log(response);
      if(response.status ===200){
        const data = await response.json();
        console.log(data);
        
      } else {
        console.error('Failed to accept request:', response.status);
      }      
    } catch(error) {
      console.error('Error sending friend request:', error);
    }
  }



  const handlePress = (item)=> {
    // console.log(item);
    // console.log(item.username);

    navigation.navigate('Profile', { username: item.username});
  };
  const handleSearch = async (text) => {
    setSearchText(text);

    // Set isSearching to true when the user is actively searching
    setIsSearching(text.length > 0);

    try {
      if (text.length > 0) {
        // Make an API call to fetch search results based on the user's input
        const response = await fetch(`${SERVER_IP}/search_unames`,{
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({searchText: text}),
        });
    
       

        if (response.status === 200) {
          const data = await response.json();
          // Update the searchResults state with the data from the API response
          
          setSearchResults(data);
        } else {
          console.error('API request failed with status:', response.status);
        }
      } 
      else {
        const defaultResponse = await fetch(`${SERVER_IP}/suggest_unames`,{
          method: 'POST',
        });
        if (defaultResponse.status === 200) {
          const defaultData = await defaultResponse.json();
          // console.log(defaultData);
          setDefaultSuggestions(defaultData);
        } else {
          console.error('API request for default suggestions failed with status:', defaultResponse.status);
        }
      }

      const requestsResponse = await fetch(`${SERVER_IP}/displayrequests`, {
        method: 'POST',
      });

      if (requestsResponse.status === 200) {
        const requestsData = await requestsResponse.json();
        
        setConnectionRequests(requestsData);
        console.log(requestsData);
      } else {
        // console.error('API request for connection requests failed withstatus:', requestsResponse.status);
      }

    } catch (error) {
      console.error('Error occurred while making the API request:', error);
    }
  };

  useEffect(() => {
    handleSearch(''); // Call with an empty input to fetch default suggestions
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addpostcontent}>
        <TextInput
          style={styles.input}
          placeholder="Search users..."
          onChangeText={text => handleSearch(text)}
        />

        {isSearching ? (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 , marginBottom: 10}}>Results:</Text>
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.firstname} 
            />
          </View>
        ) : (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Suggested Connections:</Text>
            <FlatList
              data={defaultSuggestions}
              keyExtractor={(item) => item.firstname} 
              renderItem={renderItem}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Connection Requests:</Text>
            {connectionRequests.length > 0 ? (
              <FlatList
                data={connectionRequests}
                keyExtractor={(item) => item.username}
                renderItem={renderItem}
              />
            ) : (
              <Text style={styles.noRequestsText}>No requests</Text>
            )}
            
          </View>
        )}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
