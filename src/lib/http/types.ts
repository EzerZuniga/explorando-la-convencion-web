export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  unit: string;
}

export interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    links: { html: string };
  };
  links: { html: string };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface CountryInfo {
  name: { common: string; official: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  flags: { png: string; svg: string; alt: string };
  latlng: [number, number];
  area: number;
  timezones: string[];
}

export interface QuoteData {
  id: string;
  content: string;
  author: string;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}

export interface ExchangeRateData {
  base: string;
  rates: {
    USD: number;
    EUR: number;
    PEN: number;
    BRL: number;
    COP: number;
  };
  lastUpdated: string;
}
