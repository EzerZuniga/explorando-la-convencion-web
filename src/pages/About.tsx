import React from 'react';
import { MapPin, Users, Heart, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/destinos/pueblo-magico.jpg" 
          alt="Sobre Nosotros" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">Conectando viajeros con la magia de La Convención</p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-emerald-50 rounded-xl p-8 shadow-md">
              <Target className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-3xl font-bold text-emerald-900 mb-4">Nuestra Misión</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Impulsar el turismo sostenible y la difusión cultural en la provincia de La Convención, 
                proporcionando información confiable, actualizada y de calidad para que cada viajero 
                descubra la riqueza natural, histórica y cultural de nuestra región.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 shadow-md">
              <Heart className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Nuestra Visión</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser el referente principal de información turística y cultural de La Convención, 
                reconocido por la calidad de nuestro contenido, el compromiso con la comunidad local 
                y la promoción responsable del patrimonio natural y cultural de la región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Explorando la Convención nació del amor por nuestra tierra y la pasión por compartir 
            sus maravillas con el mundo. En 2020, un grupo de entusiastas locales decidió crear 
            una plataforma que conectara a viajeros con los tesoros escondidos de La Convención.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Desde entonces, hemos crecido junto con nuestra comunidad, documentando destinos, 
            preservando tradiciones y promoviendo el turismo responsable. Cada artículo, fotografía 
            y recomendación refleja nuestro compromiso con la excelencia y el respeto por nuestra región.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Autenticidad</h3>
              <p className="text-gray-600">Información real y verificada de primera mano</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidad</h3>
              <p className="text-gray-600">Compromiso con el desarrollo local</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pasión</h3>
              <p className="text-gray-600">Amor por nuestra tierra y cultura</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sostenibilidad</h3>
              <p className="text-gray-600">Turismo responsable y ecológico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section-padding bg-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestro Equipo</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Somos un equipo multidisciplinario de guías, fotógrafos, escritores y amantes de La Convención, 
            dedicados a compartir la belleza y cultura de nuestra región con el mundo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <img 
                src="/images/autores/maria-rodriguez.jpg" 
                alt="María Rodríguez" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">María Rodríguez</h3>
              <p className="text-emerald-600 font-semibold mb-2">Fundadora y Directora</p>
              <p className="text-gray-600">Apasionada por el turismo sostenible y la cultura local</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <img 
                src="/images/autores/carlos-mendoza.jpg" 
                alt="Carlos Mendoza" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Carlos Mendoza</h3>
              <p className="text-emerald-600 font-semibold mb-2">Guía y Fotógrafo</p>
              <p className="text-gray-600">Experto en rutas de trekking y fotografía de naturaleza</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <img 
                src="/images/autores/ana-silva.jpg" 
                alt="Ana Silva" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ana Silva</h3>
              <p className="text-emerald-600 font-semibold mb-2">Editora de Contenido</p>
              <p className="text-gray-600">Especialista en cultura y gastronomía regional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
