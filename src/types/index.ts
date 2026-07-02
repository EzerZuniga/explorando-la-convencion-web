export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface User {
  email: string;
  name: string;
  picture?: string;
  provider?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
}

export interface TipCategory {
  category: string;
  tips: string[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  specialty: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}
