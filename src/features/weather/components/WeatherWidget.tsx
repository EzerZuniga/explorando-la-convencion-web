import React from 'react';
import { Wind, Droplets, ThermometerSun } from 'lucide-react';
import { useApi } from '@/hooks';
import { getWeather } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components';

const WEATHER_CARD_CLASS =
  'h-full min-h-[285px] overflow-hidden border border-brand-primary/25 shadow-[0_18px_42px_rgba(27,67,50,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(27,67,50,0.2)]';

const WeatherWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getWeather, []);

  if (loading) {
    return (
      <div className={`${WEATHER_CARD_CLASS} bg-gradient-to-br from-brand-primary via-[#3D9840] to-brand-text p-6 text-white flex items-center justify-center`}>
        <LoadingSpinner size="lg" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${WEATHER_CARD_CLASS} bg-white dark:bg-slate-900 p-6 flex items-center justify-center`}>
        <ErrorMessage message="No se pudo cargar el clima" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={`${WEATHER_CARD_CLASS} bg-gradient-to-br from-brand-primary via-[#3D9840] to-brand-text p-6 text-white relative`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_34%)]"></div>
      <div className="relative z-10 flex h-full flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Clima en Quillabamba</h3>
          <p className="text-xs text-white/75 mt-1">La Convención, Cusco</p>
        </div>
        <span className="text-4xl drop-shadow-sm" role="img" aria-label={data.description}>{data.icon}</span>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold leading-none">{data.temperature}</span>
        <span className="text-xl text-white/80 mb-1">{data.unit}</span>
      </div>

      <p className="text-sm text-white/95 font-semibold mb-5">{data.description}</p>

      <div className="mt-auto grid grid-cols-3 gap-3 pt-5 border-t border-white/25">
        <div className="flex flex-col items-center gap-1 rounded-none bg-white/10 p-3">
          <ThermometerSun className="w-4 h-4 text-white/70" strokeWidth={1.75} />
          <span className="text-xs text-white/70">Temp.</span>
          <span className="text-sm font-semibold">{data.temperature}°</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-none bg-white/10 p-3">
          <Droplets className="w-4 h-4 text-white/70" strokeWidth={1.75} />
          <span className="text-xs text-white/70">Humedad</span>
          <span className="text-sm font-semibold">{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-none bg-white/10 p-3">
          <Wind className="w-4 h-4 text-white/70" strokeWidth={1.75} />
          <span className="text-xs text-white/70">Viento</span>
          <span className="text-sm font-semibold">{data.windSpeed} km/h</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
