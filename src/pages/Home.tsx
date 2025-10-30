import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

const Home: React.FC = () => {
  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explora el Mundo con Nosotros
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Descubre destinos increíbles, consejos de viaje y experiencias únicas alrededor del globo.
            </p>
            <Link
              to="/destinations"
              className="btn-primary bg-white text-primary-600 hover:bg-blue-50 inline-block"
            >
              Comenzar a Explorar
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Publicaciones Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="btn-primary"
            >
              Ver Todos los Artículos
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Únete a Nuestra Comunidad
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Recibe los mejores consejos de viaje y destinos exclusivos directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-4 py-3 rounded-lg flex-1 min-w-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="btn-primary bg-white text-primary-600 hover:bg-blue-50 whitespace-nowrap">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;