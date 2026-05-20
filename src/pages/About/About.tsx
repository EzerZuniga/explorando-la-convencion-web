import React from 'react';
import {
  ArrowRight,
  Heart,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Star,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/features/seo';
import { SITE_CONFIG } from '@/constants';
import { useLanguage } from '@/features/i18n';
import { useCounterAnimation } from '@/hooks';

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Users,
  Heart,
  Target,
  Leaf,
  Star,
  Lightbulb,
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
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) => {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={`mb-10 flex flex-col ${alignment} animate-reveal-up`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-0 max-w-3xl font-heading text-3xl font-bold leading-tight text-brand-text dark:text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mt-5 h-1 w-20 rounded bg-gradient-to-r from-brand-text via-brand-primary to-brand-secondary" />
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-brand-text/75 dark:text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const navItems = [
  { href: '#proposito', label: 'Propósito' },
  { href: '#historia', label: 'Historia' },
  { href: '#valores', label: 'Valores' },
  { href: '#equipo', label: 'Equipo' },
];

const TEAM_CARD_ACCENT = '#1B4332';

const About: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.about;
  const c0 = useCounterAnimation(page.stats[0].value, 1500);
  const c1 = useCounterAnimation(page.stats[1].value, 2000);
  const c2 = useCounterAnimation(page.stats[2].value, 2500);
  const c3 = useCounterAnimation(page.stats[3].value, 1200);
  const counters = [c0, c1, c2, c3];

  return (
    <div className="min-h-screen bg-brand-background text-brand-text dark:bg-slate-950 dark:text-slate-100">
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.seoKeywords}
        url={`${SITE_CONFIG.url}/about`}
      />

      <section className="relative isolate overflow-hidden bg-brand-text text-white">
        <img
          src="/images/fondohero.jpg"
          alt="Mural turístico de La Convención"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D18]/95 via-brand-text/82 to-brand-text/52" />

        <div className="relative mx-auto grid min-h-[34rem] max-w-7xl grid-cols-1 items-end gap-10 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8 lg:pb-14">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="mb-4 inline-flex border-l-4 border-brand-secondary bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
              {page.heroEyebrow}
            </p>
            <h1 className="mb-5 font-heading text-4xl font-bold leading-[1.05] text-white drop-shadow sm:text-6xl lg:text-7xl">
              {page.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/92 sm:text-xl">
              {page.heroDescription}
            </p>
          </div>

          <aside className="animate-fade-in-up border border-white/20 bg-white/12 p-5 backdrop-blur-md lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-secondary">
              Guía rápida
            </p>
            <nav className="mt-4 grid grid-cols-2 gap-2" aria-label="Secciones de Nuestro Equipo">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border border-white/20 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition duration-300 hover:border-brand-secondary hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <section className="border-y border-brand-text/10 bg-brand-text text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/12 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
          {page.stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={counters[i].counterRef}
              className="animate-reveal-up px-3 py-7 text-center sm:px-5"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="font-heading text-4xl font-bold leading-none text-white sm:text-5xl">
                {counters[i].count}
                <span className="text-brand-secondary">{stat.suffix}</span>
              </div>
              <p className="mx-auto mt-3 max-w-36 text-sm leading-5 text-white/82">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="proposito" className="scroll-mt-24 bg-white py-16 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={page.missionVisionTitle} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: page.missionTitle,
                description: page.missionDescription,
              },
              {
                icon: Heart,
                title: page.visionTitle,
                description: page.visionDescription,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group animate-reveal-up border border-brand-text/12 bg-brand-background/45 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-primary/45 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-900 sm:p-8"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-brand-text/15 bg-white text-brand-text transition duration-300 group-hover:border-brand-primary group-hover:text-brand-primary dark:border-slate-700 dark:bg-slate-950 dark:text-brand-primary">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-bold text-brand-text dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-base leading-8 text-brand-text/76 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="historia" className="scroll-mt-24 border-y border-brand-text/10 bg-brand-background py-16 dark:border-slate-800 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionHeader title={page.historyTitle} align="left" />
          <article className="animate-reveal-up border-l-4 border-brand-primary bg-white p-6 shadow-lg shadow-brand-text/8 dark:bg-slate-950 sm:p-9">
            <div className="space-y-6 text-base leading-8 text-brand-text/78 dark:text-slate-300 sm:text-lg">
              {page.historyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="valores" className="scroll-mt-24 bg-white py-16 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={page.valuesTitle} subtitle={page.valuesSubtitle} />
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-brand-text/10 bg-brand-text/10 dark:border-slate-700 dark:bg-slate-700 sm:grid-cols-2 lg:grid-cols-3">
            {page.values.map((value, index) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <article
                  key={value.title}
                  className="group animate-reveal-up bg-white p-6 transition duration-300 hover:bg-brand-background dark:bg-slate-900 dark:hover:bg-slate-800 sm:p-7"
                  style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-brand-text/15 bg-brand-background text-brand-text transition duration-300 group-hover:border-brand-primary group-hover:bg-white group-hover:text-brand-primary dark:border-slate-700 dark:bg-slate-950 dark:text-brand-primary">
                    {IconComponent && <IconComponent className="h-5 w-5" strokeWidth={2} />}
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-brand-text dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-7 text-brand-text/72 dark:text-slate-300">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="equipo" className="scroll-mt-24 bg-gradient-to-b from-brand-background via-white to-[#FFF3E3] py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={page.teamTitle} subtitle={page.teamSubtitle} />

          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-text/16 to-transparent lg:block" />

            <div className="space-y-10 sm:space-y-12">
              {page.teamMembers.map((member, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <article
                    key={member.name}
                    className="group relative animate-reveal-up"
                    style={{
                      animationDelay: `${index * 90}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <div
                      className={`relative grid items-center gap-6 overflow-hidden border bg-white p-5 backdrop-blur-sm dark:bg-slate-900 sm:p-7 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10 lg:p-8 ${
                        isReversed ? 'lg:grid-cols-[minmax(0,1fr)_17rem]' : ''
                      }`}
                      style={{
                        borderColor: toRgba(TEAM_CARD_ACCENT, 0.32),
                        boxShadow: `0 -28px 68px -34px ${toRgba(TEAM_CARD_ACCENT, 0.5)}, 0 34px 82px -32px ${toRgba(TEAM_CARD_ACCENT, 0.62)}, 0 10px 28px -18px rgba(15, 29, 24, 0.35)`,
                      }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ backgroundColor: TEAM_CARD_ACCENT }}
                        aria-hidden="true"
                      />
                      <div className={`${isReversed ? 'lg:order-2' : ''} flex justify-center lg:justify-start`}>
                        <div className="relative h-56 w-56 shrink-0 sm:h-64 sm:w-64 lg:h-60 lg:w-60">
                          <div
                            className="absolute inset-0 rounded-full opacity-30 blur-2xl"
                            style={{ backgroundColor: TEAM_CARD_ACCENT }}
                            aria-hidden="true"
                          />
                          <div
                            className="relative h-full w-full overflow-hidden rounded-full border-4 bg-brand-background p-1 shadow-[0_-16px_38px_-24px_rgba(27,67,50,0.55),0_24px_46px_-24px_rgba(27,67,50,0.65)]"
                            style={{ borderColor: TEAM_CARD_ACCENT }}
                          >
                            <img
                              src={member.image}
                              alt={`Foto de ${member.name}`}
                              className="h-full w-full rounded-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span
                            className="absolute bottom-4 right-2 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-sm font-bold text-white shadow-2xl dark:border-slate-900"
                            style={{ backgroundColor: TEAM_CARD_ACCENT }}
                            aria-hidden="true"
                          >
                            {member.initials}
                          </span>
                        </div>
                      </div>

                      <div className={`${isReversed ? 'lg:order-1 lg:text-right' : ''}`}>
                        <div className={`mb-5 flex flex-col ${isReversed ? 'lg:items-end' : ''}`}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                            Equipo local
                          </p>
                          <h3 className="mb-2 max-w-2xl font-heading text-2xl font-bold leading-tight text-brand-text dark:text-white sm:text-3xl">
                            {member.name}
                          </h3>
                          <p className="text-sm font-bold uppercase tracking-[0.08em] text-brand-text/80 dark:text-slate-200">
                            {member.role}
                          </p>
                        </div>

                        <p className="max-w-3xl text-[0.96rem] leading-8 text-brand-text/84 dark:text-slate-200 sm:text-base">
                          {member.description}
                        </p>

                        <div className={`mt-6 flex flex-wrap gap-2 ${isReversed ? 'lg:justify-end' : ''}`}>
                          {member.skills.map((skill) => (
                            <span
                              key={skill}
                              className="border px-3 py-1.5 text-xs font-semibold"
                              style={{
                                color: TEAM_CARD_ACCENT,
                                backgroundColor: toRgba(TEAM_CARD_ACCENT, 0.1),
                                borderColor: toRgba(TEAM_CARD_ACCENT, 0.34),
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </article>
                );
              })}
            </div>

            <div className="mt-12 border-l-4 border-brand-primary bg-white/80 p-5 shadow-sm dark:bg-slate-900 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                    Trabajo colaborativo
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-text/74 dark:text-slate-300">
                    Cada perfil aporta una mirada distinta: tecnología, contenido, fotografía, guía local y difusión digital al servicio de La Convención.
                  </p>
                </div>
                <Users className="h-10 w-10 shrink-0 text-brand-text/40 dark:text-brand-primary" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-text py-16 text-white sm:py-20">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-reveal-up">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {page.ctaDescription}
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-bold text-brand-text shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary/95 hover:text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-brand-text"
            >
              <Mail className="h-5 w-5" />
              {page.ctaAction}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
