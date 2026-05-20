import type { ReactNode } from "react";
import type { LanguageCode } from "./translations";

type LanguageFlagProps = {
  language: LanguageCode;
  className?: string;
};

const FLAG_LABELS: Record<LanguageCode, string> = {
  es: "Bandera de Espana",
  en: "Bandera de Estados Unidos",
  pt: "Bandera de Brasil",
  fr: "Bandera de Francia",
};

function FlagFrame({
  children,
  className = "",
  label,
  viewBox = "0 0 24 16",
}: {
  children: ReactNode;
  className?: string;
  label: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={`h-3.5 w-5 flex-shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(15,23,42,0.14)] ${className}`}
    >
      {children}
    </svg>
  );
}

export function LanguageFlag({ language, className }: LanguageFlagProps) {
  const label = FLAG_LABELS[language];

  if (language === "es") {
    return (
      <FlagFrame label={label} className={className}>
        <rect width="24" height="16" fill="#aa151b" />
        <rect y="4" width="24" height="8" fill="#f1bf00" />
      </FlagFrame>
    );
  }

  if (language === "en") {
    return (
      <FlagFrame label={label} className={className}>
        <rect width="24" height="16" fill="#b22234" />
        {Array.from({ length: 6 }).map((_, index) => (
          <rect
            key={index}
            y={2 + index * 2.5}
            width="24"
            height="1.25"
            fill="#fff"
          />
        ))}
        <rect width="10.5" height="8.6" fill="#3c3b6e" />
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, column) => (
            <circle
              key={`${row}-${column}`}
              cx={1.2 + column * 2}
              cy={1.1 + row * 1.8}
              r="0.32"
              fill="#fff"
            />
          )),
        )}
      </FlagFrame>
    );
  }

  if (language === "pt") {
    return (
      <FlagFrame label={label} className={className}>
        <rect width="24" height="16" fill="#009b3a" />
        <path d="M12 2.1 21.4 8 12 13.9 2.6 8z" fill="#ffdf00" />
        <circle cx="12" cy="8" r="3.45" fill="#002776" />
        <path d="M8.95 7.1c1.7-.35 4.5.05 6.1 1.25" fill="none" stroke="#fff" strokeWidth="0.55" />
      </FlagFrame>
    );
  }

  return (
    <FlagFrame label={label} className={className}>
      <rect width="8" height="16" fill="#0055a4" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ef4135" />
    </FlagFrame>
  );
}
