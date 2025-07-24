import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  body: string;
};

const PostCard: React.FC<Props> = ({ title, body }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});

export default PostCard;
