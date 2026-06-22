"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Settings,
  Bell,
  Eye,
  Lock,
  LogOut,
  ArrowLeft,
  CheckCircle,
  Heart,
  BookmarkCheck,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/features/auth";

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      await signOut();
      router.replace("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-background via-white to-brand-secondary/15    flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-white to-brand-secondary/15    py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-brand-primary  hover:text-brand-text/90  mb-6 sm:mb-8 transition-all duration-200 hover:gap-3"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="font-semibold">Volver al inicio</span>
        </button>

        {/* Header de perfil con diseño mejorado */}
        <div className="bg-white  rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 border border-gray-100  backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
            {/* Avatar grande */}
            <div className="relative">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={160}
                  height={160}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-brand-primary  shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary to-brand-text/90 flex items-center justify-center border-4 border-brand-primary shadow-lg">
                  <span className="text-white font-bold text-5xl sm:text-6xl lg:text-7xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-10 h-10 bg-brand-primary rounded-full border-4 border-white  flex items-center justify-center shadow-lg">
                <CheckCircle size={20} className="text-white" />
              </div>
            </div>

            {/* Información del usuario */}
            <div className="flex-1 text-center lg:text-left w-full">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900  mb-3 tracking-tight leading-tight">
                {user.name}
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-gray-600 ">
                <Mail size={18} className="flex-shrink-0" />
                <p className="text-sm sm:text-base break-all font-light">
                  {user.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-5">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-background  text-brand-primary  rounded-lg text-sm font-medium border border-brand-primary/25 ">
                  <CheckCircle size={18} />
                  <span className="font-semibold">Cuenta verificada</span>
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-background  text-brand-text/80  rounded-lg text-sm font-medium border border-brand-primary/20 ">
                  <Shield size={18} />
                  <span className="font-semibold">Google Account</span>
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-600  max-w-2xl font-light leading-relaxed">
                Bienvenido a tu perfil personal. Aquí puedes gestionar tu
                información, preferencias y configuración de cuenta.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs mejorados */}
        <div className="bg-white  rounded-xl shadow-sm border border-gray-200 ">
          <div className="border-b border-gray-200 ">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 min-w-fit py-5 sm:py-6 px-8 sm:px-10 text-center font-medium transition-all duration-200 text-base sm:text-lg ${
                  activeTab === "profile"
                    ? "border-b-[3px] border-brand-primary text-brand-primary  bg-brand-background/30 "
                    : "text-gray-600  hover:text-gray-900  hover:bg-gray-50 "
                }`}
              >
                <User className="inline-block mr-2.5" size={22} />
                <span className="hidden sm:inline font-semibold">
                  Mi Perfil
                </span>
                <span className="sm:hidden font-semibold">Perfil</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 min-w-fit py-5 sm:py-6 px-8 sm:px-10 text-center font-medium transition-all duration-200 text-base sm:text-lg ${
                  activeTab === "settings"
                    ? "border-b-[3px] border-brand-primary text-brand-primary  bg-brand-background/30 "
                    : "text-gray-600  hover:text-gray-900  hover:bg-gray-50 "
                }`}
              >
                <Settings className="inline-block mr-2.5" size={22} />
                <span className="hidden sm:inline font-semibold">
                  Configuración
                </span>
                <span className="sm:hidden font-semibold">Config</span>
              </button>
            </nav>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            {activeTab === "profile" ? (
              /* Pestaña de Perfil */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900  mb-5 tracking-tight">
                    Información de la cuenta
                  </h2>
                  <div className="space-y-5">
                    {/* Nombre completo */}
                    <div className="flex items-start gap-5 p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="w-14 h-14 rounded-xl bg-brand-primary/15  flex items-center justify-center flex-shrink-0">
                        <User className="text-brand-primary " size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500  mb-2">
                          Nombre completo
                        </p>
                        <p className="text-lg font-semibold text-gray-900  break-words">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-5 p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="w-14 h-14 rounded-xl bg-brand-background  flex items-center justify-center flex-shrink-0">
                        <Mail className="text-brand-text/70 " size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500  mb-2">
                          Correo electrónico
                        </p>
                        <p className="text-lg font-semibold text-gray-900  break-all">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3">
                          <CheckCircle
                            size={16}
                            className="text-brand-primary "
                          />
                          <p className="text-sm font-medium text-brand-primary ">
                            Verificado
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Proveedor */}
                    <div className="flex items-start gap-5 p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="w-14 h-14 rounded-xl bg-brand-background  flex items-center justify-center flex-shrink-0">
                        <Shield className="text-brand-text/70 " size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500  mb-2">
                          Proveedor de autenticación
                        </p>
                        <p className="text-lg font-semibold text-gray-900 ">
                          Google
                        </p>
                        <p className="text-sm text-gray-500  mt-3 font-light">
                          Tu cuenta está protegida por Google
                        </p>
                      </div>
                    </div>

                    {/* Fecha de registro */}
                    <div className="flex items-start gap-5 p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="w-14 h-14 rounded-xl bg-brand-secondary/25  flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-brand-secondary " size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500  mb-2">
                          Miembro desde
                        </p>
                        <p className="text-lg font-semibold text-gray-900 ">
                          {new Date().toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900  mb-5 tracking-tight">
                    Tu actividad
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    <div className="bg-gradient-to-br from-brand-primary to-brand-primary rounded-xl p-6 sm:p-7 text-white shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <BookmarkCheck size={24} />
                        </div>
                      </div>
                      <p className="text-brand-primary/15 text-sm font-medium uppercase tracking-wider mb-3">
                        Artículos guardados
                      </p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-text/55 to-brand-text/70 rounded-xl p-6 sm:p-7 text-white shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                          <MessageSquare size={26} />
                        </div>
                      </div>
                      <p className="text-brand-background text-sm font-medium uppercase tracking-wider mb-3">
                        Comentarios
                      </p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-secondary to-brand-secondary rounded-xl p-6 sm:p-7 text-white shadow-md sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                          <Heart size={26} />
                        </div>
                      </div>
                      <p className="text-brand-secondary/25 text-sm font-medium uppercase tracking-wider mb-3">
                        Me gusta dados
                      </p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Pestaña de Configuración */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900  mb-5 tracking-tight">
                    Preferencias
                  </h2>
                  <div className="space-y-5">
                    {/* Notificaciones */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-brand-background  flex items-center justify-center flex-shrink-0">
                          <Bell className="text-brand-text/70 " size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900  mb-1">
                            Notificaciones
                          </p>
                          <p className="text-sm text-gray-600  font-light">
                            Gestiona tus alertas y recordatorios
                          </p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-brand-text/70 hover:bg-brand-text/80 rounded-lg w-full sm:w-auto transition-colors">
                        Configurar
                      </button>
                    </div>

                    {/* Privacidad */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-brand-background  flex items-center justify-center flex-shrink-0">
                          <Eye className="text-brand-text/70 " size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900  mb-1">
                            Privacidad
                          </p>
                          <p className="text-sm text-gray-600  font-light">
                            Controla quién puede ver tu información
                          </p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-brand-text/80 hover:bg-brand-text/90 rounded-lg w-full sm:w-auto transition-colors">
                        Ver opciones
                      </button>
                    </div>

                    {/* Seguridad */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white  rounded-xl border border-gray-200 ">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-brand-secondary/25  flex items-center justify-center flex-shrink-0">
                          <Lock className="text-brand-secondary " size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900  mb-1">
                            Seguridad
                          </p>
                          <p className="text-sm text-gray-600  font-light">
                            Protege tu cuenta con opciones avanzadas
                          </p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-brand-secondary hover:bg-brand-secondary rounded-lg w-full sm:w-auto transition-colors">
                        Revisar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zona de peligro */}
                <div className="pt-4">
                  <h2 className="text-lg font-bold text-red-600  mb-4 flex items-center gap-2 tracking-tight">
                    <Shield size={22} />
                    Zona de peligro
                  </h2>
                  <div className="space-y-5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-6 bg-white  rounded-xl border-2 border-red-300  hover:bg-red-50  transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-red-100  flex items-center justify-center">
                          <LogOut className="text-red-600 " size={24} />
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-semibold text-red-600 ">
                            Cerrar sesión
                          </p>
                          <p className="text-sm text-gray-600  font-light">
                            Salir de tu cuenta de forma segura
                          </p>
                        </div>
                      </div>
                      <LogOut size={22} className="text-red-600 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
