"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Compass,
  MapPin,
  Heart,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { EMAIL_REGEX } from "@/constants";
import { signIn, signUp } from "@/lib/auth-client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string, picture?: string) => void;
}

type AuthFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthFormErrors = Partial<Record<keyof AuthFormData, string>>;

type AuthStatus = {
  type: "success" | "error" | "info";
  text: string;
};

const INITIAL_FORM: AuthFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [status, setStatus] = useState<AuthStatus | null>(null);

  useEffect(() => {
    if (isOpen) return;
    setShowPassword(false);
    setIsSubmitting(false);
    setIsGoogleLoading(false);
    setErrors({});
    setStatus(null);
    setFormData(INITIAL_FORM);
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setStatus(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: window.location.pathname,
      });
    } catch (error) {
      console.error("Login Failed", error);
      setStatus({
        type: "error",
        text: "No se pudo iniciar sesión con Google. Inténtalo nuevamente.",
      });
      setIsGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleModeToggle = () => {
    setIsRegistering((prev) => !prev);
    setErrors({});
    setStatus(null);
    setShowPassword(false);
    setFormData(INITIAL_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const normalized: AuthFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const nextErrors: AuthFormErrors = {};

    if (isRegistering) {
      if (normalized.name.length < 2) {
        nextErrors.name = "Ingresa tu nombre completo.";
      }
      if (!EMAIL_REGEX.test(normalized.email)) {
        nextErrors.email = "Ingresa un correo electrónico válido.";
      }
      if (normalized.password.length < 6) {
        nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      }
      if (normalized.password !== normalized.confirmPassword) {
        nextErrors.confirmPassword = "Las contraseñas no coinciden.";
      }

      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        setStatus({
          type: "error",
          text: "Revisa los campos marcados para continuar.",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await signUp.email({
          name: normalized.name,
          email: normalized.email,
          password: normalized.password,
          callbackURL: "/",
        });
        setIsRegistering(false);
        setErrors({});
        setFormData({ ...INITIAL_FORM, email: normalized.email });
        setStatus({
          type: "success",
          text: "¡Registro exitoso! Ahora inicia sesión con tu correo.",
        });
      } catch (error) {
        console.error("Register failed", error);
        setStatus({
          type: "error",
          text: "No se pudo crear la cuenta. Inténtalo nuevamente.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!EMAIL_REGEX.test(normalized.email)) {
        nextErrors.email = "Ingresa un correo electrónico válido.";
      }
      if (!normalized.password) {
        nextErrors.password = "Ingresa tu contraseña.";
      }

      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        setStatus({
          type: "error",
          text: "Completa los campos requeridos.",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await signIn.email({
          email: normalized.email,
          password: normalized.password,
          callbackURL: "/",
        });
        onLogin(normalized.email, normalized.email.split("@")[0]);
        onClose();
      } catch (error) {
        console.error("Login failed", error);
        setStatus({
          type: "error",
          text: "Las credenciales ingresadas no son válidas.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof AuthFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status) {
      setStatus(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="wp-card shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-brand-primary via-brand-text/90 to-brand-text overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')] bg-cover bg-center" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-brand-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                {isRegistering
                  ? "¡Únete a la aventura!"
                  : "¡Bienvenido de nuevo!"}
              </h2>
            </div>
            <p className="text-sm text-white/90 drop-shadow">
              {isRegistering
                ? "Crea tu cuenta y descubre los secretos de La Convención"
                : "Continúa explorando los destinos más increíbles"}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary mx-auto mb-1" />
              <p className="text-xs text-gray-600 ">Guarda destinos</p>
            </div>
            <div className="p-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 ">Crea favoritos</p>
            </div>
            <div className="p-2">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-brand-secondary mx-auto mb-1" />
              <p className="text-xs text-gray-600 ">Rutas personalizadas</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 bg-white  border border-gray-300  hover:bg-gray-50  rounded-xl shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-sm sm:text-base text-gray-700 ">
              {isGoogleLoading
                ? "Conectando con Google..."
                : "Continuar con Google"}
            </span>
          </button>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300  to-transparent" />
            <span className="text-sm font-medium text-gray-500  px-2">O</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300  to-transparent" />
          </div>

          <div className="min-h-[1.5rem]" aria-live="polite">
            {status && (
              <p
                className={`text-sm ${
                  status.type === "success"
                    ? "text-green-700 "
                    : status.type === "info"
                      ? "text-brand-secondary "
                      : "text-red-700 "
                }`}
                role={status.type === "error" ? "alert" : undefined}
              >
                {status.text}
              </p>
            )}
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700  ml-1 mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  maxLength={80}
                  className={`wp-input pl-11 py-3.5 ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""}`}
                  placeholder="Ej: Juan Pérez López"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "register-name-error" : undefined
                  }
                />
              </div>
              {errors.name && (
                <p
                  id="register-name-error"
                  className="mt-1 text-xs text-red-700 "
                >
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700  ml-1 mb-1.5">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                inputMode="email"
                maxLength={120}
                className={`wp-input pl-11 py-3.5 ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""}`}
                placeholder="tu@email.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "auth-email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p id="auth-email-error" className="mt-1 text-xs text-red-700 ">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700  ml-1 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={isRegistering ? 6 : 1}
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
                className={`wp-input pl-11 pr-12 py-3.5 ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""}`}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "auth-password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary "
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="auth-password-error"
                className="mt-1 text-xs text-red-700 "
              >
                {errors.password}
              </p>
            )}
            {!isRegistering && (
              <div className="text-right mt-1.5">
                <button
                  type="button"
                  className="text-xs text-brand-primary  hover:underline font-medium"
                  onClick={() =>
                    setStatus({
                      type: "info",
                      text: "La recuperación de contraseña estará disponible pronto.",
                    })
                  }
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700  ml-1 mb-1.5">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className={`wp-input pl-11 py-3.5 ${errors.confirmPassword ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""}`}
                  placeholder="••••••••"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "auth-confirm-password-error"
                      : undefined
                  }
                />
              </div>
              {errors.confirmPassword && (
                <p
                  id="auth-confirm-password-error"
                  className="mt-1 text-xs text-red-700 "
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full wp-btn-primary py-3.5"
            disabled={isSubmitting || isGoogleLoading}
            aria-busy={isSubmitting}
          >
            {isSubmitting
              ? isRegistering
                ? "Creando cuenta..."
                : "Iniciando sesión..."
              : isRegistering
                ? "Crear mi cuenta"
                : "Iniciar sesión"}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600  mb-2">
              {isRegistering
                ? "¿Ya tienes una cuenta?"
                : "¿Aún no tienes cuenta?"}
            </p>
            <button
              type="button"
              onClick={handleModeToggle}
              className="text-brand-primary  hover:text-brand-primary  font-semibold text-sm hover:underline"
            >
              {isRegistering ? "Inicia sesión aquí" : "Crea tu cuenta gratis"}
            </button>
          </div>

          <p className="text-xs text-gray-500  text-center leading-relaxed px-2">
            Al continuar, aceptas nuestros{" "}
            <a
              href="#"
              className="text-brand-primary  hover:underline font-medium"
            >
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a
              href="#"
              className="text-brand-primary  hover:underline font-medium"
            >
              Política de Privacidad
            </a>
          </p>

          <div className="mt-4 p-3 bg-brand-background  border border-brand-primary/15 ">
            <p className="text-xs text-center text-gray-700  font-medium">
              🌿{" "}
              <span className="text-brand-primary ">
                La Convención te espera
              </span>{" "}
              - Aventura, naturaleza y cultura en cada rincón
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
