import React from "react";
import { Quote, RefreshCw } from "lucide-react";
import { useApi } from "@/hooks";
import { getRandomQuote } from "@/lib/http";
import { LoadingSpinner, ErrorMessage } from "@/components";

const QUOTE_CARD_CLASS =
  "h-full min-h-[285px] overflow-hidden border border-brand-primary/20  shadow-[0_18px_42px_rgba(37,211,102,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(37,211,102,0.18)]";

const QuoteWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getRandomQuote);

  if (loading) {
    return (
      <div
        className={`${QUOTE_CARD_CLASS} bg-brand-dark-green p-6 flex items-center justify-center`}
      >
        <LoadingSpinner size="md" className="border-white/30 border-t-white" />
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
      className={`${QUOTE_CARD_CLASS} bg-brand-dark-green p-6 text-white relative`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl -ml-8 -mb-8"></div>
      
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm rounded-full shadow-inner">
            <Quote className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Inspiración</span>
        </div>

        <blockquote className="text-lg sm:text-xl font-medium text-white/95 leading-snug mb-6 flex-grow">
          &ldquo;{data.content}&rdquo;
        </blockquote>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
              <span className="text-[11px] font-bold text-white">{data.author.charAt(0)}</span>
            </div>
            <p className="text-sm font-semibold text-white/90">
              {data.author}
            </p>
          </div>
          <button
            onClick={refetch}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
            aria-label="Nueva frase"
            title="Nueva frase"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;
