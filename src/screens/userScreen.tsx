import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { api } from "../services/api";
import { User, Post } from "../types/api";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/customButton";
import { LinearGradient } from "expo-linear-gradient";

type UserScreenProps = {
  onLogout: () => void;
};

const UserScreen: React.FC<UserScreenProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<any>();

  const fetchUser = async () => {
    try {
      const { data } = await api.getUsers();
      setUser(data[0]); // Assuming single user
    } catch (err) {
      console.error("Failed to fetch user", err);
      Alert.alert("Error", "Failed to load user profile");
    }
  };

  const fetchPosts = async (userId: number) => {
    try {
      const { data } = await api.getPosts();
      const userPosts = data.filter((post: Post) => post.userId === userId);
      setPosts(userPosts);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      Alert.alert("Error", "Failed to load posts");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) fetchPosts(user.id);
  }, [user]);

  const handleCreatePost = () => {
    navigation.navigate("CreatePost", { userId: user?.id });
  };

  const handleEditPost = (post: Post) => {
    navigation.navigate("EditPost", { post }); // Send post to edit screen
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }} />
      </View>

      {user ? (
        <>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={["#4B7BE5", "#00C2FF"]}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
            </LinearGradient>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>@{user.username}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <View style={styles.divider} />
            {user.phone && <Text style={styles.info}>📞 {user.phone}</Text>}
            {user.website && <Text style={styles.info}>🌐 {user.website}</Text>}
            {user.company?.name && (
              <Text style={styles.info}>🏢 {user.company.name}</Text>
            )}
            {user.address && (
              <Text style={styles.info}>
                📍 {user.address.street}, {user.address.city}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.createPostBtn}
            onPress={handleCreatePost}
          >
            <Text style={styles.createPostText}>+ Create Post</Text>
          </TouchableOpacity>

          <CustomButton
            title="Logout"
            onPress={onLogout}
            backgroundColor="#FF3B30"
            width={"85%"}
            height={40}
          />

          <Text style={styles.postHeader}>Your Posts</Text>
          <View style={styles.postsSection}>
            {posts.length === 0 ? (
              <Text style={{ color: "#888", textAlign: "center", marginTop: 12 }}>
                No posts yet.
              </Text>
            ) : (
              posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.postCard}
                  onPress={() => handleEditPost(post)}
                >
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <View style={styles.postDivider} />
                  <Text style={styles.postBody}>{post.body}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
          Loading user profile...
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f8fa",
    flex: 1,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 18,
    padding: 20,
    margin: 10,
    shadowColor: "#4B7BE5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#00C2FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 2,
    color: "#222",
  },
  info: {
    fontSize: 15,
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "80%",
    marginVertical: 10,
  },
  createPostBtn: {
    backgroundColor: "#4B7BE5",
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 32,
    elevation: 5,
    shadowOpacity: 0.08,
  },
  createPostText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
  },
  postHeader: {
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 10,
    marginLeft: 18,
    color: "#1e3a5c",
    letterSpacing: 1,
    marginTop: 20,
  },
  postsSection: {
    marginHorizontal: 8,
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 14,
    margin: 10,
    shadowColor: "#4B7BE5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#2d3a4b",
  },
  postDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 6,
  },
  postBody: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
});

export default UserScreen;
