import { apiClient } from './client';
import type { CountryInfo } from './types';

// REST Countries API — Free, no API key needed
const BASE_URL = 'https://restcountries.com/v3.1';

export async function getCountryInfo(
  name: string = 'peru',
): Promise<CountryInfo> {
  const data = await apiClient.get<CountryInfo[]>(
    `${BASE_URL}/name/${encodeURIComponent(name)}`,
    {
      params: {
        fields:
          'name,capital,population,region,subregion,languages,currencies,flags,latlng,area,timezones',
      },
    },
  );
  return data[0];
}

export async function getCountriesByRegion(
  region: string = 'americas',
): Promise<CountryInfo[]> {
  return apiClient.get<CountryInfo[]>(
    `${BASE_URL}/region/${encodeURIComponent(region)}`,
    {
      params: {
        fields: 'name,capital,population,flags,region,subregion',
      },
    },
  );
}
