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
