import React, { useState } from 'react';
import { Calendar, User, Tag, Search } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Los 10 Mejores Destinos de La Convención para 2025",
    excerpt: "Descubre los lugares imperdibles que debes visitar este año en nuestra hermosa provincia.",
    image: "/images/destinos/pueblo-magico.jpg",
    author: "María Rodríguez",
    date: "15 de Enero, 2025",
    category: "Destinos",
    readTime: "8 min"
  },
  {
    id: 2,
    title: "Guía Completa de Trekking en los Andes de La Convención",
    excerpt: "Todo lo que necesitas saber para preparar tu aventura de trekking en las montañas.",
    image: "/images/destinos/andes-trekking.jpg",
    author: "Carlos Mendoza",
    date: "10 de Enero, 2025",
    category: "Aventura",
    readTime: "10 min"
  },
  {
    id: 3,
    title: "Festivales y Tradiciones: El Calendario Cultural de La Convención",
    excerpt: "Conoce las festividades más importantes y cuándo celebrarlas en nuestra región.",
    image: "/images/galeria/fotografia.jpg",
    author: "Ana Silva",
    date: "5 de Enero, 2025",
    category: "Cultura",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Café de Altura: El Oro Verde de La Convención",
    excerpt: "Explora las plantaciones de café y aprende sobre el proceso que hace único a nuestro café.",
    image: "/images/galeria/comida-asiatica.jpg",
    author: "María Rodríguez",
    date: "28 de Diciembre, 2024",
    category: "Gastronomía",
    readTime: "7 min"
  },
  {
    id: 5,
    title: "Turismo Comunitario: Experiencias Auténticas",
    excerpt: "Vive con las comunidades locales y conoce sus costumbres de primera mano.",
    image: "/images/destinos/pueblo-magico.jpg",
    author: "Carlos Mendoza",
    date: "20 de Diciembre, 2024",
    category: "Cultura",
    readTime: "9 min"
  },
  {
    id: 6,
    title: "Consejos para Viajar en Temporada de Lluvias",
    excerpt: "Prepárate adecuadamente y disfruta al máximo tu visita en cualquier época del año.",
    image: "/images/viajes/presupuesto.jpg",
    author: "Ana Silva",
    date: "15 de Diciembre, 2024",
    category: "Tips",
    readTime: "5 min"
  }
];

const categories = ["Todos", "Destinos", "Aventura", "Cultura", "Gastronomía", "Tips"];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/destinos/andes-trekking.jpg" 
          alt="Blog" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Blog</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
            Historias, consejos y descubrimientos de La Convención
          </p>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="section-padding bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts del Blog */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                      </div>
                      <span className="text-emerald-600 font-medium">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-lg mb-8">Recibe las últimas noticias, consejos y artículos directamente en tu correo</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
