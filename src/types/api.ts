export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  address?: {
    street: string;
    suite?: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  reactions?: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
