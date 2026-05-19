import React from 'react';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import { travelTips, TIP_ICONS } from '@/data/tips';
import { SectionHeader } from '@/components';

const Tips: React.FC = () => {
  return (
    <div className="wp-shell">
      <SEOHead 
        title="Consejos de Viaje - Guía Práctica para Viajeros"
        description="Consejos prácticos de viaje: presupuesto, equipaje, cultura, seguridad, fotografía y gastronomía para tu próxima aventura en La Convención."
        keywords="consejos de viaje, tips viajeros, presupuesto viaje, equipaje viaje, seguridad viaje, fotografía viaje"
        url={`${SITE_CONFIG.url}/tips`}
      />
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader
            title="Consejos de Viaje"
            subtitle="Aprende de nuestras experiencias y evita errores comunes con estos consejos prácticos para viajeros."
          />

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelTips.map((tipCategory, index) => (
              <div key={tipCategory.category} className="wp-card wp-card-interactive p-6 border-t-4 border-brand-primary animate-reveal-up" style={{ animationDelay: `${index * 0.08}s` }}>
                <h3 className="font-heading text-2xl font-semibold text-brand-text dark:text-white mb-4 flex items-center">
                  <span className="mr-3 text-2xl">{TIP_ICONS[tipCategory.category]}</span>
                  {tipCategory.category}
                </h3>
                <ul className="space-y-3">
                  {tipCategory.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-brand-primary dark:text-brand-primary/70 mr-2 mt-1 font-bold">•</span>
                      <span className="text-brand-text/75 dark:text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-16 wp-card p-8 text-center border-2 border-brand-primary/40">
            <h2 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-4">
              ¿Necesitas más ayuda?
            </h2>
            <p className="text-brand-text/75 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter semanal y recibe consejos exclusivos, 
              ofertas de viaje y guías detalladas directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="wp-input flex-1"
              />
              <button className="wp-btn-primary whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;

