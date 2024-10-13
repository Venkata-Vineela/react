import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Welcome from './components/Welcome';
import SignupScreen from './components/SignupScreen';
import Login from './components/Login';
import Home from './components/Home';
import Find from './components/Find';
import Help from './components/Help';
import Connect from './components/Connect';
import Setting from './components/Setting';
import Reqhelp from './components/Reqhelp';
import PermissionSetting from './components/PermissionSetting';
import ReportIssue from './components/ReportSettings';
import NotificationSetting from './components/NotificationSetting';
import Profile from './components/Profile';
import Userprofile from './components/Userprofile';
import Addpost from './components/Addpost';
import Viewpost from './components/Viewpost';

const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="Find"
          component={Find}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reqhelp"
          component={Reqhelp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermissionSetting"
          component={PermissionSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportIssue"
          component={ReportIssue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Userprofile"
          component={Userprofile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addpost"
          component={Addpost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Viewpost"
          component={Viewpost}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

