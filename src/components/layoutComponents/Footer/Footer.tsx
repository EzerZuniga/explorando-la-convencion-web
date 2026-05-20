import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/constants';
import { useLanguage } from '@/features/i18n';

export default function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  return (
    <footer className="bg-gradient-to-b from-brand-text via-brand-text to-brand-text text-brand-background dark:from-[#0F1D18] dark:via-[#13261F] dark:to-[#0F1D18] transition-colors duration-300 text-base">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-start">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <Link to="/" className="flex justify-center items-center mb-3 group">
            <img
              src="/images/logo footer.png"
              alt={footer.logoAlt}
              className="w-48 sm:w-56 md:w-64 h-auto shadow-lg transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <p className="text-white/90 max-w-md text-center sm:text-left leading-relaxed text-sm">
            {footer.description}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label={content.navbar.mainNavLabel} className="mb-6 md:mb-0">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">{footer.navigationTitle}</h3>
          <ul className="flex flex-col gap-2 text-base">
            {content.navigation.footerMain.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="flex items-center gap-2 px-2 py-1 text-white/90 hover:text-brand-primary/70 transition-colors">
                  <span className="text-brand-primary/80 text-lg">›</span>{item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Info */}
        <nav aria-label={footer.infoTitle} className="mb-6 md:mb-0">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">{footer.infoTitle}</h3>
          <ul className="flex flex-col gap-2 text-base">
            {content.navigation.footerInfo.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="flex items-center gap-2 px-2 py-1 text-white/90 hover:text-brand-primary/70 transition-colors">
                  <span className="text-brand-primary/80 text-lg">›</span>{item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">{footer.followTitle}</h3>
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
            <a href={SITE_CONFIG.social.facebook} className="group rounded-full p-2 bg-brand-text/70 border border-white/25 hover:bg-brand-primary hover:border-brand-primary/80 transition-colors duration-200" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} className="text-white group-hover:text-brand-text transition-colors duration-200" />
            </a>
            <a href={SITE_CONFIG.social.instagram} className="group rounded-full p-2 bg-brand-text/70 border border-white/25 hover:bg-brand-primary hover:border-brand-primary/80 transition-colors duration-200" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} className="text-white group-hover:text-brand-text transition-colors duration-200" />
            </a>
            <a href={SITE_CONFIG.social.youtube} className="group rounded-full p-2 bg-brand-text/70 border border-white/25 hover:bg-brand-primary hover:border-brand-primary/80 transition-colors duration-200" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube size={22} className="text-white group-hover:text-brand-text transition-colors duration-200" />
            </a>
            <a href={`mailto:${SITE_CONFIG.social.email}`} className="group rounded-full p-2 bg-brand-text/70 border border-white/25 hover:bg-brand-primary hover:border-brand-primary/80 transition-colors duration-200" aria-label="Email">
              <Mail size={22} className="text-white group-hover:text-brand-text transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-brand-primary/60 mb-0" />
      <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-white/80 gap-1">
        <span className="w-full text-center sm:text-left">© {new Date().getFullYear()} {SITE_CONFIG.name}. {footer.rights}</span>
        <span className="w-full text-center sm:w-auto sm:text-right mt-1 sm:mt-0 whitespace-nowrap">
          {footer.developedBy}{' '}
          <a href="https://www.instagram.com/ezerzuniga.oficial16/" target="_blank" rel="noopener noreferrer"
            className="text-brand-primary/80 relative transition-colors duration-200 hover:text-brand-primary/70 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-brand-primary/80 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
            Ezer Zuniga
          </a>
        </span>
      </div>
    </footer>
  );
}


