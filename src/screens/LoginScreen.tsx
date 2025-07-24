import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/customButton';
import { loginSchema, validateForm } from '../utils/validation';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const values = { email, password };

    const { isValid, errors } = await validateForm(loginSchema, values);

    if (!isValid || Object.keys(errors).length > 0) {
      console.log('Validation Errors:', errors);
      return;
    }

    try {
      // const response = await api.getUsers();
      // const users = response.data;
      // const matchedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

      // if (matchedUser) {
      //   console.log('Login success:', matchedUser);
      // } else {
      //   console.log('Login failed: Email not found');
      //   return;
      // }

      // Navigate to Home after successful login
      navigation.navigate('Home');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        backgroundColor="#00C2FF"
        width="80%"
        height={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
