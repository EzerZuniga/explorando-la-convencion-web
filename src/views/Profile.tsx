"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, User as UserIcon, Shield } from "lucide-react";
import { useAuth } from "@/features/auth";

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  apple: "Apple",
  github: "GitHub",
  microsoft: "Microsoft",
};

export default function Profile() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-background">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-brand-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-white to-brand-secondary/10 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-brand-primary hover:text-brand-text mb-8 transition-all duration-200"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="font-semibold text-sm">Volver al inicio</span>
        </button>

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#111B21] to-[#1a2c36] px-8 py-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-white" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left pb-1">
              <h1 className="text-2xl font-heading font-bold text-white leading-tight">
                {user.name}
              </h1>
              <p className="text-white/80 text-sm mt-1">{user.email}</p>
            </div>
          </div>

          {/* Info fields */}
          <div className="px-8 py-8 space-y-4">
            <InfoRow icon={UserIcon} label="Nombre" value={user.name} />
            <InfoRow icon={Mail} label="Correo electrónico" value={user.email} />
            <InfoRow
              icon={Shield}
              label="Proveedor de acceso"
              value={PROVIDER_LABELS[user.provider ?? ""] ?? "OAuth"}
            />
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-brand-primary" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-brand-text mt-0.5">{value}</p>
      </div>
    </div>
  );
}
