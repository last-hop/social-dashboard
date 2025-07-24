import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import CustomButton from "../components/customButton";
import { loginSchema, validateForm } from "../utils/validation";
import { api } from "../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenProps = {
  onLoginSuccess: (token: string, name: string, userId: number) => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const values = { email, password };
    const { isValid, errors } = await validateForm(loginSchema, values);

    if (!isValid || Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await api.getUsers();
      const users = response.data;

      const matchedUser = users.find(
        (user: any) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!matchedUser) {
        setFormErrors({ email: "Email not found" });
        return;
      }

      // Reset errors and proceed
      setFormErrors({});
      onLoginSuccess("temp-token", matchedUser.name, matchedUser.id);
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err);
      Alert.alert("Login failed", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setFormErrors((prev) => ({ ...prev, email: undefined }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setFormErrors((prev) => ({ ...prev, password: undefined }));
        }}
        secureTextEntry
      />
      {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}

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
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 4,
  },
});

export default LoginScreen;
