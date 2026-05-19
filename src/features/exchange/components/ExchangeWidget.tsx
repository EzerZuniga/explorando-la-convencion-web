import React from 'react';
import { DollarSign, ArrowRightLeft } from 'lucide-react';
import { useApi } from '@/hooks';
import { getExchangeRates } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components';

const EXCHANGE_CARD_CLASS =
  'h-full min-h-[285px] overflow-hidden border border-[#DDE9E2] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_18px_42px_rgba(27,67,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(27,67,50,0.16)]';

const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  PEN: '🇵🇪',
  BRL: '🇧🇷',
  COP: '🇨🇴',
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'Dólar USD',
  EUR: 'Euro',
  PEN: 'Sol Peruano',
  BRL: 'Real Brasileño',
  COP: 'Peso Colombiano',
};

const ExchangeWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(() => getExchangeRates('USD'), []);

  if (loading) {
    return (
      <div className={`${EXCHANGE_CARD_CLASS} p-6 flex items-center justify-center`}>
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${EXCHANGE_CARD_CLASS} p-6 flex items-center justify-center`}>
        <ErrorMessage message="No se pudo cargar el tipo de cambio" onRetry={refetch} />
      </div>
    );
  }

  const displayCurrencies = ['PEN', 'EUR', 'BRL', 'COP'] as const;

  return (
    <div className={`${EXCHANGE_CARD_CLASS} p-6`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 bg-brand-background dark:bg-slate-800 border border-brand-primary/30 rounded-none flex items-center justify-center shadow-inner">
          <DollarSign className="w-5 h-5 text-brand-text dark:text-white" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-brand-text dark:text-white uppercase tracking-wide">Tipo de Cambio</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Base referencial: 1 USD</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayCurrencies.map((code) => (
          <div key={code} className="flex items-center justify-between gap-4 rounded-none bg-brand-background/60 dark:bg-slate-800/60 px-3 py-2.5 border border-transparent transition-colors hover:border-brand-primary/40">
            <div className="flex items-center gap-2">
              <span className="text-lg">{CURRENCY_FLAGS[code]}</span>
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{code}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{CURRENCY_NAMES[code]}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowRightLeft className="w-3 h-3 text-gray-400" strokeWidth={1.75} />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {data.rates[code]?.toFixed(code === 'COP' ? 0 : 2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
        Actualizado: {data.lastUpdated}
      </p>
    </div>
  );
};

export default ExchangeWidget;
