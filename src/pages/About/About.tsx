import React from 'react';
import {
  Target, Heart, MapPin, Users,
  Leaf, Star, Lightbulb, ArrowRight, Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import { useCounterAnimation } from '@/hooks';
import { teamMembers, values, stats } from '@/data/about';

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin, Users, Heart, Target, Leaf, Star, Lightbulb,
};

const toRgba = (hex: string, alpha: number): string => {
  const sanitized = hex.replace('#', '');
  if (sanitized.length !== 6) return `rgba(27, 67, 50, ${alpha})`;
  const r = parseInt(sanitized.slice(0, 2), 16);
  const g = parseInt(sanitized.slice(2, 4), 16);
  const b = parseInt(sanitized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in-up">
    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text dark:text-white mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-brand-text/75 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
        {subtitle}
      </p>
    )}
    <div className="w-16 h-1 bg-gradient-to-r from-brand-text/90 via-brand-text/55 to-brand-secondary mx-auto rounded-full mt-5" />
  </div>
);

const About: React.FC = () => {
  // Hooks de contadores — deben llamarse en el nivel superior (reglas de hooks)
  const c0 = useCounterAnimation(stats[0].value, 1500);
  const c1 = useCounterAnimation(stats[1].value, 2000);
  const c2 = useCounterAnimation(stats[2].value, 2500);
  const c3 = useCounterAnimation(stats[3].value, 1200);
  const counters = [c0, c1, c2, c3];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-background via-brand-background to-brand-secondary/15 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEOHead
        title="Nuestro Equipo - Explorando la Convención"
        description="Conoce al equipo detrás de Explorando la Convención: cinco quillabambinos apasionados por su tierra, su cultura y el turismo responsable."
        keywords="equipo explorando la convención, Quillabamba, turismo La Convención, misión, visión, sobre nosotros"
        url={`${SITE_CONFIG.url}/about`}
      />

      {/* ── Hero ── */}
      <section className="relative isolate min-h-[24rem] sm:min-h-[31rem] flex items-center justify-center text-white overflow-hidden">
        <img
          src="/images/fondohero.jpg"
          alt="La Convención, Cusco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1D18]/75 via-brand-text/55 to-brand-text/75" />
        <div className="absolute -left-24 -top-24 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -right-16 bottom-0 w-80 h-80 bg-brand-primary/25 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 animate-fade-in-up max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/25 mb-3">
            Quiénes somos
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
            Nuestro Equipo
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-light text-white/90 leading-relaxed">
            Somos locales que aman su tierra y trabajan cada día para que el mundo descubra
            la esencia natural y cultural de La Convención.
          </p>
        </div>
      </section>

      {/* ── Estadísticas ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-text via-brand-text to-brand-text/80 text-white py-12 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,180,0,0.18),transparent_40%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={counters[i].counterRef}
                className="animate-fade-in-up rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:bg-white/15"
                style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}
              >
                <div className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  {counters[i].count}
                  <span className="text-brand-secondary/45">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-white/85 mt-1.5 font-light leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Misión & Visión ── */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Lo que nos mueve cada día" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div className="animate-fade-in-up bg-white dark:bg-slate-900 rounded-2xl p-8 border border-brand-primary/15 dark:border-slate-700 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl">
              <div className="w-11 h-11 bg-brand-text/10 dark:bg-brand-text/30 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-text/20 dark:ring-brand-primary/30">
                <Target className="w-5 h-5 text-brand-text/90 dark:text-brand-primary/25" strokeWidth={1.9} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text dark:text-white mb-3">
                Nuestra Misión
              </h3>
              <p className="text-brand-text/75 dark:text-slate-300 leading-relaxed font-light">
                Impulsar el turismo sostenible y la difusión cultural en la provincia de La Convención,
                brindando información auténtica, actualizada y de calidad para que cada viajero descubra
                la riqueza natural, histórica y gastronómica de nuestra región.
              </p>
            </div>
            <div
              className="animate-fade-in-up bg-white dark:bg-slate-900 rounded-2xl p-8 border border-brand-primary/15 dark:border-slate-700 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl"
              style={{ animationDelay: '120ms', animationFillMode: 'both' }}
            >
              <div className="w-11 h-11 bg-brand-text/10 dark:bg-brand-text/30 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-text/20 dark:ring-brand-primary/30">
                <Heart className="w-5 h-5 text-brand-text/90 dark:text-brand-primary/25" strokeWidth={1.9} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text dark:text-white mb-3">
                Nuestra Visión
              </h3>
              <p className="text-brand-text/75 dark:text-slate-300 leading-relaxed font-light">
                Ser el referente principal de turismo y cultura en La Convención, reconocidos por nuestro
                contenido auténtico, nuestro compromiso con la comunidad local y la promoción responsable
                del patrimonio natural y cultural de Quillabamba y sus alrededores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-background to-brand-background dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Nuestra Historia" />
          <div
            className="animate-fade-in-up relative rounded-2xl border border-brand-background dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg space-y-5 text-brand-text/90 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-light"
            style={{ animationDelay: '120ms', animationFillMode: 'both' }}
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand-text/40 via-brand-text/70 to-brand-primary rounded-l-2xl" />
            <p>
              <strong className="text-brand-text dark:text-white font-semibold">
                Explorando la Convención
              </strong>{' '}
              nació de una pregunta simple: ¿por qué tan pocas personas conocen la maravilla que es
              Quillabamba? Nuestra provincia tiene selva, montañas, ríos cristalinos, una gastronomía
              única y una historia rica… pero muy poca presencia digital.
            </p>
            <p>
              En 2022, un grupo de jóvenes quillabambinos decidió cambiar eso. Armados de cámaras,
              libretas y mucho amor por su tierra, comenzaron a documentar cada rincón de La Convención:
              sus sabores, sus paisajes, sus festividades y su gente.
            </p>
            <p>
              Hoy somos cinco personas comprometidas con mostrarle al mundo que La Convención no es solo
              un destino más en el mapa, sino un lugar donde la naturaleza y la cultura se funden en una
              experiencia verdaderamente inolvidable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-16 sm:py-20 bg-white/85 dark:bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestros Valores"
            subtitle="Los principios que guían cada decisión, cada publicación y cada experiencia que compartimos."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, index) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <div
                  key={value.title}
                  className="group animate-fade-in-up flex gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border border-brand-primary/15 dark:border-slate-700 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg"
                  style={{ animationDelay: `${index * 70}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-10 h-10 bg-brand-text/10 dark:bg-brand-text/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-brand-text/15 dark:ring-brand-primary/20">
                    {IconComponent && (
                      <IconComponent
                        className="w-5 h-5 text-brand-text/90 dark:text-brand-primary/25 transition-colors duration-300"
                        strokeWidth={1.9}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-text dark:text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-brand-text/75 dark:text-slate-300 font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-background to-brand-secondary/15 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Las personas detrás del portal"
            subtitle="Cinco quillabambinos con distintas habilidades y un solo objetivo: poner a La Convención en el mapa."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group animate-fade-in-up bg-white dark:bg-slate-900 border border-brand-primary/15 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col motion-safe:hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: 'both',
                  boxShadow: `0 22px 35px -30px ${toRgba(member.color, 0.9)}`,
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`Foto representativa de ${member.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div
                    className="absolute left-4 bottom-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md border-2 border-white/85"
                    style={{ backgroundColor: member.color }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 px-5 pt-5 pb-4 flex flex-col h-full">
                  <h3 className="text-center font-heading text-xl font-bold text-brand-text dark:text-white leading-snug">
                    {member.name}
                  </h3>

                  <div
                    className="border-t mt-4 pt-3"
                    style={{ borderColor: toRgba(member.color, 0.25) }}
                  >
                    <p className="text-sm text-brand-text/75 dark:text-slate-300">Rol:</p>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-text dark:text-white">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-sm text-brand-text/75 dark:text-slate-300 leading-relaxed mt-4">
                    {member.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{
                          color: member.color,
                          backgroundColor: toRgba(member.color, 0.08),
                          borderColor: toRgba(member.color, 0.24),
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r from-brand-text via-brand-text/90 to-brand-text/80 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(244,180,0,0.28),transparent_42%)]" />
        <div className="max-w-2xl mx-auto text-center px-4 animate-fade-in-up">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">¿Quieres ser parte del equipo?</h2>
          <p className="text-white/90 font-light text-base sm:text-lg mb-8 leading-relaxed">
            Si amas La Convención y tienes algo que aportar —ya sea redactando, fotografiando, guiando
            o difundiendo— siempre estamos buscando personas apasionadas por nuestra región.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-white text-brand-text font-semibold px-8 py-4 rounded-lg hover:bg-brand-secondary/15 transition-all duration-300 motion-safe:hover:-translate-y-0.5 shadow-lg shadow-black/10"
          >
            <Mail className="w-5 h-5" />
            Contáctanos
            <ArrowRight className="w-4 h-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;



