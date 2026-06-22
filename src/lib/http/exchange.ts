import { apiClient } from './client';
import { withCache } from './cache';
import type { ExchangeRateResponse, ExchangeRateData } from './types';

// Exchange rates are updated hourly by the provider — refresh every 60 minutes
const EXCHANGE_TTL = 60 * 60 * 1000;

// ExchangeRate API — Free tier, no key needed
const BASE_URL = 'https://open.er-api.com/v6/latest';

export function getExchangeRates(
  base: string = 'USD',
): Promise<ExchangeRateData> {
  return withCache(
    `exchange:${base}`,
    async () => {
      const data = await apiClient.get<ExchangeRateResponse>(
        `${BASE_URL}/${encodeURIComponent(base)}`,
      );

      return {
        base: data.base_code,
        rates: {
          USD: data.rates.USD ?? 1,
          EUR: data.rates.EUR ?? 0,
          PEN: data.rates.PEN ?? 0,
          BRL: data.rates.BRL ?? 0,
          COP: data.rates.COP ?? 0,
        },
        lastUpdated: new Date().toLocaleDateString('es-PE', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    },
    EXCHANGE_TTL,
  );
}
