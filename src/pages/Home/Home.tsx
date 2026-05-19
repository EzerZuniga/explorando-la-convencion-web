import { useState, type ReactNode } from 'react';
import {
  type LucideIcon,
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  HelpCircle,
  Leaf,
  MapPin,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '@/data/posts';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import WeatherWidget from '@/features/weather';
import ExchangeWidget from '@/features/exchange';
import QuoteWidget from '@/features/quotes';
import type { Post } from '@/types';

const SECTION_CLASS = 'py-14 sm:py-16 lg:py-20';
const CONTAINER_CLASS = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
const CARD_BORDER_CLASS = 'border border-[#E6ECEA] dark:border-slate-700';
const CARD_SURFACE_CLASS =
  'bg-white dark:bg-slate-900 border border-[#E6ECEA] dark:border-slate-800 shadow-[0_14px_35px_rgba(27,67,50,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(27,67,50,0.14)]';

const HERO_CTA_CLASS =
  'w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 bg-brand-primary text-brand-text text-xs sm:text-sm font-bold rounded-none transition-all duration-500 shadow-xl hover:shadow-2xl uppercase tracking-wide overflow-hidden';
const HERO_CTA_OVERLAY_CLASS =
  'absolute inset-0 bg-brand-text/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center';
const HERO_CTA_CONTENT_CLASS = 'relative z-10 group-hover:text-white transition-colors duration-500';
const HERO_CTA_ICON_CLASS = 'relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-500';

type PortalLink = {
  to: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

type Highlight = {
  title: string;
  description: string;
  image: string;
  to: string;
  label: string;
  meta: string;
};

type Stat = {
  value: string;
  label: string;
  description: string;
  Icon: LucideIcon;
};

type Pillar = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type FaqItem = {
  question: string;
  answer: string;
};

const portalLinks: PortalLink[] = [
  {
    to: '/destinations',
    title: 'Destinos',
    description: 'Rutas naturales, miradores, cascadas y puntos de interés.',
    Icon: MapPin,
  },
  {
    to: '/gastronomia',
    title: 'Gastronomía',
    description: 'Café, cacao, productos locales y sabores de selva alta.',
    Icon: Utensils,
  },
  {
    to: '/tips',
    title: 'Consejos',
    description: 'Clima, transporte, seguridad y recomendaciones prácticas.',
    Icon: Compass,
  },
  {
    to: '/blog',
    title: 'Blog',
    description: 'Guías, historias y novedades para planificar mejor.',
    Icon: Newspaper,
  },
  {
    to: '/gallery',
    title: 'Galería',
    description: 'Imágenes de paisajes, cultura, rutas y experiencias.',
    Icon: Camera,
  },
  {
    to: '/about',
    title: 'Cultura',
    description: 'Historia, identidad, festividades y memoria local.',
    Icon: Heart,
  },
];

const highlights: Highlight[] = [
  {
    title: 'Quillabamba como punto de partida',
    description:
      'Una base ideal para organizar recorridos por la provincia, conectar con servicios locales y acercarse a rutas naturales.',
    image: '/images/destinos/pueblo-magico.jpg',
    to: '/destinations',
    label: 'Ver destinos',
    meta: 'Rutas y orientación',
  },
  {
    title: 'Café, cacao y sabores locales',
    description:
      'Productos emblemáticos que ayudan a entender la identidad agrícola y gastronómica de La Convención.',
    image: '/images/galeria/comida-asiatica.jpg',
    to: '/gastronomia',
    label: 'Explorar gastronomía',
    meta: 'Sabores regionales',
  },
  {
    title: 'Naturaleza para visitar con calma',
    description:
      'Bosques, miradores y espacios verdes que conviene recorrer con información previa y respeto por el entorno.',
    image: '/images/galeria/fotografia.jpg',
    to: '/gallery',
    label: 'Ver galería',
    meta: 'Paisajes y cultura',
  },
];

const stats: Stat[] = [
  {
    value: '30+',
    label: 'distritos y sectores',
    description: 'Territorios con identidad propia y rutas por descubrir.',
    Icon: MapPin,
  },
  {
    value: '50+',
    label: 'atractivos referenciales',
    description: 'Cascadas, miradores, espacios culturales y rutas verdes.',
    Icon: Camera,
  },
  {
    value: '365',
    label: 'días para planificar',
    description: 'Clima cálido durante buena parte del año.',
    Icon: Calendar,
  },
];

const planningSteps: PortalLink[] = [
  {
    to: '/tips',
    title: 'Antes de viajar',
    description: 'Revisa clima, tiempos de traslado, presupuesto y servicios disponibles.',
    Icon: CheckCircle,
  },
  {
    to: '/destinations',
    title: 'Durante el recorrido',
    description: 'Prioriza rutas señalizadas, consulta orientación local y cuida los espacios naturales.',
    Icon: Compass,
  },
  {
    to: '/contact',
    title: 'Necesitas ayuda',
    description: 'Encuentra referencias de ubicación y canales para seguir explorando el portal.',
    Icon: HelpCircle,
  },
];

const portalPillars: Pillar[] = [
  {
    title: 'Información organizada',
    description: 'Secciones pensadas para consultar rápido sin perder contexto.',
    Icon: BookOpen,
  },
  {
    title: 'Turismo responsable',
    description: 'Recomendaciones para cuidar rutas, comunidades y espacios naturales.',
    Icon: Leaf,
  },
  {
    title: 'Planificación clara',
    description: 'Datos prácticos para revisar antes de decidir una ruta o actividad.',
    Icon: ShieldCheck,
  },
];

const faqs: FaqItem[] = [
  {
    question: '¿Cuál es la mejor época para visitar La Convención?',
    answer:
      'Se puede visitar durante gran parte del año. Para recorridos de naturaleza conviene revisar el clima y planificar con mayor cuidado en temporada de lluvias.',
  },
  {
    question: '¿Desde dónde se suele iniciar el recorrido?',
    answer:
      'Quillabamba funciona como punto principal de referencia por su conexión terrestre, servicios y cercanía a distintos atractivos.',
  },
  {
    question: '¿Qué información debería revisar antes de salir?',
    answer:
      'Clima, distancias, horarios de transporte, presupuesto, estado de rutas y recomendaciones básicas de seguridad.',
  },
  {
    question: '¿El portal solo muestra destinos turísticos?',
    answer:
      'No. También reúne gastronomía, cultura, consejos prácticos, publicaciones y datos útiles para entender mejor la provincia.',
  },
];

function HeroCta({ to, label, Icon }: { to: string; label: string; Icon: LucideIcon }) {
  return (
    <Link to={to} className={HERO_CTA_CLASS}>
      <span className={HERO_CTA_OVERLAY_CLASS}></span>
      <span className={HERO_CTA_CONTENT_CLASS}>{label}</span>
      <Icon className={HERO_CTA_ICON_CLASS} strokeWidth={1.75} />
    </Link>
  );
}

function SectionHeader({
  title,
  description,
  tone = 'light',
  action,
}: {
  title: string;
  description: string;
  tone?: 'light' | 'dark';
  action?: ReactNode;
}) {
  const isDark = tone === 'dark';

  return (
    <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
      <div>
        <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight uppercase ${isDark ? 'text-white' : 'text-brand-text dark:text-white'}`}>
          {title}
        </h2>
        <div className={`w-14 h-1 mt-3 mb-4 mx-auto ${isDark ? 'bg-white/80' : 'bg-brand-primary'}`}></div>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-white/85' : 'text-gray-600 dark:text-gray-300'}`}>
          {description}
        </p>
      </div>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

function TextLinkButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-brand-text text-xs sm:text-sm font-bold uppercase tracking-wide shadow-[0_10px_22px_rgba(75,181,67,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-text hover:text-white hover:shadow-[0_16px_30px_rgba(27,67,50,0.22)] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950"
    >
      {children}
      <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
    </Link>
  );
}

function PortalLinkCard({ to, title, description, Icon }: PortalLink) {
  return (
    <Link
      to={to}
      className={`group relative block h-full overflow-hidden ${CARD_SURFACE_CLASS} p-6 hover:border-brand-primary animate-reveal-up`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 bg-brand-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"></div>
      <div className="relative z-10 flex h-full items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-brand-background dark:bg-slate-800 border border-brand-primary/25 flex items-center justify-center shadow-inner transition-all duration-300 group-hover:bg-brand-primary group-hover:text-brand-text group-hover:scale-105">
          <Icon className="w-5 h-5 text-brand-text dark:text-white transition-colors duration-300 group-hover:text-brand-text" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-brand-text dark:text-white uppercase tracking-wide mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-text dark:text-white transition-colors duration-300 group-hover:text-brand-primary">
            Explorar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PlanningStepCard({
  stepNumber,
  to,
  title,
  description,
  Icon,
}: PortalLink & { stepNumber: number }) {
  return (
    <Link
      to={to}
      className="group relative block h-full overflow-hidden border border-[#DDE9E2] bg-white p-6 shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(27,67,50,0.18)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.06] dark:text-white/[0.05]">
        {String(stepNumber).padStart(2, '0')}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-brand-primary/30 bg-brand-background text-brand-text shadow-inner transition-colors duration-300 group-hover:bg-brand-primary dark:bg-slate-800 dark:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <span className="rounded-full bg-brand-background px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:bg-brand-primary dark:bg-slate-800 dark:text-white">
            Paso {stepNumber}
          </span>
        </div>

        <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-brand-text dark:text-white">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:text-brand-primary dark:text-white">
          Ver detalle
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  );
}

function CarouselControls({
  current,
  total,
  onPrevious,
  onNext,
}: {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        className="w-10 h-10 inline-flex items-center justify-center border border-brand-text/20 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-brand-text dark:text-white shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Elemento anterior"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
      </button>
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
        {current + 1}/{total}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="w-10 h-10 inline-flex items-center justify-center border border-brand-text/20 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-brand-text dark:text-white shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Elemento siguiente"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function HighlightsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = highlights[activeIndex];

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? highlights.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % highlights.length);
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] bg-white dark:bg-slate-900 border border-[#DDE9E2] dark:border-slate-800 shadow-[0_24px_70px_rgba(27,67,50,0.14)] overflow-hidden">
      <div className="relative min-h-[300px] sm:min-h-[380px]">
        <img key={active.image} src={active.image} alt={active.title} className="absolute inset-0 w-full h-full object-cover animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-brand-text/10"></div>
        <div className="absolute left-5 right-5 bottom-5 sm:left-8 sm:right-8 sm:bottom-8 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-primary mb-2">{active.meta}</p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight max-w-2xl">{active.title}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 bg-gradient-to-br from-white via-brand-background to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div>
          <Sparkles className="w-7 h-7 text-brand-primary mb-5" strokeWidth={1.75} />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {active.description}
          </p>
          <TextLinkButton to={active.to}>{active.label}</TextLinkButton>
        </div>

        <div className="flex items-center justify-between gap-4">
          <CarouselControls
            current={activeIndex}
            total={highlights.length}
            onPrevious={showPrevious}
            onNext={showNext}
          />
          <div className="hidden sm:flex items-center gap-2">
            {highlights.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 transition-all ${index === activeIndex ? 'w-8 bg-brand-primary' : 'w-2.5 bg-gray-300 dark:bg-slate-700'}`}
                aria-label={`Ver destacado ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map(({ value, label, description, Icon }) => (
        <article
          key={label}
          className="group relative overflow-hidden border border-[#DDE9E2] bg-white p-6 shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(27,67,50,0.18)] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.05] dark:text-white/[0.05]">
            {value}
          </div>
          <div className="relative z-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-brand-primary/30 bg-brand-background text-brand-text shadow-inner transition-colors duration-300 group-hover:bg-brand-primary dark:bg-slate-800 dark:text-white">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-brand-text dark:text-white">{value}</span>
            </div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-text dark:text-white">{label}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function IdentityBand() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#123A2B] via-brand-text to-[#2F8F45] text-white shadow-[0_28px_80px_rgba(27,67,50,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(75,181,67,0.35),transparent_36%)]"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-white/35"></div>
      <div className="relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col justify-center animate-reveal-up">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary mb-3">Portal informativo</p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white drop-shadow-sm">
            Información clara para recorrer La Convención con más contexto.
          </h3>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Reunimos rutas, consejos, cultura, publicaciones y datos útiles en una experiencia ordenada para visitantes, vecinos y personas que quieren conocer mejor la provincia.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {portalPillars.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group bg-white/[0.14] border border-white/25 p-5 backdrop-blur-md shadow-[0_18px_42px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.2] hover:shadow-[0_24px_54px_rgba(0,0,0,0.22)]"
            >
              <div className="w-11 h-11 bg-white text-brand-text flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-2 text-white">{title}</h4>
              <p className="text-sm text-white/86 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostsCarousel({ featuredPosts }: { featuredPosts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = featuredPosts[activeIndex] ?? featuredPosts[0];

  if (!activePost) return null;

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? featuredPosts.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % featuredPosts.length);
  };

  return (
    <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
      <article className={`${CARD_SURFACE_CLASS} overflow-hidden hover:translate-y-0`}>
        <img key={activePost.image} src={activePost.image} alt={activePost.title} className="w-full h-56 sm:h-72 object-cover animate-fade-in" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
            <span className="text-brand-primary uppercase tracking-wide">{activePost.category}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
              {activePost.readTime}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-brand-text dark:text-white leading-tight mb-3">
            {activePost.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {activePost.excerpt}
          </p>
          <TextLinkButton to="/blog">Leer publicaciones</TextLinkButton>
        </div>
      </article>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-brand-text dark:text-white uppercase tracking-wide">Publicaciones destacadas</h3>
          <CarouselControls
            current={activeIndex}
            total={featuredPosts.length}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        </div>

        <div className="grid gap-4">
          {featuredPosts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`text-left p-4 border shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${index === activeIndex ? 'border-brand-primary bg-brand-background dark:bg-slate-800 shadow-[0_12px_28px_rgba(27,67,50,0.12)]' : 'border-[#E6ECEA] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-primary hover:shadow-md'}`}
            >
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">{post.category}</span>
              <span className="block text-sm font-bold text-brand-text dark:text-white mt-1">{post.title}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-2">{post.readTime}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqList() {
  return (
    <div className="grid gap-4">
      {faqs.map(({ question, answer }) => (
        <details key={question} className="group bg-white dark:bg-slate-900 border border-[#E6ECEA] dark:border-slate-800 p-5 shadow-[0_10px_25px_rgba(27,67,50,0.07)] transition-all duration-300 open:border-brand-primary open:shadow-[0_16px_34px_rgba(27,67,50,0.12)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm sm:text-base font-bold text-brand-text dark:text-white">
            {question}
            <ChevronRight className="w-5 h-5 flex-shrink-0 text-brand-primary transition-transform group-open:rotate-90" strokeWidth={1.75} />
          </summary>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </details>
      ))}
    </div>
  );
}

function LocationInfoCard({ to, title, description, Icon }: PortalLink) {
  return (
    <Link
      to={to}
      className="group block bg-white dark:bg-slate-900 border border-[#DDE9E2] dark:border-slate-800 p-5 sm:p-6 shadow-[0_14px_34px_rgba(27,67,50,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_20px_44px_rgba(27,67,50,0.14)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-brand-background dark:bg-slate-800 border border-brand-primary/30 flex items-center justify-center text-brand-text dark:text-white transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-brand-text">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-text dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function LocationCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
      <div className="rounded-none overflow-hidden shadow-[0_22px_55px_rgba(27,67,50,0.16)] border border-brand-primary dark:border-slate-800 h-full min-h-[360px]">
        <iframe
          src="https://www.google.com/maps?q=Quillabamba,+Cusco,+Peru&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '360px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Quillabamba"
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="bg-brand-background/70 dark:bg-slate-900/70 border border-[#DDE9E2] dark:border-slate-800 p-4 sm:p-5 shadow-[0_18px_45px_rgba(27,67,50,0.08)]">
        <div className="space-y-4">
        <LocationInfoCard
          to="/destinations"
          title="Ubicación"
          description="Quillabamba, capital de la provincia de La Convención, región Cusco, Perú."
          Icon={MapPin}
        />
        <LocationInfoCard
          to="/tips"
          title="Acceso"
          description="Aproximadamente 4 a 5 horas por vía terrestre desde la ciudad del Cusco, según ruta y clima."
          Icon={Compass}
        />
        <LocationInfoCard
          to="/contact"
          title="Referencia útil"
          description="Usa el mapa como punto inicial para organizar rutas, tiempos y servicios."
          Icon={CheckCircle}
        />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const featuredPosts = posts.filter(({ featured }) => featured);

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-slate-950">
      <SEOHead
        title="Explorando la Convención - Blog de Viajes y Turismo en Perú | Guías Completas"
        description="Descubre los mejores destinos turísticos de La Convención, Cusco y Perú. Guías de viaje, consejos prácticos, gastronomía y experiencias únicas de aventura."
        keywords="La Convención, turismo Cusco, viajes Perú, destinos turísticos, blog de viajes, guías de viaje, aventuras, gastronomía peruana"
        url={SITE_CONFIG.url}
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline poster="/images/fondohero.jpg" className="w-full h-full object-cover" aria-hidden="true">
            <source src="/video/meganto3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight px-4 tracking-tight">
              Descubre la magia de
              <span className="block bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary bg-clip-text text-transparent mt-2 drop-shadow-lg">
                La Convención
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md font-light">
              Información clara para descubrir naturaleza, cultura y sabores locales en el corazón cálido de Cusco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 px-4">
              <HeroCta to="/destinations" label="Explorar Destinos" Icon={Compass} />
              <HeroCta to="/gallery" label="Ver Galería" Icon={Camera} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-brand-background dark:bg-slate-950`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Explora el portal"
            description="Encuentra rápido las secciones principales para conocer, planificar y consultar información útil de La Convención."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portalLinks.map((item) => (
              <PortalLinkCard key={item.to} {...item} />
            ))}
          </div>
          <div className="mt-8 sm:mt-10">
            <IdentityBand />
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-b from-white via-white to-brand-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-900`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Información para planificar"
            description="Datos de apoyo para revisar clima, referencia de cambio y mensajes útiles antes de organizar tu visita."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherWidget />
            <ExchangeWidget />
            <QuoteWidget />
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-br from-brand-background via-white to-[#EAF5EC] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Destacados de La Convención"
            description="Un resumen visual con temas clave para empezar a recorrer el portal con mejor contexto."
          />
          <HighlightsCarousel />
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white dark:bg-slate-950`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="La provincia en breve"
            description="Cifras referenciales presentadas como guía inicial para entender la escala natural y cultural del territorio."
          />
          <StatStrip />
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-b from-brand-background to-[#EAF5EC] dark:from-slate-900 dark:to-slate-950`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Últimas publicaciones"
            description="Guías y artículos seleccionados para ampliar la información antes de tu visita."
            action={<TextLinkButton to="/blog">Ver blog</TextLinkButton>}
          />
          <PostsCarousel featuredPosts={featuredPosts} />
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white dark:bg-slate-950`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Prepara tu visita"
            description="Tres pasos simples para pasar de la inspiración a una ruta bien organizada."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {planningSteps.map((step, index) => (
              <PlanningStepCard key={step.title} stepNumber={index + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-br from-brand-text via-[#26724f] to-brand-primary dark:from-slate-950 dark:via-brand-text dark:to-[#26724f]`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Preguntas frecuentes"
            description="Respuestas rápidas para resolver dudas comunes antes de explorar las secciones del portal."
            tone="dark"
          />
          <FaqList />
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-b from-white to-brand-background dark:from-slate-950 dark:to-slate-900`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title="Encuéntranos"
            description="Referencia principal para ubicar Quillabamba y planificar el acceso a la provincia."
          />
          <LocationCard />
        </div>
      </section>
    </div>
  );
}

export default Home;
