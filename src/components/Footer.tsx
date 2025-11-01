import { Facebook, Instagram, Youtube, Mail } from "lucide-react";


export default function Footer() {
  return (
  <footer className="bg-emerald-950 text-gray-100 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 text-base">
  <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-start">
        {/* Columna 1 - Branding */}
    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex justify-center items-center mb-3">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1aVtEMOQvqJA7AGqSltXVq6QW9eyGMKNIA&s" alt="Logo Explorando La Convención" className="w-28 h-auto shadow-lg" />
            </div>
            <p className="font-semibold text-gray-200 dark:text-gray-300 max-w-md text-center sm:text-left leading-relaxed tracking-wide">
              Portal informativo dedicado a mostrar la riqueza natural, cultural y turística de la provincia de La Convención, Cusco. Explora destinos, consejos y experiencias únicas para viajeros y curiosos.
            </p>
          </div>

        {/* Columna 2 - Navegación */}
  <nav aria-label="Navegación principal" className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 text-white dark:text-yellow-400 tracking-wide">Navegación</h3>
          <ul className="flex flex-col gap-2 text-base">
            <li>
              <a href="/" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Inicio
              </a>
            </li>
            <li>
              <a href="/destinations" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Destinos
              </a>
            </li>
            <li>
              <a href="/gallery" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Galería
              </a>
            </li>
            <li>
              <a href="/tips" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Consejos de viaje
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* Columna 3 - Información */}
  <nav aria-label="Información legal" className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 text-white dark:text-yellow-400 tracking-wide">Información</h3>
          <ul className="flex flex-col gap-2 text-base">
            <li>
              <a href="#" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-2 py-1 font-semibold text-gray-200 hover:text-green-400 transition-colors">
                <span className="text-green-400 text-lg">›</span>Términos y condiciones
              </a>
            </li>
          </ul>
        </nav>

        {/* Columna 4 - Redes sociales */}
  <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold mb-4 text-white dark:text-yellow-400 tracking-wide">Síguenos</h3>
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
            <a href="https://facebook.com" className="group rounded-full p-2 bg-green-700 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-200" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} className="text-white group-hover:text-green-900 transition-colors duration-200" />
            </a>
            <a href="https://instagram.com" className="group rounded-full p-2 bg-green-700 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-200" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} className="text-white group-hover:text-green-900 transition-colors duration-200" />
            </a>
            <a href="https://youtube.com" className="group rounded-full p-2 bg-green-700 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-200" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube size={22} className="text-white group-hover:text-green-900 transition-colors duration-200" />
            </a>
            <a href="mailto:info@explorandolaconvencion.pe" className="group rounded-full p-2 bg-green-700 dark:bg-gray-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 transition-colors duration-200" aria-label="Email">
              <Mail size={22} className="text-white group-hover:text-green-900 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-600 mb-0" />
      <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-base text-gray-300 dark:text-gray-400 font-semibold gap-1">
        <span className="w-full text-center sm:text-left">© {new Date().getFullYear()} Explorando La Convención. Todos los derechos reservados.</span>
  <span className="w-full text-center sm:w-auto sm:text-right mt-1 sm:mt-0 whitespace-nowrap">Desarrollado por <a href="https://www.instagram.com/ezerzuniga.oficial16/" target="_blank" rel="noopener noreferrer" className="text-lime-400 relative transition-colors duration-200 hover:text-lime-300 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-lime-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Ezer Zuniga</a></span>
      </div>
    </footer>
  );
}
