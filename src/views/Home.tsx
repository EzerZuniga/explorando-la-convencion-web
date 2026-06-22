"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
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
  Coffee,
  HelpCircle,
  Images,
  Landmark,
  Leaf,
  MapPin,
  MapPinned,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/features/i18n";
import WeatherWidget from "@/features/weather";
import ExchangeWidget from "@/features/exchange";
import QuoteWidget from "@/features/quotes";
import type { Post } from "@/types";
import { InstitutionalCarousel, ScrollReveal } from "@/components/ui";
const SECTION_CLASS = "py-14 sm:py-16 lg:py-20";
const CONTAINER_CLASS = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const CARD_SURFACE_CLASS =
  "bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]";
const PORTAL_CARD_CLASS =
  "rounded-2xl border border-gray-100 bg-white px-6 pb-7 pt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group";

const HERO_CTA_CLASS =
  "w-full max-w-[18rem] sm:w-auto sm:max-w-none min-h-12 group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-brand-primary text-brand-text text-center text-xs sm:text-sm font-bold leading-tight rounded-full transition-shadow duration-500 shadow-lg hover:shadow-xl uppercase tracking-wide overflow-hidden transform-gpu";
const HERO_CTA_OVERLAY_CLASS =
  "absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-text rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center transform-gpu";
const HERO_CTA_CONTENT_CLASS =
  "relative z-10 group-hover:text-white transition-colors duration-500";
const HERO_CTA_ICON_CLASS =
  "relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-500";

const portalLinkIcons = [
  MapPinned,
  Coffee,
  ShieldCheck,
  NotebookTabs,
  Images,
  Landmark,
] as const;
const statIcons = [MapPin, Camera, Calendar] as const;
const planningStepIcons = [CheckCircle, Compass, HelpCircle] as const;
const portalPillarIcons = [BookOpen, Leaf, ShieldCheck] as const;
const locationCardIcons = [MapPin, Compass, CheckCircle] as const;

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

function HeroScrollCta({
  label,
  Icon,
  targetId,
}: {
  label: string;
  Icon: LucideIcon;
  targetId: string;
}) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    const header = document.querySelector("header");

    if (!target) {
      return;
    }

    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(targetTop - headerHeight - 8, 0),
      behavior: "smooth",
    });
  };

  return (
    <button type="button" className={HERO_CTA_CLASS} onClick={handleClick}>
      <span className={HERO_CTA_OVERLAY_CLASS}></span>
      <span className={HERO_CTA_CONTENT_CLASS}>{label}</span>
      <Icon className={HERO_CTA_ICON_CLASS} strokeWidth={1.2} />
    </button>
  );
}

function SectionHeader({
  title,
  description,
  tone = "light",
  action,
}: {
  title: string;
  description: string;
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  const isDark = tone === "dark";

  return (
    <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
      <div>
        <h2
          className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight uppercase ${isDark ? "text-white" : "text-brand-text "}`}
        >
          {title}
        </h2>
        <div
          className={`w-14 h-1 mt-3 mb-4 mx-auto ${isDark ? "bg-white/80" : "bg-brand-primary"}`}
        ></div>
        <p
          className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/85" : "text-gray-600 "}`}
        >
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
      href={to}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-brand-text text-xs sm:text-sm font-bold uppercase tracking-wide rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-text hover:text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 "
    >
      {children}
      <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
    </Link>
  );
}

function PortalLinkCard({
  to,
  title,
  description,
  Icon,
}: PortalLink) {
  const { content } = useLanguage();

  return (
    <article
      className={`relative h-full min-h-[16rem] overflow-hidden ${PORTAL_CARD_CLASS}`}
    >
      <span className="absolute left-5 top-5 h-20 w-20 rounded-full bg-brand-primary/5 blur-2xl pointer-events-none"></span>
      <span className="absolute bottom-10 right-7 h-24 w-24 rounded-full bg-brand-primary/5 blur-2xl pointer-events-none"></span>

      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <div className="mb-5 flex h-24 w-24 items-center justify-center text-[#16251F] drop-shadow-[0_10px_18px_rgba(21,32,56,0.12)]">
          <Icon className="h-20 w-20" strokeWidth={0.95} />
        </div>

        <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-[#172033]">
          {title}
        </h3>
        <p className="mx-auto min-h-[3.2rem] max-w-[14rem] text-xs leading-relaxed text-[#677184]">
          {description}
        </p>

        <Link
          href={to}
          className="mt-auto inline-flex min-h-10 min-w-[130px] items-center justify-center rounded-full bg-brand-primary px-6 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-[#158C40] hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          {content.pages.home.ui.explore}
        </Link>
      </div>
    </article>
  );
}

function PlanningStepCard({
  stepNumber,
  to,
  title,
  description,
  Icon,
}: PortalLink & { stepNumber: number }) {
  const { content } = useLanguage();

  return (
    <Link
      href={to}
      className="group relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]  "
    >
      <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.06] ">
        {String(stepNumber).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white ">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <span className="rounded-full bg-brand-background px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:bg-brand-primary  ">
            {content.pages.home.ui.step} {stepNumber}
          </span>
        </div>

        <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-brand-text ">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-600 ">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:text-brand-primary ">
          {content.pages.home.ui.viewDetail}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.75}
          />
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
  const { content } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-brand-text/10  bg-white  text-brand-text  shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        aria-label={content.pages.home.ui.previous}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
      </button>
      <span className="text-xs font-semibold text-gray-500  tabular-nums">
        {current + 1}/{total}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-brand-text/10  bg-white  text-brand-text  shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        aria-label={content.pages.home.ui.next}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function HighlightsCarousel({ highlights }: { highlights: Highlight[] }) {
  const { content } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = highlights[activeIndex];

  const showPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? highlights.length - 1 : index - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % highlights.length);
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
      <div className="relative min-h-[300px] sm:min-h-[380px]">
        <Image
          key={active.image}
          src={active.image}
          alt={active.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-brand-text/10"></div>
        <div className="absolute left-5 right-5 bottom-5 sm:left-8 sm:right-8 sm:bottom-8 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-primary mb-2">
            {active.meta}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight max-w-2xl">
            {active.title}
          </h3>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 bg-gradient-to-br from-white via-brand-background to-white   ">
        <div>
          <Sparkles
            className="w-7 h-7 text-brand-primary mb-5"
            strokeWidth={1.75}
          />
          <p className="text-sm sm:text-base text-gray-600  leading-relaxed mb-6">
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
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-brand-primary" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`${content.pages.home.ui.viewHighlight} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map(({ value, label, description, Icon }) => (
        <article
          key={label}
          className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]  "
        >
          <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.05] ">
            {value}
          </div>
          <div className="relative z-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white ">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-brand-text ">
                {value}
              </span>
            </div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-text ">
              {label}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 ">
              {description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function IdentityBand({
  identity,
  portalPillars,
}: {
  identity: { eyebrow: string; title: string; description: string };
  portalPillars: Pillar[];
}) {
  return (
    <section className="relative w-full bg-[#1b8c42] text-white my-16 sm:my-28">
      {/* Top Cloud Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none" style={{ transform: "translateY(-99%)" }}>
        <svg className="relative block w-full h-[60px] sm:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#1b8c42" />
        </svg>
      </div>

      {/* Bottom Cloud Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none" style={{ transform: "translateY(99%) rotate(180deg)" }}>
        <svg className="relative block w-full h-[60px] sm:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#1b8c42" />
        </svg>
      </div>

      {/* Container for Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 text-white tracking-tight drop-shadow-sm">
            {identity.title}
          </h3>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium mb-8">
            {identity.description}
          </p>
          <div>
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white text-sm font-bold uppercase tracking-wide rounded-full overflow-hidden transform-gpu transition-shadow duration-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1b8c42]">
              <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-white rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center transform-gpu"></span>
              <span className="relative z-10 group-hover:text-[#1b8c42] transition-colors duration-500">Descubrir Más</span>
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {portalPillars.map(({ title, description, Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#0B131E] rounded-[1.75rem] p-6 sm:p-7 shadow-2xl transition-all duration-300 border border-white/5 hover:border-[#1b8c42]/50 overflow-hidden flex flex-col h-full"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b8c42]/0 to-transparent group-hover:from-[#1b8c42]/15 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#1A2639] text-[#25D366] flex items-center justify-center mb-6 border border-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-inner">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h4 className="text-[15px] font-bold uppercase tracking-wide mb-3 text-white transition-colors duration-300">
                  {title}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-300">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostsCarousel({ featuredPosts }: { featuredPosts: Post[] }) {
  const { content } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = featuredPosts[activeIndex] ?? featuredPosts[0];

  if (!activePost) return null;

  const showPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? featuredPosts.length - 1 : index - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % featuredPosts.length);
  };

  return (
    <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
      <article
        className={`${CARD_SURFACE_CLASS} overflow-hidden hover:translate-y-0`}
      >
        <Image
          key={activePost.image}
          src={activePost.image}
          alt={activePost.title}
          width={900}
          height={360}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="w-full h-56 sm:h-72 object-cover animate-fade-in"
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500  mb-4">
            <span className="text-brand-primary uppercase tracking-wide">
              {activePost.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
              {activePost.readTime}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-brand-text  leading-tight mb-3">
            {activePost.title}
          </h3>
          <p className="text-sm text-gray-600  leading-relaxed mb-6">
            {activePost.excerpt}
          </p>
          <TextLinkButton to="/blog">
            {content.pages.home.ui.readPosts}
          </TextLinkButton>
        </div>
      </article>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-brand-text  uppercase tracking-wide">
            {content.pages.home.ui.featuredPosts}
          </h3>
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
              className={`text-left p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${index === activeIndex ? "border-brand-primary bg-brand-background/50 shadow-md" : "border-gray-100 bg-white hover:border-brand-primary/50 hover:shadow-md"}`}
            >
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">
                {post.category}
              </span>
              <span className="block text-sm font-bold text-brand-text  mt-1">
                {post.title}
              </span>
              <span className="block text-xs text-gray-500  mt-2">
                {post.readTime}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="grid gap-4">
      {faqs.map(({ question, answer }) => (
        <details
          key={question}
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 open:border-brand-primary/50 open:shadow-[0_20px_40px_rgb(0,0,0,0.08)] sm:p-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-text outline-none transition-colors duration-200 marker:hidden focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:text-base">
            {question}
            <ChevronRight
              className="h-5 w-5 flex-shrink-0 text-brand-primary transition-transform duration-300 ease-smooth-out group-open:rotate-90"
              strokeWidth={1.75}
            />
          </summary>
          <p className="mt-4 max-w-5xl text-sm leading-relaxed text-gray-600 sm:text-[15px]">
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
      href={to}
      className="group block rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white">
          <Icon
            className="h-5 w-5 transition-transform duration-300 ease-smooth-out group-hover:scale-[1.14] group-hover:-rotate-3"
            strokeWidth={1.9}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-text  mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600  leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function LocationCard({ locationCards }: { locationCards: PortalLink[] }) {
  const { content } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
      <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 h-full min-h-[360px]">
        <iframe
          src="https://www.google.com/maps?q=Quillabamba,+Cusco,+Peru&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "360px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={content.pages.home.ui.mapTitle}
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-5">
        <div className="space-y-4">
          {locationCards.map((item) => (
            <LocationInfoCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { content } = useLanguage();
  const home = content.pages.home;
  const portalLinks = home.portalLinks.map((item, index) => ({
    ...item,
    Icon: portalLinkIcons[index] ?? MapPin,
  }));
  const highlights = home.highlights;
  const stats = home.stats.map((item, index) => ({
    ...item,
    Icon: statIcons[index] ?? MapPin,
  }));
  const planningSteps = home.planningSteps.map((item, index) => ({
    ...item,
    Icon: planningStepIcons[index] ?? CheckCircle,
  }));
  const portalPillars = home.portalPillars.map((item, index) => ({
    ...item,
    Icon: portalPillarIcons[index] ?? BookOpen,
  }));
  const locationCards = home.locationCards.map((item, index) => ({
    ...item,
    Icon: locationCardIcons[index] ?? MapPin,
  }));
  const featuredPosts = content.pages.destinations.posts.filter(
    ({ featured }) => featured,
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] ">

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/video/meganto3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight px-4 tracking-tight">
              {home.hero.titlePrefix}
              <span className="block bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary bg-clip-text text-transparent mt-2 drop-shadow-lg">
                {home.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md font-light">
              {home.hero.description}
            </p>
            <div className="flex justify-center pt-4 px-4">
              <HeroScrollCta
                targetId="explorar-contenido"
                label={home.hero.primaryCta}
                Icon={Compass}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-brand-background relative overflow-hidden`}>
        {/* Floating Icons Background (Idea 2) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden text-brand-primary opacity-[0.025]">
          <Leaf className="absolute top-[5%] left-[2%] w-32 h-32 -rotate-12" strokeWidth={1} />
          <Coffee className="absolute top-[20%] right-[5%] w-40 h-40 rotate-[15deg]" strokeWidth={1} />
          <Compass className="absolute top-[45%] left-[8%] w-48 h-48 rotate-45" strokeWidth={1} />
          <MapPin className="absolute bottom-[20%] right-[10%] w-32 h-32 -rotate-[20deg]" strokeWidth={1} />
          <Camera className="absolute bottom-[5%] left-[20%] w-36 h-36 rotate-[10deg]" strokeWidth={1} />
          <Leaf className="absolute top-[60%] right-[30%] w-20 h-20 rotate-[35deg]" strokeWidth={1} />
          <Images className="absolute top-[10%] right-[35%] w-24 h-24 -rotate-[5deg]" strokeWidth={1} />
          <Landmark className="absolute bottom-[40%] left-[40%] w-28 h-28 rotate-[5deg]" strokeWidth={1} />
        </div>

        <div id="explorar-contenido" className={`${CONTAINER_CLASS} relative z-10`}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.portal.title}
              description={home.sections.portal.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portalLinks.map((item) => (
                <PortalLinkCard key={item.to} {...item} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wavy IdentityBand Full Width Section */}
      <IdentityBand
        identity={home.identity}
        portalPillars={portalPillars}
      />

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-white via-white to-brand-background   `}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.planningInfo.title}
              description={home.sections.planningInfo.description}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <WeatherWidget />
              <ExchangeWidget />
              <QuoteWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-br from-brand-background via-white to-[#EAF5EC]   `}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.highlights.title}
              description={home.sections.highlights.description}
            />
            <HighlightsCarousel highlights={highlights} />
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white `}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.stats.title}
              description={home.sections.stats.description}
            />
            <StatStrip stats={stats} />
          </ScrollReveal>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-brand-background to-[#EAF5EC]  `}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.posts.title}
              description={home.sections.posts.description}
              action={
                <TextLinkButton to="/blog">
                  {home.sections.posts.action}
                </TextLinkButton>
              }
            />
            <PostsCarousel featuredPosts={featuredPosts} />
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white `}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.visit.title}
              description={home.sections.visit.description}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {planningSteps.map((step, index) => (
                <PlanningStepCard
                  key={step.title}
                  stepNumber={index + 1}
                  {...step}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-[#26724f]`}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.faq.title}
              description={home.sections.faq.description}
              tone="dark"
            />
            <FaqList faqs={home.faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-white to-brand-background  `}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.location.title}
              description={home.sections.location.description}
            />
            <LocationCard locationCards={locationCards} />
          </ScrollReveal>
        </div>
      </section>

      <InstitutionalCarousel />
    </div>
  );
}

export default Home;
