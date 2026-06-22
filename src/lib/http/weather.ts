import { apiClient } from './client';
import { withCache } from './cache';
import type { WeatherResponse, WeatherData } from './types';

// Weather changes slowly — refresh every 15 minutes
const WEATHER_TTL = 15 * 60 * 1000;

// Open-Meteo API — Free, no API key needed
// Coords for Quillabamba, La Convención, Cusco
const QUILLABAMBA_LAT = -12.87;
const QUILLABAMBA_LON = -72.69;

const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Despejado', icon: '☀️' },
  1: { description: 'Mayormente despejado', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Neblina', icon: '🌫️' },
  48: { description: 'Neblina helada', icon: '🌫️' },
  51: { description: 'Llovizna ligera', icon: '🌦️' },
  53: { description: 'Llovizna moderada', icon: '🌦️' },
  55: { description: 'Llovizna densa', icon: '🌧️' },
  61: { description: 'Lluvia ligera', icon: '🌧️' },
  63: { description: 'Lluvia moderada', icon: '🌧️' },
  65: { description: 'Lluvia fuerte', icon: '🌧️' },
  71: { description: 'Nevada ligera', icon: '🌨️' },
  73: { description: 'Nevada moderada', icon: '🌨️' },
  75: { description: 'Nevada fuerte', icon: '❄️' },
  80: { description: 'Chubascos ligeros', icon: '🌦️' },
  81: { description: 'Chubascos moderados', icon: '🌧️' },
  82: { description: 'Chubascos fuertes', icon: '⛈️' },
  95: { description: 'Tormenta eléctrica', icon: '⛈️' },
  96: { description: 'Tormenta con granizo', icon: '⛈️' },
  99: { description: 'Tormenta fuerte con granizo', icon: '⛈️' },
};

function getWeatherInfo(code: number) {
  return WEATHER_CODES[code] ?? { description: 'Desconocido', icon: '🌡️' };
}

export function getWeather(): Promise<WeatherData> {
  return withCache(
    'weather:quillabamba',
    async () => {
      const data = await apiClient.get<WeatherResponse>(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: String(QUILLABAMBA_LAT),
            longitude: String(QUILLABAMBA_LON),
            current:
              'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
            timezone: 'America/Lima',
          },
        },
      );

      const { description, icon } = getWeatherInfo(data.current.weather_code);

      return {
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        description,
        icon,
        unit: data.current_units.temperature_2m,
      };
    },
    WEATHER_TTL,
  );
}
