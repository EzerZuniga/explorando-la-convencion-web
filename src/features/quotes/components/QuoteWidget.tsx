import React from "react";
import { Quote, RefreshCw } from "lucide-react";
import { useApi } from "@/hooks";
import { getRandomQuote } from "@/api";
import { LoadingSpinner, ErrorMessage } from "@/components";

const QUOTE_CARD_CLASS =
  "h-full min-h-[285px] overflow-hidden border border-brand-secondary/35  shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(27,67,50,0.16)]";

const QuoteWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getRandomQuote, []);

  if (loading) {
    return (
      <div
        className={`${QUOTE_CARD_CLASS} bg-gradient-to-br from-brand-secondary/15 via-white to-brand-background    p-6 flex items-center justify-center`}
      >
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={`${QUOTE_CARD_CLASS} bg-white  p-6 flex items-center justify-center`}
      >
        <ErrorMessage message="No se pudo cargar la frase" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div
      className={`${QUOTE_CARD_CLASS} bg-gradient-to-br from-brand-secondary/12 via-white to-brand-background    p-6 relative`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 bg-brand-secondary/10 blur-2xl"></div>
      <div className="w-11 h-11 bg-white/80  border border-brand-secondary/35 flex items-center justify-center shadow-inner mb-5">
        <Quote className="w-5 h-5 text-brand-secondary " strokeWidth={1.75} />
      </div>

      <div className="relative z-10 flex h-[calc(100%-4rem)] flex-col">
        <blockquote className="text-base sm:text-lg text-brand-text  italic leading-relaxed mb-5">
          &ldquo;{data.content}&rdquo;
        </blockquote>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-brand-secondary/25 pt-4">
          <p className="text-sm font-semibold text-brand-secondary ">
            - {data.author}
          </p>
          <button
            onClick={refetch}
            className="p-2 rounded-none text-gray-500 hover:text-brand-secondary   hover:bg-brand-secondary/20  transition-colors"
            aria-label="Nueva frase"
            title="Nueva frase"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;
