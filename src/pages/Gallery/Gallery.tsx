import React from 'react';
import { MapPin } from 'lucide-react';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import { galleryImages } from '@/data/gallery';
import { SectionHeader } from '@/components';

const Gallery: React.FC = () => {
  return (
    <div className="wp-shell">
      <SEOHead 
        title="Galería de Fotos - La Convención en Imágenes"
        description="Explora nuestra galería fotográfica con los paisajes más impresionantes de La Convención, Cusco y Perú."
        keywords="galería fotos La Convención, fotografía paisajes Perú, imágenes Cusco, fotos viaje"
        url={`${SITE_CONFIG.url}/gallery`}
      />
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader
            title="Galería de Fotos"
            subtitle="Un vistazo visual a los destinos más increíbles de La Convención."
          />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="wp-card wp-card-interactive overflow-hidden group border-2 border-transparent hover:border-brand-primary">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/35 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center">
                      <span className="text-lg font-semibold">Ver más</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-xl font-semibold text-brand-text dark:text-white mb-1">{image.title}</h3>
                  <p className="text-brand-text/75 dark:text-slate-300 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {image.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-brand-text/75 dark:text-slate-300 mb-4">
              ¿Quieres ver más fotos de nuestros viajes?
            </p>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="wp-btn-primary inline-flex"
            >
              Síguenos en Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
