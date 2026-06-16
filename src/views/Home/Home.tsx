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
import SEOHead from "@/features/seo";
import { SITE_CONFIG } from "@/constants";
import { useLanguage } from "@/features/i18n";
import WeatherWidget from "@/features/weather";
import ExchangeWidget from "@/features/exchange";
import QuoteWidget from "@/features/quotes";
import type { Post } from "@/types";

const SECTION_CLASS = "py-14 sm:py-16 lg:py-20";
const CONTAINER_CLASS = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const CARD_SURFACE_CLASS =
  "bg-white  border border-[#E6ECEA]  shadow-[0_14px_35px_rgba(27,67,50,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(27,67,50,0.14)]";
const PORTAL_CARD_CLASS =
  "border border-[#D8E7DE] bg-white px-6 pb-7 pt-8 shadow-[0_42px_90px_rgba(21,32,56,0.20),0_18px_34px_rgba(27,67,50,0.10)]";

const HERO_CTA_CLASS =
  "w-full max-w-[18rem] sm:w-auto sm:max-w-none min-h-12 group relative inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 bg-brand-primary text-brand-text text-center text-xs sm:text-sm font-bold leading-tight rounded-none transition-all duration-500 shadow-xl hover:shadow-2xl uppercase tracking-wide overflow-hidden";
const HERO_CTA_OVERLAY_CLASS =
  "absolute inset-0 bg-brand-text/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center";
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
      <Icon className={HERO_CTA_ICON_CLASS} strokeWidth={1.75} />
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
      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-brand-text text-xs sm:text-sm font-bold uppercase tracking-wide shadow-[0_10px_22px_rgba(75,181,67,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-text hover:text-white hover:shadow-[0_16px_30px_rgba(27,67,50,0.22)] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 "
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
      <span className="absolute inset-x-0 top-0 h-1 bg-brand-primary"></span>
      <span className="absolute left-5 top-5 h-5 w-5 bg-[#F0F2F7]"></span>
      <span className="absolute right-6 top-8 h-8 w-8 bg-[#F3F5F9]"></span>
      <span className="absolute bottom-16 left-5 h-7 w-7 bg-[#F3F5F9]"></span>
      <span className="absolute bottom-10 right-7 h-5 w-5 bg-[#EEF1F6]"></span>

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
          className="mt-5 inline-flex min-h-9 min-w-28 cursor-pointer items-center justify-center border border-[#3FA33A] bg-brand-primary px-5 text-[11px] font-bold text-brand-text shadow-[0_8px_18px_rgba(75,181,67,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 focus-visible:ring-offset-white"
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
      className="group relative block h-full overflow-hidden border border-[#DDE9E2] bg-white p-6 shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(27,67,50,0.18)]  "
    >
      <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.06] ">
        {String(stepNumber).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-brand-primary/30 bg-brand-background text-brand-text shadow-inner transition-colors duration-300 group-hover:bg-brand-primary  ">
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
        className="w-10 h-10 inline-flex items-center justify-center border border-brand-text/20  bg-white/90  text-brand-text  shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
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
        className="w-10 h-10 inline-flex items-center justify-center border border-brand-text/20  bg-white/90  text-brand-text  shadow-sm hover:bg-brand-text hover:text-white transition-all duration-300 hover:-translate-y-0.5"
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
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] bg-white  border border-[#DDE9E2]  shadow-[0_24px_70px_rgba(27,67,50,0.14)] overflow-hidden">
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
                className={`h-2.5 transition-all ${index === activeIndex ? "w-8 bg-brand-primary" : "w-2.5 bg-gray-300 "}`}
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
          className="group relative overflow-hidden border border-[#DDE9E2] bg-white p-6 shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(27,67,50,0.18)]  "
        >
          <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-brand-text/[0.05] ">
            {value}
          </div>
          <div className="relative z-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-brand-primary/30 bg-brand-background text-brand-text shadow-inner transition-colors duration-300 group-hover:bg-brand-primary  ">
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
    <div className="relative overflow-hidden bg-gradient-to-br from-[#123A2B] via-brand-text to-[#2F8F45] text-white shadow-[0_28px_80px_rgba(27,67,50,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(75,181,67,0.35),transparent_36%)]"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-white/35"></div>
      <div className="relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col justify-center animate-reveal-up">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary mb-3">
            {identity.eyebrow}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white drop-shadow-sm">
            {identity.title}
          </h3>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            {identity.description}
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
              <h4 className="text-sm font-bold uppercase tracking-wide mb-2 text-white">
                {title}
              </h4>
              <p className="text-sm text-white/86 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
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
              className={`text-left p-4 border shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${index === activeIndex ? "border-brand-primary bg-brand-background  shadow-[0_12px_28px_rgba(27,67,50,0.12)]" : "border-[#E6ECEA]  bg-white  hover:border-brand-primary hover:shadow-md"}`}
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
          className="group border border-white/70 bg-white p-5 shadow-[0_18px_42px_rgba(11,45,32,0.18)] transition-[border-color,box-shadow] duration-300 open:border-brand-primary open:shadow-[0_24px_58px_rgba(11,45,32,0.24)] sm:p-6"
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
      className="group block border border-[#D8E7DE] bg-white p-5 shadow-[0_30px_72px_rgba(27,67,50,0.22),0_10px_24px_rgba(27,67,50,0.10)] ring-1 ring-white/90 transition-colors duration-200 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-brand-primary/35 bg-brand-background text-brand-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72),0_16px_32px_rgba(27,67,50,0.22)] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-smooth-out group-hover:-translate-y-0.5 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_20px_38px_rgba(75,181,67,0.34)]">
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
      <div className="rounded-none overflow-hidden shadow-[0_22px_55px_rgba(27,67,50,0.16)] border border-brand-primary  h-full min-h-[360px]">
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

      <div className="border border-[#DDE9E2] bg-white p-4 shadow-[0_42px_110px_rgba(27,67,50,0.24),0_14px_34px_rgba(27,67,50,0.10)] ring-1 ring-white/90 sm:p-5">
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
      <SEOHead
        title={home.seo.title}
        description={home.seo.description}
        keywords={home.seo.keywords}
        url={SITE_CONFIG.url}
      />

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

      <section className={`${SECTION_CLASS} bg-brand-background `}>
        <div id="explorar-contenido" className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.portal.title}
            description={home.sections.portal.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portalLinks.map((item) => (
              <PortalLinkCard key={item.to} {...item} />
            ))}
          </div>
          <div className="mt-8 sm:mt-10">
            <IdentityBand
              identity={home.identity}
              portalPillars={portalPillars}
            />
          </div>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-white via-white to-brand-background   `}
      >
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.planningInfo.title}
            description={home.sections.planningInfo.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherWidget />
            <ExchangeWidget />
            <QuoteWidget />
          </div>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-br from-brand-background via-white to-[#EAF5EC]   `}
      >
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.highlights.title}
            description={home.sections.highlights.description}
          />
          <HighlightsCarousel highlights={highlights} />
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white `}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.stats.title}
            description={home.sections.stats.description}
          />
          <StatStrip stats={stats} />
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-brand-background to-[#EAF5EC]  `}
      >
        <div className={CONTAINER_CLASS}>
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
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white `}>
        <div className={CONTAINER_CLASS}>
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
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-[#26724f]`}>
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.faq.title}
            description={home.sections.faq.description}
            tone="dark"
          />
          <FaqList faqs={home.faqs} />
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-white to-brand-background  `}
      >
        <div className={CONTAINER_CLASS}>
          <SectionHeader
            title={home.sections.location.title}
            description={home.sections.location.description}
          />
          <LocationCard locationCards={locationCards} />
        </div>
      </section>
    </div>
  );
}

export default Home;
