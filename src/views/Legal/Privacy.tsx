import React from "react";
import { LegalPageLayout } from "./LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

export const Privacy: React.FC = () => {
  return (
    <LegalPageLayout
      title="Política de Privacidad"
      lastUpdated="Octubre 2024"
    >
      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">1. Introducción</h2>
        <p>
          En <strong>{SITE_CONFIG.name}</strong>, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad describe cómo recopilamos, usamos, almacenamos y compartimos su información cuando visita nuestro sitio web o interactúa con nuestros servicios.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">2. Información que recopilamos</h2>
        <p className="mb-4">
          Recopilamos varios tipos de información para mejorar nuestros servicios y ofrecerle una mejor experiencia de usuario:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Información personal:</strong> Como su nombre, dirección de correo electrónico o número de teléfono, cuando usted nos la proporciona voluntariamente (por ejemplo, al suscribirse a nuestro boletín o contactarnos).</li>
          <li><strong>Datos de uso:</strong> Información sobre cómo accede y utiliza el sitio (páginas visitadas, tiempo de permanencia, enlaces en los que hace clic).</li>
          <li><strong>Datos técnicos:</strong> Su dirección IP, tipo de navegador, sistema operativo y otra información técnica similar recopilada automáticamente mediante cookies y tecnologías similares.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">3. Uso de la información</h2>
        <p className="mb-4">La información que recopilamos se utiliza para los siguientes propósitos:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Proveer, operar y mantener nuestro sitio web.</li>
          <li>Mejorar, personalizar y expandir nuestros servicios y contenido.</li>
          <li>Comprender y analizar cómo utiliza nuestro sitio web.</li>
          <li>Comunicarnos con usted, ya sea directamente o a través de uno de nuestros socios, incluyendo el servicio al cliente y fines promocionales.</li>
          <li>Enviarle correos electrónicos con información relevante y actualizaciones.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">4. Compartir información</h2>
        <p>
          No vendemos, intercambiamos ni transferimos de ninguna otra manera su información personal identificable a terceros sin su consentimiento, excepto para aquellos terceros de confianza que nos asisten en la operación de nuestro sitio web, la realización de nuestro negocio o el servicio a usted, siempre y cuando dichas partes acuerden mantener esta información confidencial.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">5. Seguridad de los datos</h2>
        <p>
          Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal. Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Por lo tanto, aunque nos esforzamos por utilizar medios comercialmente aceptables para proteger su información personal, no podemos garantizar su seguridad absoluta.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">6. Sus derechos</h2>
        <p>
          Usted tiene el derecho de acceder, corregir o eliminar su información personal que tenemos almacenada. Si desea ejercer estos derechos o tiene preguntas sobre cómo manejamos sus datos, puede contactarnos utilizando la información proporcionada al final de esta política.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">7. Contacto</h2>
        <p>
          Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Por correo electrónico: <a href={`mailto:${SITE_CONFIG.social.email}`} className="text-brand-primary hover:underline font-medium">{SITE_CONFIG.social.email}</a></li>
          <li>Visitando nuestra página de <a href="/contact" className="text-brand-primary hover:underline font-medium">contacto</a>.</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
};
