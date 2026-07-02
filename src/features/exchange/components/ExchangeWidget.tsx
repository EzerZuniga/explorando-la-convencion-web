import React from "react";
import { DollarSign, ArrowRightLeft } from "lucide-react";
import { useApi } from "@/hooks";
import { getExchangeRates } from "@/lib/http";
import { LoadingSpinner, ErrorMessage } from "@/components";

const EXCHANGE_CARD_CLASS =
  "h-full min-h-[285px] overflow-hidden border border-brand-primary/20  shadow-[0_18px_42px_rgba(37,211,102,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(37,211,102,0.16)]";

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  PEN: "🇵🇪",
  BRL: "🇧🇷",
  COP: "🇨🇴",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "Dólar USD",
  EUR: "Euro",
  PEN: "Sol Peruano",
  BRL: "Real Brasileño",
  COP: "Peso Colombiano",
};

const ExchangeWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(
    () => getExchangeRates("USD"),
  );

  if (loading) {
    return (
      <div
        className={`${EXCHANGE_CARD_CLASS} bg-[#111B21] p-6 flex items-center justify-center`}
      >
        <LoadingSpinner size="md" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={`${EXCHANGE_CARD_CLASS} bg-white p-6 flex items-center justify-center`}
      >
        <ErrorMessage
          message="No se pudo cargar el tipo de cambio"
          onRetry={refetch}
        />
      </div>
    );
  }

  const displayCurrencies = ["PEN", "EUR", "BRL", "COP"] as const;

  return (
    <div
      className={`${EXCHANGE_CARD_CLASS} bg-[#111B21] p-6 text-white relative`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_40%)]"></div>
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Tipo de Cambio
            </h3>
            <p className="text-xs text-white/75 mt-1">Base referencial: 1 USD</p>
          </div>
          <div className="w-11 h-11 bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <DollarSign className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>
        </div>

        <div className="space-y-2 flex-grow">
          {displayCurrencies.map((code) => (
            <div
              key={code}
              className="flex items-center justify-between gap-4 bg-white/5 px-4 py-2 border border-white/10 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl drop-shadow-md">{CURRENCY_FLAGS[code]}</span>
                <div>
                  <span className="text-sm font-bold text-white block leading-tight">
                    {code}
                  </span>
                  <span className="text-[10px] text-white/60 uppercase tracking-wider block">
                    {CURRENCY_NAMES[code].split(' ')[0]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRightLeft
                  className="w-3 h-3 text-white/40"
                  strokeWidth={1.75}
                />
                <span className="text-sm font-bold text-white">
                  {data.rates[code]?.toFixed(code === "COP" ? 0 : 2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/15">
          <p className="text-xs text-white/50 text-center font-medium tracking-wide">
            Actualizado: {data.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeWidget;
