import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import CustomButton from "../components/customButton";
import { api } from "../services/api";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Post } from "../types/api";

const EditPostScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { post: Post } }, "params">>();
  const navigation = useNavigation();
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = async () => {
    try {
      await api.updatePost(post.id, { title, body });
      Alert.alert("Success", "Post updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Update failed:", error);
      Alert.alert("Error", "Failed to update post");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Post</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Post Title"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={body}
        onChangeText={setBody}
        placeholder="Post Body"
        multiline
      />
      <CustomButton
        title="Update Post"
        onPress={handleUpdate}
        backgroundColor="#4B7BE5"
        width="100%"
        height={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default EditPostScreen;
