import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

const Home: React.FC = () => {
  const featuredPosts = posts.filter(post => post.featured);
  return (
    <div className="min-h-screen">
      {/* Hero Section restaurado al inicio */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtLmESg9m4Ye5KSBetVfv5AqKodquKb3oMg&s" alt="Explora el mundo" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Explora el Mundo con Nosotros
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto drop-shadow">
            Descubre destinos increíbles, consejos de viaje y experiencias únicas alrededor del globo.
          </p>
          <Link
            to="/destinations"
            className="btn-primary bg-white text-primary-600 hover:bg-blue-50 inline-block shadow-lg"
          >
            Comenzar a Explorar
          </Link>
        </div>
      </section>

      {/* Bloque de Bienvenida profesional */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Título, beneficios y galería */}
          <div>
            <h2 className="text-emerald-700 text-4xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-sm uppercase">Explorando la Convención</h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 tracking-wide">Información turística y cultural de calidad</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-500 w-7 h-7" strokeWidth={2.2} />
                <span className="text-base md:text-lg text-gray-700 font-medium">Descubre información precisa y actualizada sobre destinos.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-500 w-7 h-7" strokeWidth={2.2} />
                <span className="text-base md:text-lg text-gray-700 font-medium">Toma mejores decisiones para tu viaje o aventura.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-500 w-7 h-7" strokeWidth={2.2} />
                <span className="text-base md:text-lg text-gray-700 font-medium">Aumenta tu conocimiento sobre cultura y naturaleza local.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-500 w-7 h-7" strokeWidth={2.2} />
                <span className="text-base md:text-lg text-gray-700 font-medium">Viaja informado y reduce imprevistos.</span>
              </li>
            </ul>
            {/* Mini galería profesional */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <img src="/images/galeria/fotografia.jpg" alt="Fotografía" className="rounded-xl shadow-md object-cover w-full h-32" />
              <img src="/images/destinos/andes-trekking.jpg" alt="Andes trekking" className="rounded-xl shadow-md object-cover w-full h-32" />
              <img src="/images/galeria/comida-asiatica.jpg" alt="Comida asiática" className="rounded-xl shadow-md object-cover w-full h-32" />
              <img src="/images/destinos/pueblo-magico.jpg" alt="Pueblo mágico" className="rounded-xl shadow-md object-cover w-full h-32" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Imágenes representativas de la región y experiencias únicas.</p>
          </div>
          {/* Columna derecha: Descripción, botones y contenido extra */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-emerald-700 mb-4 tracking-tight">Dando forma al turismo y la cultura</h4>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-medium">Nuestro objetivo es impulsar el turismo y la cultura en La Convención. Creemos que la información confiable, combinada con la experiencia local, puede ayudarte a disfrutar más tu viaje, aprender y conectar con la región. Ofrecemos recursos y guías para que tu experiencia sea memorable y segura.</p>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Link to="/destinations" className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-emerald-700 transition">Destinos</Link>
              <Link to="/gallery" className="bg-gray-100 text-emerald-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-emerald-100 transition">Galería</Link>
              <Link to="/tips" className="bg-gray-100 text-emerald-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-emerald-100 transition">Consejos</Link>
            </div>
            {/* Contenido extra profesional */}
            <div className="bg-emerald-50 rounded-xl p-6 shadow mb-2">
              <h5 className="text-lg font-bold text-emerald-800 mb-2">¿Por qué elegirnos?</h5>
              <ul className="list-disc list-inside text-gray-700 text-base space-y-2">
                <li>Equipo local apasionado por la cultura y el turismo.</li>
                <li>Guías y recursos exclusivos para viajeros exigentes.</li>
                <li>Actualizaciones constantes y atención personalizada.</li>
                <li>Compromiso con la sostenibilidad y el respeto por la región.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Artículos Destacados */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Artículos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-white">
        <img src="/images/destinos/pueblo-magico.jpg" alt="Explora el mundo" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Explora el Mundo con Nosotros
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto drop-shadow">
            Descubre destinos increíbles, consejos de viaje y experiencias únicas alrededor del globo.
          </p>
          <Link
            to="/destinations"
            className="btn-primary bg-white text-primary-600 hover:bg-blue-50 inline-block shadow-lg"
          >
            Comenzar a Explorar
          </Link>
        </div>
      </section>

      {/* Galería visual */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <img src="/images/galeria/fotografia.jpg" alt="Fotografía" className="rounded-lg shadow-md object-cover w-full h-40" />
            <img src="/images/galeria/comida-asiatica.jpg" alt="Comida asiática" className="rounded-lg shadow-md object-cover w-full h-40" />
            <img src="/images/destinos/pueblo-magico.jpg" alt="Pueblo mágico" className="rounded-lg shadow-md object-cover w-full h-40" />
            <img src="/images/destinos/andes-trekking.jpg" alt="Andes trekking" className="rounded-lg shadow-md object-cover w-full h-40" />
          </div>
        </div>
      </section>

      {/* Consejos de viaje */}
      <section className="section-padding bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">Consejos de Viaje</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2 text-emerald-700">Planifica tu viaje con anticipación</h3>
              <p className="text-gray-700">Investiga los destinos, reserva alojamiento y transportes con tiempo para evitar contratiempos.</p>
            </li>
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2 text-emerald-700">Empaca ligero y seguro</h3>
              <p className="text-gray-700">Lleva solo lo necesario y asegúrate de tener tus documentos y objetos de valor bien guardados.</p>
            </li>
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2 text-emerald-700">Conoce la cultura local</h3>
              <p className="text-gray-700">Respeta las costumbres y tradiciones de cada lugar que visites para una experiencia más enriquecedora.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Contacto */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-emerald-900">Contacto</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Nombre" className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <input type="email" placeholder="Correo electrónico" className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <textarea placeholder="Mensaje" className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400" rows={4} />
            <button type="submit" className="btn-primary bg-emerald-600 text-white hover:bg-emerald-700">Enviar</button>
          </form>
        </div>
      </section>

      {/* Ubicación Quillabamba */}
      <section className="section-padding bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-emerald-900">Ubicación: Quillabamba</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Quillabamba,+Cusco,+Peru&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Quillabamba"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;