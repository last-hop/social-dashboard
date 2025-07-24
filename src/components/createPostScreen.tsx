import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { api } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const userId = route.params?.userId;

  const handleSubmit = async () => {
    if (!title || !body) {
      Alert.alert('Validation', 'Both title and body are required');
      return;
    }

    try {
      await api.createPost({ title, body, userId });
      Alert.alert('Success', 'Post created successfully');
      navigation.goBack();
    } catch (err) {
      console.error('Post creation failed', err);
      Alert.alert('Error', 'Failed to create post');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={[styles.input, { height: 120 }]}
        multiline
      />
      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default CreatePostScreen;
