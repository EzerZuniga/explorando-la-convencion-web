import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks";
import { LANGUAGES } from "./translations";
import { useLanguage } from "./LanguageContext";
import { LanguageFlag } from "./LanguageFlag";

type LanguageSelectorProps = {
  scrolled?: boolean;
  compact?: boolean;
};

export default function LanguageSelector({
  scrolled = true,
  compact = false,
}: LanguageSelectorProps) {
  const { language, content, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  useClickOutside(menuRef, () => setIsOpen(false));

  const buttonTextColor = scrolled ? "text-brand-text " : "text-white";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/70 ${buttonTextColor}`}
        aria-label={`${content.languageSelector.ariaLabel}: ${currentLanguage.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={`${content.languageSelector.currentLanguage}: ${currentLanguage.nativeName}`}
      >
        <LanguageFlag language={currentLanguage.code} />
        <span className="tabular-nums">{currentLanguage.shortLabel}</span>
        {!compact && (
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-[70] mt-2 w-28 overflow-hidden rounded-lg border border-brand-primary/20 bg-white py-1.5 shadow-2xl  "
          role="menu"
        >
          {LANGUAGES.map((item) => {
            const selected = item.code === language;

            return (
              <button
                key={item.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-brand-primary/10 text-brand-text  "
                    : "text-brand-text/85 hover:bg-brand-background  "
                }`}
                title={`${content.languageSelector.changeTo} ${item.nativeName}`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <LanguageFlag language={item.code} />
                  <span className="font-bold uppercase tabular-nums leading-tight">
                    {item.shortLabel}
                  </span>
                </span>
                {selected && (
                  <Check
                    className="h-4 w-4 flex-shrink-0 text-brand-primary"
                    strokeWidth={2.2}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
