// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Post } from '../types/api';
import { api } from '../services/api';
import  PostCard  from '../components/PostCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Welcome!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // replace with user image if available
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

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
    </View>
  );
};

export default HomeScreen;
