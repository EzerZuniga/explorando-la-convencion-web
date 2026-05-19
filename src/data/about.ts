export interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  color: string;
  image: string;
  skills: string[];
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: 3,  suffix: '+',  label: 'Años compartiendo nuestra cultura' },
  { value: 50, suffix: '+',  label: 'Destinos documentados' },
  { value: 30, suffix: 'K+', label: 'Visitantes al mes' },
  { value: 5,  suffix: '',   label: 'Personas en el equipo' },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Ezer Benito Zúñiga Chura',
    role: 'Fundador & Desarrollador Web',
    description:
      'Estudiante de Ingeniería Informática y apasionado por la tecnología aplicada al turismo local. Creó esta plataforma para mostrar al mundo la riqueza cultural y natural de La Convención a través de soluciones digitales innovadoras. Quillabambino de nacimiento y corazón.',
    initials: 'EZ',
    color: '#1B4332',
    image: '/images/destinos/andes-trekking.jpg',
    skills: ['Desarrollo Web', 'Diseño UI/UX', 'SEO', 'Soluciones Digitales'],
  },
  {
    name: 'Keyla Milagros Mendoza Marín',
    role: 'Directora de Contenido',
    description:
      'Estudiante de Administración y Negocios Internacionales. Lidera la gestión estratégica y creación de guías que dan vida al portal, aplicando su visión empresarial para posicionar nuestra cultura en el mercado global. Orgullosamente quillabambina.',
    initials: 'KM',
    color: '#4BB543',
    image: '/images/destinos/pueblo-magico.jpg',
    skills: ['Gestión Estratégica', 'Redacción', 'Negocios Internacionales'],
  },
  {
    name: 'Diego Toribio Torres Quispe',
    role: 'Fotógrafo & Videógrafo',
    description:
      'Estudiante de Arquitectura con un ojo artístico único. Captura la esencia de La Convención a través de imágenes que resaltan la armonía entre el paisaje natural y la identidad urbana de nuestra región. Quillabambino de raíces y pasión.',
    initials: 'DT',
    color: '#4BB543',
    image: '/images/galeria/fotografia.jpg',
    skills: ['Fotografía', 'Edición de Video', 'Arquitectura'],
  },
  {
    name: 'Lucía Quena Quispe Valer',
    role: 'Guía Turística Local',
    description:
      'Estudiante de Derecho y guía oficial certificada. Combina su formación legal con su amor por la tierra para promover un turismo responsable, seguro y profundamente respetuoso con nuestro patrimonio. Natural de Quillabamba.',
    initials: 'LQ',
    color: '#4BB543',
    image: '/images/galeria/comida-asiatica.jpg',
    skills: ['Guiado Turístico', 'Derecho', 'Turismo Responsable'],
  },
  {
    name: 'Rodrigo Augusto Apaza Villavicencio',
    role: 'Gestor de Redes Sociales',
    description:
      'Estudiante de Ingeniería de Sistemas. Se encarga de la conectividad y el crecimiento digital del proyecto, optimizando nuestras plataformas para que la voz de La Convención llegue a cada rincón del mundo. Quillabambino digital.',
    initials: 'RA',
    color: '#35594D',
    image: '/images/viajes/tren-europa.jpg',
    skills: ['Ingeniería de Sistemas', 'Redes Sociales', 'Optimización Digital'],
  },
];

export const values: ValueItem[] = [
  {
    icon: 'Leaf',
    title: 'Sostenibilidad',
    description:
      'Promovemos un turismo responsable que respeta y preserva el ecosistema único de la selva alta de La Convención.',
  },
  {
    icon: 'Users',
    title: 'Comunidad',
    description:
      'Trabajamos junto a la comunidad local para que el desarrollo turístico beneficie directamente a las familias quillabambinas.',
  },
  {
    icon: 'Heart',
    title: 'Pasión',
    description:
      'Cada artículo, fotografía y guía refleja el profundo amor que sentimos por nuestra tierra, cultura y tradiciones.',
  },
  {
    icon: 'MapPin',
    title: 'Autenticidad',
    description:
      'Todo nuestro contenido es generado por locales, garantizando información real, verificada y de primera mano.',
  },
  {
    icon: 'Star',
    title: 'Identidad Cultural',
    description:
      'Somos guardianes del patrimonio histórico, gastronómico y cultural de La Convención para las generaciones futuras.',
  },
  {
    icon: 'Lightbulb',
    title: 'Innovación',
    description:
      'Usamos tecnología moderna para hacer que la experiencia de descubrir La Convención sea accesible y enriquecedora.',
  },
];


