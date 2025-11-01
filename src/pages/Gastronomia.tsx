import React from 'react';
import { Utensils, Coffee, Pizza, MapPin, Star } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  specialty: string;
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Café de Altura",
    description: "El mejor café orgánico cultivado en las montañas de La Convención, reconocido mundialmente por su sabor único y aroma intenso.",
    image: "/images/galeria/comida-asiatica.jpg",
    category: "Bebidas"
  },
  {
    id: 2,
    name: "Pachamanca de la Selva",
    description: "Plato tradicional cocinado bajo tierra con piedras calientes, combinando carnes, papas nativas y hierbas aromáticas de la región.",
    image: "/images/galeria/fotografia.jpg",
    category: "Platos Principales"
  },
  {
    id: 3,
    name: "Trucha a la Parrilla",
    description: "Trucha fresca de los ríos andinos, marinada con especias locales y asada a la perfección sobre brasas de leña.",
    image: "/images/destinos/pueblo-magico.jpg",
    category: "Platos Principales"
  },
  {
    id: 4,
    name: "Cacao Premium",
    description: "Chocolate artesanal elaborado con cacao orgánico de nuestras plantaciones, perfecto para degustar o llevar como recuerdo.",
    image: "/images/viajes/presupuesto.jpg",
    category: "Postres"
  },
  {
    id: 5,
    name: "Juane de La Selva",
    description: "Arroz con pollo envuelto en hojas de bijao, uno de los platos más emblemáticos de la región selvática.",
    image: "/images/galeria/comida-asiatica.jpg",
    category: "Platos Principales"
  },
  {
    id: 6,
    name: "Mazamorra Morada",
    description: "Postre tradicional peruano elaborado con maíz morado, frutas y especias, servido con arroz con leche.",
    image: "/images/destinos/andes-trekking.jpg",
    category: "Postres"
  }
];

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "El Mirador de Quillabamba",
    description: "Restaurante con vista panorámica que ofrece lo mejor de la gastronomía local con ingredientes frescos de la región.",
    image: "/images/destinos/pueblo-magico.jpg",
    location: "Quillabamba Centro",
    rating: 4.8,
    specialty: "Cocina Fusión"
  },
  {
    id: 2,
    name: "Café Orgánico Montaña",
    description: "Cafetería especializada en café de altura y postres artesanales, ideal para una tarde relajada.",
    image: "/images/galeria/fotografia.jpg",
    location: "Av. Principal",
    rating: 4.9,
    specialty: "Café y Repostería"
  },
  {
    id: 3,
    name: "Sabor Selvático",
    description: "Restaurante tradicional que conserva las recetas ancestrales de la cocina amazónica y andina.",
    image: "/images/galeria/comida-asiatica.jpg",
    location: "Plaza de Armas",
    rating: 4.7,
    specialty: "Cocina Tradicional"
  }
];

const Gastronomia: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/galeria/comida-asiatica.jpg" 
          alt="Gastronomía" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <Utensils className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Gastronomía</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
            Sabores auténticos de La Convención
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Un Viaje de Sabores</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            La gastronomía de La Convención es un reflejo de su diversidad geográfica y cultural. 
            Desde las alturas andinas hasta la selva tropical, cada plato cuenta una historia de 
            tradición, innovación y respeto por los ingredientes locales.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nuestro café de altura y cacao fino son reconocidos internacionalmente, mientras que 
            nuestros platos tradicionales mantienen vivas las recetas ancestrales de nuestros pueblos.
          </p>
        </div>
      </section>

      {/* Platos Típicos */}
      <section className="section-padding bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Pizza className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platos Típicos</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Descubre los sabores que hacen única a nuestra región
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map(dish => (
              <div key={dish.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {dish.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{dish.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Café y Cacao */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Coffee className="w-12 h-12 text-amber-600 mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Café y Cacao de Altura</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                La Convención es reconocida mundialmente por la calidad excepcional de su café 
                y cacao. Cultivados en las laderas de los Andes, entre 1,200 y 2,000 metros sobre 
                el nivel del mar, nuestros productos son el resultado de prácticas agrícolas sostenibles 
                y el cuidado de generaciones de productores.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Visita nuestras plantaciones, aprende sobre el proceso de cosecha y tostado, 
                y degusta el verdadero sabor del oro verde y marrón de La Convención.
              </p>
              <button className="bg-amber-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                Tour de Café y Cacao
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/galeria/comida-asiatica.jpg" 
                alt="Café" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="/images/destinos/pueblo-magico.jpg" 
                alt="Cacao" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="/images/galeria/fotografia.jpg" 
                alt="Plantación" 
                className="rounded-lg shadow-md w-full h-48 object-cover col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurantes Recomendados */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Restaurantes Recomendados</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Los mejores lugares para disfrutar de la gastronomía local
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-emerald-600 font-medium mb-3">{restaurant.specialty}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{restaurant.description}</p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para probar nuestros sabores?</h2>
          <p className="text-lg mb-8">
            Reserva un tour gastronómico y descubre los secretos culinarios de La Convención
          </p>
          <button className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg">
            Reservar Tour Gastronómico
          </button>
        </div>
      </section>
    </div>
  );
};

export default Gastronomia;
