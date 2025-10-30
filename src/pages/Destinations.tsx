import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { posts, categories } from '../data/posts';

const Destinations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Todos los Destinos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora nuestra colección completa de artículos sobre viajes, destinos y experiencias alrededor del mundo.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay artículos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;