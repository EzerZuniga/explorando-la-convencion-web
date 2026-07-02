"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Menu,
  X,
  MapPin,
  Info,
  Mail,
  LogOut,
  Bell,
  UserCircle,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SITE_CONFIG } from "@/constants";
import { LanguageSelector, useLanguage } from "@/features/i18n";
import { useScrollPosition, useClickOutside } from "@/hooks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const openLogin = useCallback(() => {
    router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  }, [router, pathname]);
  const scrolled = useScrollPosition(50);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { content } = useLanguage();
  const { navbar } = content;

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const isActive = (path: string) => pathname === path;

  const closeUserMenu = useCallback(() => setShowUserMenu(false), []);
  useClickOutside(userMenuRef, closeUserMenu);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Top bar */}
      <div
        className={`hidden lg:block w-full overflow-hidden bg-brand-dark transition-[max-height,opacity] duration-500 ease-smooth-out ${
          scrolled
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-12 opacity-100 animate-topbar-in"
        }`}
        aria-hidden={scrolled}
      >
        <div
          className={`transition-transform duration-500 ease-smooth-out ${
            scrolled ? "-translate-y-2" : "translate-y-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <MapPin size={14} className="flex-shrink-0 text-brand-primary" />
                <span className="hidden sm:inline">
                  {SITE_CONFIG.contact.location}
                </span>
                <span className="sm:hidden">{navbar.locationShort}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Info size={14} className="flex-shrink-0 text-brand-primary" />
                <span>{navbar.purpose}</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="hidden lg:flex items-center gap-2 text-slate-300 hover:text-brand-primary transition-colors font-medium"
              >
                <Mail size={14} className="flex-shrink-0 text-brand-primary" />
                <span>{SITE_CONFIG.social.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-slate-400">
                {navbar.followUs}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-brand-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Facebook"
                  title={navbar.socialLabels.facebook}
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-brand-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Instagram"
                  title={navbar.socialLabels.instagram}
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-brand-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="YouTube"
                  title={navbar.socialLabels.youtube}
                >
                  <FaYoutube className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-brand-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <FaXTwitter className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`${
          isTransparent
            ? "bg-transparent"
            : "bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border-b border-slate-100"
        } transition-all duration-500 ease-smooth-out`}
        role="navigation"
        aria-label={navbar.mainNavLabel}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center gap-1.5 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex min-w-0 items-center flex-shrink relative z-10"
              aria-label="Ir al inicio - Explorando La Convención"
            >
              <Image
                src="/images/brand/logo.png"
                alt="Explorando La Convención - Turismo en Quillabamba"
                width={1486}
                height={515}
                priority
                className="h-9 sm:h-12 lg:h-12 w-auto max-w-[8.5rem] sm:max-w-[12rem] lg:max-w-none object-contain brightness-110 contrast-125 saturate-125 drop-shadow-[0_2px_4px_rgba(255,255,255,0.35)]"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {content.navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-brand-primary drop-shadow-sm"
                      : !isTransparent
                      ? "text-brand-text hover:text-brand-primary"
                      : "text-white hover:text-brand-primary"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center gap-3 ml-4">
                <LanguageSelector scrolled={!isTransparent} />
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/25  hover:border-brand-primary  transition-colors"
                    >
                      {user.picture ? (
                        <Image
                          src={user.picture}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-text  flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.split(" ")[0].charAt(0)}
                          </span>
                        </div>
                      )}
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white  rounded-lg shadow-2xl border border-brand-primary/20  py-2 z-50">
                        <Link
                          href="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-brand-background  transition-colors"
                        >
                          <UserCircle className="w-5 h-5 text-brand-text/75 " />
                          <span className="text-sm text-brand-text  font-medium">
                            {navbar.profile}
                          </span>
                        </Link>
                        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-brand-background  transition-colors">
                          <Bell className="w-5 h-5 text-brand-text/75 " />
                          <span className="text-sm text-brand-text  font-medium">
                            {navbar.notifications}
                          </span>
                        </button>
                        <div className="border-t border-brand-primary/20  my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50  transition-colors"
                        >
                          <LogOut className="w-5 h-5 text-red-600 " />
                          <span className="text-sm text-red-600  font-medium">
                            {navbar.logout}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={openLogin}
                    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                      !isTransparent ? "text-brand-text " : "text-white"
                    }`}
                    aria-label={navbar.login}
                    title={navbar.login}
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex flex-shrink-0 items-center gap-1 sm:gap-2">
              <LanguageSelector scrolled={!isTransparent} compact />
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 rounded-full overflow-hidden transition-colors duration-200"
                >
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-text  flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name.split(" ")[0].charAt(0)}
                      </span>
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={openLogin}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    !isTransparent ? "text-brand-text " : "text-white"
                  }`}
                  aria-label={navbar.login}
                  title={navbar.login}
                >
                  <User className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  !isTransparent ? "text-brand-text " : "text-white"
                }`}
                aria-label={isOpen ? navbar.closeMenu : navbar.openMenu}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={navbar.mobileMenuLabel}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label={navbar.closeMenu}
            onClick={() => setIsOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-[min(20rem,86vw)] bg-white  shadow-2xl border-l border-brand-primary/20 ">
            <div className="flex h-16 items-center justify-between border-b border-brand-primary/20  px-5">
              <span className="text-sm font-bold uppercase tracking-wide text-brand-text ">
                {navbar.menuTitle}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-text/90 transition-colors hover:bg-brand-background focus:outline-none focus:ring-2 focus:ring-brand-primary/70  "
                aria-label={navbar.closeMenu}
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="px-3 py-4" aria-label={navbar.mobileMenuLabel}>
              <ul className="space-y-1">
                {content.navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "bg-brand-primary/10 text-brand-primary  "
                          : "text-brand-text/90 hover:bg-brand-background hover:text-brand-primary   "
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Mobile user menu overlay */}
      {showUserMenu && user && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="absolute top-20 right-4 left-4 sm:left-auto sm:w-80 bg-white  rounded-lg shadow-2xl border border-brand-primary/20  p-2">
            <Link
              href="/profile"
              onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-background  text-brand-text/90  transition-colors duration-200"
            >
              <UserCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{navbar.profile}</span>
            </Link>
            <button
              onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-background  text-brand-text/90  transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">
                {navbar.notifications}
              </span>
            </button>
            <div className="border-t border-brand-primary/20  my-2" />
            <button
              onClick={() => {
                setShowUserMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50  text-red-600  transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{navbar.logout}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
