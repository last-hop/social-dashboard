import axios from 'axios';
import { User, Post, Comment } from '../types/api';

const jsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const dummyJson = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const api = {
  // User endpoints
  getUsers: () => jsonPlaceholder.get<User[]>('/users'),
  getUserById: (id: number) => jsonPlaceholder.get<User>(`/users/${id}`),
  getRichUsers: () => dummyJson.get<{ users: User[] }>('/users'),
  
  // Post endpoints
  getPosts: (page = 1, limit = 10) => 
    jsonPlaceholder.get<Post[]>(`/posts?_page=${page}&_limit=${limit}`),
  getPostById: (id: number) => jsonPlaceholder.get<Post>(`/posts/${id}`),
  createPost: (data: Omit<Post, 'id'>) => jsonPlaceholder.post<Post>('/posts', data),
  updatePost: (id: number, data: Partial<Post>) => 
    jsonPlaceholder.put<Post>(`/posts/${id}`, data),
  deletePost: (id: number) => jsonPlaceholder.delete(`/posts/${id}`),
  searchPosts: (query: string) => 
    dummyJson.get<{ posts: Post[] }>(`/posts/search?q=${query}`),
  
  // Comment endpoints
  getComments: (postId?: number) => 
    jsonPlaceholder.get<Comment[]>(`/comments${postId ? `?postId=${postId}` : ''}`),
};
