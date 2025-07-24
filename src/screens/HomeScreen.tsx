import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet
} from 'react-native';
import { Post } from '../types/api';
import { api } from '../services/api';
import PostCard from '../components/PostCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const HomeScreen: React.FC<{ userName: string; onLogout: () => void }> = ({ userName, onLogout }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await api.getPosts(page, 10);
      if (res.data.length > 0) {
        setPosts(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard title={item.title} body={item.body} />
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // replace with user image if available
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          if (!loading && hasMore) fetchPosts();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>User Options</Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              navigation.navigate('User');
            }}>
              <Text style={styles.modalOption}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              onLogout();
            }}>
              <Text style={styles.modalOption}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
    color: '#007bff',
  },
});

export default HomeScreen;
