import React from 'react';

const Gallery: React.FC = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/images/galeria/montañas.jpg",
      title: "Montañas Majestuosas",
      location: "Andes, Perú"
    },
    {
      id: 2,
      src: "/images/galeria/playa.jpg",
      title: "Playas Tropicales",
      location: "Caribe, México"
    },
    {
      id: 3,
      src: "/images/galeria/ciudad.jpg",
      title: "Ciudades Antiguas",
      location: "Europa"
    },
    {
      id: 4,
      src: "/images/galeria/desierto.jpg",
      title: "Desiertos Infinitos",
      location: "Sahara, África"
    },
    {
      id: 5,
      src: "/images/galeria/bosque.jpg",
      title: "Bosques Mágicos",
      location: "Amazonas, Brasil"
    },
    {
      id: 6,
      src: "/images/galeria/aurora.jpg",
      title: "Auroras Boreales",
      location: "Noruega"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Galería de Fotos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un vistazo visual a los destinos más increíbles que hemos visitado alrededor del mundo.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="card group">
                <div className="relative overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary-100 to-blue-200 flex items-center justify-center">
                    <span className="text-4xl">🌄</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center">
                      <span className="text-lg font-semibold">Ver más</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-gray-600 text-sm">📍 {image.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ¿Quieres ver más fotos de nuestros viajes?
            </p>
            <button className="btn-primary">
              Síguenos en Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;