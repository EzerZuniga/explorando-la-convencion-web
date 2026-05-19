import { apiClient } from './httpClient';
import type { ExchangeRateResponse, ExchangeRateData } from './types';

// ExchangeRate API — Free tier, no key needed
const BASE_URL = 'https://open.er-api.com/v6/latest';

export async function getExchangeRates(base: string = 'USD'): Promise<ExchangeRateData> {
  const data = await apiClient.get<ExchangeRateResponse>(
    `${BASE_URL}/${encodeURIComponent(base)}`,
  );

  return {
    base: data.base_code,
    rates: {
      USD: data.conversion_rates.USD ?? 1,
      EUR: data.conversion_rates.EUR ?? 0,
      PEN: data.conversion_rates.PEN ?? 0,
      BRL: data.conversion_rates.BRL ?? 0,
      COP: data.conversion_rates.COP ?? 0,
    },
    lastUpdated: new Date().toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}
