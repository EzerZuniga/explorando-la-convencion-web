import React from "react";
import { LegalPageLayout } from "./LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

export const Terms: React.FC = () => {
  return (
    <LegalPageLayout
      title="Términos y Condiciones"
      lastUpdated="Octubre 2024"
    >
      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">1. Aceptación de los términos</h2>
        <p>
          Al acceder y utilizar el sitio web <strong>{SITE_CONFIG.name}</strong>, usted acepta estar sujeto a estos Términos y Condiciones de Uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">2. Licencia de uso</h2>
        <p className="mb-4">
          Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de {SITE_CONFIG.name} solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Modificar o copiar los materiales.</li>
          <li>Utilizar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial).</li>
          <li>Intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio web.</li>
          <li>Eliminar cualquier derecho de autor u otras anotaciones de propiedad de los materiales.</li>
          <li>Transferir los materiales a otra persona o &ldquo;reflejar&rdquo; los materiales en cualquier otro servidor.</li>
        </ul>
        <p className="mt-4">
          Esta licencia terminará automáticamente si usted viola cualquiera de estas restricciones y puede ser terminada por {SITE_CONFIG.name} en cualquier momento.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">3. Descargo de responsabilidad</h2>
        <p>
          Los materiales en el sitio web de {SITE_CONFIG.name} se proporcionan &ldquo;tal cual&rdquo;. {SITE_CONFIG.name} no otorga garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluyendo, sin limitación, garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">4. Limitaciones</h2>
        <p>
          En ningún caso {SITE_CONFIG.name} o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surja del uso o la incapacidad de utilizar los materiales en el sitio web, incluso si {SITE_CONFIG.name} o un representante autorizado ha sido notificado verbalmente o por escrito de la posibilidad de tal daño.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">5. Precisión de los materiales</h2>
        <p>
          Los materiales que aparecen en el sitio web podrían incluir errores técnicos, tipográficos o fotográficos. {SITE_CONFIG.name} no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual. Podemos realizar cambios en los materiales contenidos en el sitio web en cualquier momento sin previo aviso.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">6. Enlaces</h2>
        <p>
          {SITE_CONFIG.name} no ha revisado todos los sitios vinculados a su sitio web y no es responsable del contenido de ninguno de dichos sitios vinculados. La inclusión de cualquier enlace no implica el respaldo por parte de {SITE_CONFIG.name} del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-text mb-4">7. Modificaciones</h2>
        <p>
          {SITE_CONFIG.name} puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones de Uso.
        </p>
      </section>
    </LegalPageLayout>
  );
};
