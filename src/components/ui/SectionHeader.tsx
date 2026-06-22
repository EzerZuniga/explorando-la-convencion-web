import React from "react";
import { cn } from "@/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  accentColor = "#25D366",
  className = "",
}) => {
  return (
    <div
      className={cn(
        "text-center max-w-4xl mx-auto mb-12 animate-reveal-up",
        className,
      )}
    >
      <h2 className="wp-title text-brand-text  mb-4">{title}</h2>
      <div className="w-20 h-[2px] mx-auto mb-4 rounded-full bg-brand-primary" />
      {subtitle && <p className="wp-lead max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
