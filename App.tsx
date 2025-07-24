import React, { useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splashScreen';
import LoginScreen from './src/screens/LoginScreen';
import BottomTabNavigator from './src/nav/BottomTabNavigator';
import CreatePostScreen from './src/components/createPostScreen';
import EditPostScreen from '@/components/editPostScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigationRef = useRef<NavigationContainerRef<any>>(null); // navigation reference

  // Handler to be called on successful login
  const handleLoginSuccess = (tokenValue: string, name: string, id: number) => {
    setToken(tokenValue);
    setUserName(name);
    setUserId(id);

    // Navigate to Home if navigation is ready
    // if (navigationRef.current?.navigate) {
    //   navigationRef.current.navigate("Home");
    // }
  };

  const handleLogout = () => {
    setToken(null);
    setUserName('');
    setUserId(null);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </Stack.Screen>
        {token && (
          <>
            <Stack.Screen
              name="Home"
              children={props => (
                <BottomTabNavigator
                  {...props}
                  userName={userName}
                  onLogout={handleLogout}
                />
              )}
            />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
