import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/utils";

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 p-6 text-center",
        className,
      )}
      role="alert"
    >
      <AlertTriangle className="w-8 h-8 text-brand-secondary" />
      <p className="text-sm text-brand-text/75 ">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="wp-btn-secondary px-4 py-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
