import React,  { useState, useEffect }  from 'react';
import { View, Text, Image, ScrollView} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import Footer from './Footer';
import { SERVER_IP } from './config';

export default function HomePage({navigation}) {

  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserData(); 
    fetchUserPosts();       
  }, []);

  const fetchUserData = async () => {
    try {
        const response = await fetch(`${SERVER_IP}/get_userprofile_data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.status === 200) {
        const data = await response.json();
        setUserData(data);
        console.log(data);
        } else {
        console.error('API request failed with status:', response.status);
        
        }
    } catch (error) {
        console.error('Error occurred while making the API request:', error);       
    }
    };

    const fetchUserPosts = async () => {
      try {
        // Assuming there is an API endpoint to fetch user posts
        const response = await fetch(`${SERVER_IP}/get_user_posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include any necessary payload or parameters for fetching user posts
        });
  
        if (response.status === 200) {
          const postsData = await response.json();
          setUserPosts(postsData);
        } else {
          console.error('API request failed:', response.status);
        }
      } catch (error) {
        console.error('Error occurred while fetching user posts:', error);
      }
    };

    const renderFile = (fileType, fileData) => {
      try {
        switch (fileType) {
          case 'image/jpeg':
            return (
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: `${SERVER_IP}/uploads/${fileData}` }}
              />
            );
          // Add cases for other file types if needed
          default:
            return <Text>Unsupported file type</Text>;
        }
      } catch (error) {
        return <Text>Error</Text>;
      }
    };
    const renderPostCard = (post) => (
      <View style={styles.postCard} key={post.postnumber}>
        {post.file_type && post.file_data && renderFile(post.file_type, post.file_data)}
        <Text style={styles.postText}>{post.text}</Text>
        {/* <Text>{post.file_name}</Text>
        <Text>{post.file_type}</Text> */}
      </View>
    );

    return (
      <View style={styles.container}>
        <Header />
            <View style={styles.addpostcontent}>
                <Text style={styles.profiletitle}>Profile</Text>
                {userData && (
                    <View>
                        <Text style={styles.profileusername}>{userData[0].firstname} {userData[0].lastname}</Text>
                        
                        <Text style={styles.profilefirstname}>{userData[0].organization}</Text>
                      
                    </View>
                )}
                <Text style={styles.profiletitle}>Posts</Text>
                {userPosts.map(renderPostCard)}
                {/* {userPosts.map((post) => (
                  <View key={post.postnumber}>
                    {post.file_type && post.file_data && renderFile(post.file_type, post.file_data)}
                    <Text>{post.text}</Text>
                    <Text>{post.file_name}</Text>                    
                    <Text>{post.file_type}</Text>
                  </View>
                ))} */}
                
            </View>
        <Footer navigation={navigation} />            
       </View>
    );
  }
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, ScrollView } from 'react-native';
// import { styles } from '../styles';
// import Header from './Header';
// import Footer from './Footer';
// import { SERVER_IP } from './config';

// export default function HomePage({ navigation }) {

//   const [userData, setUserData] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     fetchUserData(); 
//     fetchUserPosts();       
//   }, []);

//   // Fetch user data
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${SERVER_IP}/get_userprofile_data`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         setUserData(data); // Set the user data in state
//         console.log(data);
//       } else {
//         console.error('API request failed with status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error occurred while making the API request:', error);       
//     }
//   };

//   // Fetch user posts
//   const fetchUserPosts = async () => {
//     try {
//       const response = await fetch(`${SERVER_IP}/get_user_posts`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         const postsData = await response.json();
//         setUserPosts(postsData); // Set the user posts in state
//       } else {
//         console.error('API request failed with status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error occurred while fetching user posts:', error);
//     }
//   };

//   // Render file (for images or other file types)
//   const renderFile = (fileType, fileData) => {
//     try {
//       switch (fileType) {
//         case 'image/jpeg':
//         case 'image/png':
//           return (
//             <Image
//               style={{ width: 100, height: 100 }}
//               source={{ uri: `${SERVER_IP}/uploads/${fileData}` }} // Assuming fileData is the file name/path
//             />
//           );
//         // Handle other file types as needed
//         default:
//           return <Text>Unsupported file type</Text>;
//       }
//     } catch (error) {
//       return <Text>Error displaying file</Text>;
//     }
//   };

//   // Render individual post card
//   const renderPostCard = (post) => (
//     <View style={styles.postCard} key={post.postnumber}>
//       {post.file_type && post.file_data && renderFile(post.file_type, post.file_data)}
//       <Text style={styles.postText}>{post.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.addpostcontent}>
//         <Text style={styles.profiletitle}>Profile</Text>
//         {userData && (
//           <View>
//             <Text style={styles.profileusername}>{userData.firstname} {userData.lastname}</Text>
//             <Text style={styles.profilefirstname}>{userData.organization}</Text>
//             <Text style={styles.profileemail}>{userData.email}</Text> {/* Assuming there's an email field */}
//           </View>
//         )}
//         <Text style={styles.profiletitle}>Posts</Text>
//         {userPosts.map(renderPostCard)}
//       </ScrollView>
//       <Footer navigation={navigation} />
//     </View>
//   );
// }
