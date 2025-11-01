import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../data/posts';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Formatear la fecha de manera más legible
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-blue-200"
      role="article"
      aria-label={`Artículo: ${post.title}`}
    >
      {/* Imagen del post */}
      <Link 
        to={`/post/${post.id}`} 
        className="relative h-52 overflow-hidden bg-gray-200 block"
        aria-label={`Ver artículo completo: ${post.title}`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay suave en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      {/* Contenido del card */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Título */}
        <Link to={`/post/${post.id}`} className="group/title">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover/title:text-blue-600 transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        
        {/* Extracto */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>
        
        {/* Separador sutil */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
        
        {/* Metadata con mejor espaciado */}
        <div className="space-y-2.5">
          {/* Autor */}
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 mr-2.5">
              <User size={14} className="text-blue-600" />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          
          {/* Fecha y tiempo de lectura */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-400" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
              <Clock size={13} className="text-gray-400" />
              <span className="font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Botón de acción */}
        <Link
          to={`/post/${post.id}`}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 group/btn focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label={`Leer el artículo completo: ${post.title}`}
        >
          <span>Leer artículo</span>
          <ArrowRight 
            size={18} 
            className="transform group-hover/btn:translate-x-1 transition-transform duration-200" 
          />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;