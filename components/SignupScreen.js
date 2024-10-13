import React,{ useState,  useEffect}  from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { styles } from '../styles';
import Header from './Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { SERVER_IP } from './config';

export default function SignupScreen( {navigation} ) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Transportation', value: 'Transportation' },
    { label: 'Communication', value: 'Communication' },
    { label: 'Public Works and Engineering', value: 'Public Works and Engineering'},
    { label: 'Firefighting', value: 'Firefighting'},
    { label: 'MassCare, Emergency Assistance, Temporary Housing and Human Service', value: 'MassCare, Emergency Assistance, Temporary Housing and Human Service'},
    { label: 'Logistics', value: 'Logistics'},
    { label: 'Public Health and Medical Services', value: 'Public Health and Medical Service'},
    { label: 'Search and Rescue', value: 'Search and Rescue'},
    { label: 'Oil and Hazardous Materials Response', value: 'Oil and Hazardous Materials Response'},
    { label: 'Agriculture and Natural Resources Annex', value:'Agriculture and Natural Resources Annex' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Public Safety and Security', value: 'Public Safety and Security'},
    { label: 'Cross-Sector Business and Infrastructure', value: 'Cross-Sector Business and Infrastructure'},
    { label: 'External Affairs' , value: 'External Affairs'},
    { label: 'other', value: 'other'}
  ]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setphone] = useState('');
  const [street_address, setstreet_address] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [zip, setzip] = useState('');
  const [formIsValid, setFormIsValid] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [otherValue, setOtherValue] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [stateTouched, setStateTouched] = useState(false); 
  const stateMapping = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
    'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI',
    'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX',
    'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };
  const validStates = Object.keys(stateMapping).concat(Object.values(stateMapping));

  const validateState = (stateInput) => {
    const normalizedState = stateMapping[stateInput.trim()] || stateInput.toUpperCase();
    return validStates.includes(normalizedState);
  };
  const generateOtpFunc = () => {
    genotp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(genotp);
    return genotp;
  };
  useEffect(() => {
    console.log("Updated OTP:", otp);
  }, [otp]);

  const handleOtp = async () => {  
   if (formIsValid) {
    console.log("in otp verification")
      try {
        const generateOtp = generateOtpFunc();
        const verificationData = {
          email,
          otp: generateOtp,
        }
        console.log(verificationData);
        const verificatonResponse = await fetch(`${SERVER_IP}/sendverificationEmail`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verificationData),
        });
        console.log(verificatonResponse);
        if (verificatonResponse.status === 200) {
          setPopupMessage('Verification email sent. Please check your inbox for the OTP.');
          setIsModalVisible(true);
        }
        else {
          setPopupMessage('Error sending verification email. Please try again.');
          setIsModalVisible(true);
        }
      }
      catch(error){
        setPopupMessage('Error Sending OTP');
        setIsModalVisible(true);
        console.log(error);
      }     
    } else {
      setPopupMessage('Please fill in all the required fields');
      setIsModalVisible(true);
    }  
  };
  const handleSignup = async () => {
    try {
      console.log(enteredOtp,otp);
      if(enteredOtp === otp) {
        let organization = value;
        if(value === 'other') {
          organization = otherValue; 
        }
        const signupData = {
          username: email, 
          pass, 
          firstName,
          lastName,
          phone,
          organization,
          street_address,
          city,
          state,
          zip, 
        };
        const response = await fetch(`${SERVER_IP}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData)  
        });
        console.log(response)
      if(response.status==200){
        const responseData = await response.json();     
        console.log(responseData.message)  
        setPopupMessage(responseData.message);
        setIsModalVisible(true);
        
      }
    } else {
      setPopupMessage('Invalid OTP. Please enter the correct OTP.');
      setIsModalVisible(true);
    }
      
    } catch (error) {
    setPopupMessage('Error Signing up');
    setIsModalVisible(true);
    }
  }
  const updateFormValidity = () => {
    const isFormValid =
      email.trim() !== '' &&
      pass.trim() !== '' &&
      confirmPass.trim()!== '' &&
      pass === confirmPass &&
      validateState(state) &&
      true;

    setFormIsValid(isFormValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [email, pass, confirmPass, value, otherValue, state]);

  return (    
  
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      // keyboardVerticalOffset={100}
    >
      <Header /> 
      
      <ScrollView 
        contentContainerStyle={styles.signupscrollContainer}
        keyboardShouldPersistTaps="handled" 
        nestedScrollEnabled={true}
        
      >
        <Text style={styles.signuptext}>Signup to continue..!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="LastName"
          value={lastName}
          onChangeText={ text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="*Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            updateFormValidity();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setphone}
        />
        <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="*Organization"
        placeholderStyle={{
          color: '#c5c5c5',  // Set placeholder color to grey
          fontSize: 20,
        }}
        style={styles.orgdropdown}
        dropDownContainerStyle={styles.dropdowncontainerstyle}
        itemStyle={styles.dropdownItem}  
        textStyle={styles.dropdowntextstyle}    
        labelStyle={styles.dropdownlabelstyle}        
        onChangeValue={value => {
          if(value === 'other') {
            setOpen(false);

          } else {
            setOpen(false);
          }
          updateFormValidity();
        }} 
        />
        {value === 'other' && (
            <TextInput
            value={otherValue}
             onChangeText={setOtherValue}
             style={styles.input} 
             placeholder="Please mention the other"/>
          )} 
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={street_address}
          onChangeText={setstreet_address}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setcity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={(value) => {
            setstate(value);
            setStateTouched(true);  
          }}
        />  
        {stateTouched && state !== '' && !validateState(state) && (
            <Text style={styles.invalidstateerror}>Invalid state ! Please enter the correct state.</Text>
          )}

        <TextInput
          style={styles.input}
          placeholder="Zipcode"
          keyboardType="phone-pad"
          value={zip}
          onChangeText={setzip}
        />        
        <TextInput
          style={styles.input}
          placeholder="*Password"
          secureTextEntry={true}
          value={pass}
          onChangeText={(text) => {
            setPass(text);
            updateFormValidity();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="*Confirm Password"
          secureTextEntry={true}
          value={confirmPass}
          onChangeText={(text) => {
            setConfirmPass(text);
            updateFormValidity();
          }}
        />        
        <View style={styles.signupcontainer}>
        <TouchableOpacity
          onPress={handleOtp}
          style={[styles.signupButton, !formIsValid && styles.disabledButton]}          
        >
          <Text style={styles.signupButtonText}>SignUp</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.signuplogintextcontainer}><Text style={styles.signuplogintext}>Already an user? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');                
          }}          
        >
          <Text style={[styles.signuplogintext, {textDecorationLine: 'underline'}]} >Login </Text>
        </TouchableOpacity>
        <Text style={styles.signuplogintext}>Here.</Text></View>
      </View>
      
      </ScrollView>
      <Modal isVisible={isModalVisible}>
  <View style={styles.modalContainer}>
    <Text style={styles.modalText}>{popupMessage}</Text>

        {popupMessage === "Verification email sent. Please check your inbox for the OTP." || 
        popupMessage === 'Invalid OTP. Please enter the correct OTP.' ? (
          <>
            <TextInput
              style={styles.otpInput}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={enteredOtp}
              onChangeText={setEnteredOtp}
            />
            <TouchableOpacity 
            style={styles.otpverifyButton}
            onPress={handleSignup}>
              <Text style={styles.modalCloseButton}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Render other messages here
          // ...

          // Include close button for other messages
          <TouchableOpacity
          style={styles.otpverifyButton}
            onPress={() => {
              setIsModalVisible(false);
              if (popupMessage === "Signup successful") {
                navigation.navigate('Login');
              }
            }}
          >
            <Text style={styles.modalCloseButton}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>

    </KeyboardAvoidingView>
   
  );
}

