export interface NavItem {
  name: string;
  href: string;
}

export const NAVIGATION: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Nuestro Equipo', href: '/about' },
  { name: 'Destinos', href: '/destinations' },
  { name: 'Gastronomía', href: '/gastronomia' },
  { name: 'Blog', href: '/blog' },
  { name: 'Galería', href: '/gallery' },
  { name: 'Tips', href: '/tips' },
  { name: 'Contacto', href: '/contact' },
] as const;

export const FOOTER_NAVIGATION = {
  main: [
    { name: 'Inicio', href: '/' },
    { name: 'Destinos', href: '/destinations' },
    { name: 'Galería', href: '/gallery' },
    { name: 'Consejos de viaje', href: '/tips' },
    { name: 'Contacto', href: '/contact' },
  ],
  info: [
    { name: 'Nuestro Equipo', href: '/about' },
    { name: 'Política de privacidad', href: '#' },
    { name: 'Términos y condiciones', href: '#' },
  ],
} as const;
