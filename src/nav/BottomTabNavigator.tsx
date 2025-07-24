import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // ✅ Ensure this is installed
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/userScreen';

const Tab = createBottomTabNavigator();

const AnimatedTabIcon = ({
  focused,
  iconName,
  color,
  size,
}: {
  focused: boolean;
  iconName: keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <MaterialIcons name={iconName} size={size} color={color} />
    </Animated.View>
  );
};

type BottomTabNavigatorProps = {
  userName: string;
  onLogout: () => void;
};

const BottomTabNavigator = ({ userName, onLogout }: BottomTabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';

          if (route.name === 'Dashboard') iconName = 'dashboard';
          else if (route.name === 'User') iconName = 'account-circle';

          return (
            <AnimatedTabIcon
              focused={focused}
              iconName={iconName}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: '#4B7BE5',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e0e0e0',
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 13,
        },
      })}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <HomeScreen {...props} userName={userName} onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="User">
        {(props) => <UserScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
