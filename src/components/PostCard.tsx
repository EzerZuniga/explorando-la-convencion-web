import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../data/posts';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="card fade-in h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span>✏️ {post.author}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{post.date}</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
        
        <Link
          to={`/post/${post.id}`}
          className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;