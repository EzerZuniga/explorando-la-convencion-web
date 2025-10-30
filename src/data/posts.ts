export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Descubriendo los Pueblos Mágicos de México",
    excerpt: "Un recorrido por los pueblos más encantadores y llenos de historia en el corazón de México.",
    content: "Los Pueblos Mágicos de México son destinos que destacan por su riqueza cultural, histórica y natural...",
    image: "/images/destinos/pueblo-magico.jpg",
    category: "Destinos",
    author: "María González",
    date: "2024-01-15",
    readTime: "5 min",
    featured: true
  },
  {
    id: 2,
    title: "Guía Completa para Viajar con Presupuesto Limitado",
    excerpt: "Aprende cómo explorar el mundo sin gastar una fortuna con estos consejos prácticos.",
    content: "Viajar no tiene que ser caro. Con una buena planificación y estos tips...",
    image: "/images/viajes/presupuesto.jpg",
    category: "Consejos",
    author: "Carlos Rodríguez",
    date: "2024-01-12",
    readTime: "7 min",
    featured: true
  },
  {
    id: 3,
    title: "Los Mejores Platillos de la Comida Callejera Asiática",
    excerpt: "Deléitate con los sabores auténticos de la comida callejera en el sudeste asiático.",
    content: "La comida callejera es el corazón de la cultura gastronómica en Asia...",
    image: "/images/galeria/comida-asiatica.jpg",
    category: "Gastronomía",
    author: "Ana Martínez",
    date: "2024-01-10",
    readTime: "4 min"
  },
  {
    id: 4,
    title: "Trekking en los Andes: Una Aventura Inolvidable",
    excerpt: "Experiencias y recomendaciones para hacer senderismo en la cordillera de los Andes.",
    content: "Los Andes ofrecen algunos de los paisajes más espectaculares para el trekking...",
    image: "/images/destinos/andes-trekking.jpg",
    category: "Aventura",
    author: "Luis Fernández",
    date: "2024-01-08",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Fotografía de Viajes: Captura Momentos Únicos",
    excerpt: "Técnicas y consejos para mejorar tus fotografías durante tus viajes.",
    content: "Una buena fotografía puede capturar la esencia de un lugar y preservar recuerdos...",
    image: "/images/galeria/fotografia.jpg",
    category: "Fotografía",
    author: "Sofia Chen",
    date: "2024-01-05",
    readTime: "8 min"
  },
  {
    id: 6,
    title: "Europa en Tren: El Viaje Más Pintoresco",
    excerpt: "Descubre la belleza de Europa a través de sus rutas ferroviarias más espectaculares.",
    content: "Viajar en tren por Europa es una experiencia única que combina comodidad y paisajes increíbles...",
    image: "/images/viajes/tren-europa.jpg",
    category: "Destinos",
    author: "David Miller",
    date: "2024-01-03",
    readTime: "5 min"
  }
];

export const categories = [
  "Todos",
  "Destinos",
  "Consejos",
  "Gastronomía",
  "Aventura",
  "Fotografía"
];