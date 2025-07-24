import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { api } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const userId = route.params?.userId;

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Validation', 'Both title and body are required');
      return;
    }

    try {
      const response =await api.createPost({ title, body, userId });
      console.log('Post created:', response.data);
      Alert.alert('Success', 'Post created successfully');
      navigation.goBack();
    } catch (err) {
      console.error('Post creation failed', err);
      Alert.alert('Error', 'Failed to create post');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.header}>Create New Post</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#8ea1b2"
        />
        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={setBody}
          style={[styles.input, styles.bodyInput]}
          multiline
          placeholderTextColor="#8ea1b2"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eaf2fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: '90%',
    shadowColor: '#4B7BE5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a5c',
    marginBottom: 18,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#f4f7fa',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
    color: '#222',
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4B7BE5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 1,
  },
});

export default CreatePostScreen;
