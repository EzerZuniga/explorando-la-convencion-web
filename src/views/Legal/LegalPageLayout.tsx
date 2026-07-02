"use client";

import React from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children,
}) => {
  return (
    <div className="min-h-screen bg-brand-background text-brand-text pt-20 sm:pt-28 pb-20 sm:pb-32">
      
      {/* Header */}
      <header className="relative py-20 sm:py-32 bg-brand-text text-white overflow-hidden">
        {/* Background blobs for aesthetics */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-12 -right-12 w-96 h-96 bg-brand-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center animate-reveal-up">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-heading font-bold mb-6 text-white drop-shadow-md leading-tight">
            {title}
          </h1>
          <p className="text-[15px] sm:text-[17px] text-white/80 font-medium tracking-wide">
            Última actualización: {lastUpdated}
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[40px] sm:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-background"></path>
          </svg>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-16 animate-reveal-up border border-slate-100/50 backdrop-blur-xl">
          <div className="text-slate-600 leading-relaxed space-y-8 sm:space-y-10 text-[16px] sm:text-[18px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
