import LoadingSpinner from "../LoadingSpinner";

export interface PageLoaderProps {
  label?: string;
}

export default function PageLoader({ label = "Cargando..." }: PageLoaderProps) {
  return (
    <div
      className="wp-shell flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-brand-text/75  text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
