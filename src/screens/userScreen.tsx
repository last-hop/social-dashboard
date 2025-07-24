import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image
} from 'react-native';
import { api } from '../services/api';
import { User, Post } from '../types/api';
import { useNavigation } from '@react-navigation/native';

const UserScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<any>();

  const fetchUser = async () => {
    try {
      const { data } = await api.getUsers();
      setUser(data[0]); // Assuming only 1 user for now
    } catch (err) {
      console.error('Failed to fetch user', err);
      Alert.alert('Error', 'Failed to load user profile');
    }
  };

  const fetchPosts = async (userId: number) => {
    try {
      const { data } = await api.getPosts();
      const userPosts = data.filter((post: Post) => post.userId === userId);
      setPosts(userPosts);
    } catch (err) {
      console.error('Failed to fetch posts', err);
      Alert.alert('Error', 'Failed to load posts');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) fetchPosts(user.id);
  }, [user]);

  const handleCreatePost = () => {
    navigation.navigate('CreatePost', { userId: user?.id });
  };

  const getInitials = (name: string) => {
    return name?.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <ScrollView style={styles.container}>
      {user ? (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>Username: {user.username}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            {user.phone && <Text style={styles.info}>Phone: {user.phone}</Text>}
            {user.website && <Text style={styles.info}>Website: {user.website}</Text>}
            {user.company?.name && (
              <Text style={styles.info}>Company: {user.company.name}</Text>
            )}
            {user.address && (
              <Text style={styles.info}>
                Address: {user.address.street}, {user.address.city}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.createPostBtn} onPress={handleCreatePost}>
            <Text style={styles.createPostText}>+ Create Post</Text>
          </TouchableOpacity>

          <Text style={styles.postHeader}>Your Posts</Text>
          {posts.map(post => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text>Loading user profile...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#4B7BE5',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  createPostBtn: {
    backgroundColor: '#4B7BE5',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  createPostText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  postHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  postBody: {
    fontSize: 14,
    color: '#444',
  },
});

export default UserScreen;
