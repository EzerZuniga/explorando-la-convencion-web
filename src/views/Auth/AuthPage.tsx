"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowLeft,
  MapPin,
  Heart,
  Compass,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { EMAIL_REGEX } from "@/constants";
import { signIn, signUp } from "@/lib/auth/client";
import { useAuth } from "@/features/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Animation variants ───────────────────────────────────────────────────────

const fieldGroupVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const statusVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto" as const,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    height: 0,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

// ─── Left-panel benefits ──────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: MapPin,
    label: "Guarda tus destinos favoritos",
    iconColor: "text-emerald-300",
  },
  {
    icon: Heart,
    label: "Crea listas de lugares increíbles",
    iconColor: "text-rose-300",
  },
  {
    icon: Compass,
    label: "Planifica rutas personalizadas",
    iconColor: "text-amber-300",
  },
] as const;

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: React.ReactNode;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">{label}</div>
      {children}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();

  // Validate callbackUrl — only allow same-origin relative paths (OWASP: open-redirect prevention)
  const rawCallback = searchParams.get("callbackUrl") ?? "/";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/";

  const defaultMode = searchParams.get("mode");

  const [isRegistering, setIsRegistering] = useState(defaultMode === "register");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [status, setStatus] = useState<AuthStatus | null>(null);

  // Redirect already-authenticated users back to callbackUrl
  useEffect(() => {
    if (!authLoading && user) {
      router.replace(callbackUrl);
    }
  }, [user, authLoading, router, callbackUrl]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleModeToggle() {
    setIsRegistering((prev) => !prev);
    setErrors({});
    setStatus(null);
    setShowPassword(false);
    setFormData(INITIAL_FORM);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuthFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status?.type === "error") setStatus(null);
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true);
    setStatus(null);
    try {
      await signIn.social({ provider: "google", callbackURL: callbackUrl });
    } catch {
      setStatus({
        type: "error",
        text: "No se pudo iniciar sesión con Google. Inténtalo nuevamente.",
      });
      setIsGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const n: AuthFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const nextErrors: AuthFormErrors = {};

    if (isRegistering) {
      if (n.name.length < 2) nextErrors.name = "Ingresa tu nombre completo.";
      if (!EMAIL_REGEX.test(n.email)) nextErrors.email = "Correo electrónico no válido.";
      if (n.password.length < 8) nextErrors.password = "Mínimo 8 caracteres.";
      if (n.password !== n.confirmPassword)
        nextErrors.confirmPassword = "Las contraseñas no coinciden.";

      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await signUp.email({
          name: n.name,
          email: n.email,
          password: n.password,
          callbackURL: callbackUrl,
        });
        setIsRegistering(false);
        setErrors({});
        setFormData({ ...INITIAL_FORM, email: n.email });
        setStatus({ type: "success", text: "¡Cuenta creada! Ahora inicia sesión con tu correo." });
      } catch {
        setStatus({ type: "error", text: "No se pudo crear la cuenta. Inténtalo nuevamente." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!EMAIL_REGEX.test(n.email)) nextErrors.email = "Correo electrónico no válido.";
      if (!n.password) nextErrors.password = "Ingresa tu contraseña.";

      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await signIn.email({
          email: n.email,
          password: n.password,
          callbackURL: callbackUrl,
        });
        router.push(callbackUrl);
      } catch {
        setStatus({ type: "error", text: "Las credenciales ingresadas no son válidas." });
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const isLoading = isSubmitting || isGoogleLoading;

  // Show spinner while session is being resolved to avoid flash-of-form for
  // already-authenticated users
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#1B5E20] animate-spin" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex bg-white">
      {/* ═══════════════════════════════════════════════════════
          LEFT PANEL — visible lg+, immersive brand experience
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative hidden lg:flex lg:w-[460px] xl:w-[520px] 2xl:w-[560px] flex-shrink-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        aria-hidden="true"
      >
        {/* Background image */}
        <Image
          src="/images/hero/hero-main.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 520px, 460px"
          className="object-cover object-center"
        />

        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20]/90 via-[#1B5E20]/72 to-[#0d2b15]/94" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full w-full p-10 xl:p-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/brand/logo.png"
              alt="Explorando La Convención"
              width={1486}
              height={515}
              className="h-10 xl:h-12 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Main copy */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="text-3xl xl:text-[2.1rem] font-bold text-white leading-snug mb-3">
              Descubre los secretos de{" "}
              <span className="text-[#F59E0B]">La Convención</span>
            </h1>
            <p className="text-sm xl:text-base text-white/70 leading-relaxed mb-10 max-w-[18rem]">
              El corazón selvático de Cusco te espera. Aventuras, cultura y
              gastronomía únicos en cada rincón.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3" aria-label="Beneficios de la cuenta">
              {BENEFITS.map(({ icon: Icon, label, iconColor }, i) => (
                <li key={label}>
                  <motion.div
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.45 + i * 0.1,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                  >
                    <span className="w-9 h-9 rounded-xl bg-white/12 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </span>
                    <span className="text-sm font-medium text-white/88">{label}</span>
                    <CheckCircle className="w-4 h-4 text-white/28 ml-auto flex-shrink-0" />
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tagline */}
          <div className="border-t border-white/12 pt-5 flex-shrink-0">
            <p className="text-xs text-white/45 italic leading-relaxed">
              &ldquo;La Convención es donde la Amazonía y los Andes se abrazan.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          RIGHT PANEL — form (full-width on mobile)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        className="flex-1 flex flex-col min-h-screen overflow-y-auto"
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 sm:px-10 pt-7 pb-5 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#1B5E20] transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/40 rounded"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Volver al inicio
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden">
            <Image
              src="/images/brand/logo.png"
              alt="Explorando La Convención"
              width={1486}
              height={515}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

        {/* ── Form area ────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6">
          <div className="w-full max-w-[22rem] mx-auto">

            {/* Animated heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRegistering ? "heading-reg" : "heading-login"}
                variants={fieldGroupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-7"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1.5">
                  {isRegistering ? "Únete a la aventura" : "¡Bienvenido de nuevo!"}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {isRegistering
                    ? "Crea tu cuenta y guarda tus destinos favoritos"
                    : "Continúa explorando los destinos más increíbles"}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Google sign-in */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/40"
              aria-label="Continuar con Google"
            >
              {isGoogleLoading ? (
                <span className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-[#1B5E20] animate-spin" aria-hidden="true" />
              ) : (
                <FcGoogle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="text-sm font-semibold text-gray-700">
                {isGoogleLoading ? "Conectando..." : "Continuar con Google"}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                o
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Status banner (animated) */}
            <AnimatePresence>
              {status && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden mb-4"
                >
                  {status.type === "error" ? (
                    <div role="alert" className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm border font-medium bg-red-50 text-red-600 border-red-200">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{status.text}</span>
                    </div>
                  ) : status.type === "success" ? (
                    <div role="status" className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm border font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{status.text}</span>
                    </div>
                  ) : (
                    <div role="status" className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm border font-medium bg-amber-50 text-amber-700 border-amber-200">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{status.text}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Email / password form ──────────────────────── */}
            <form onSubmit={handleSubmit} noValidate aria-label="Formulario de autenticación">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isRegistering ? "fields-register" : "fields-login"}
                  variants={fieldGroupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  {/* Name (register only) */}
                  {isRegistering && (
                    <Field
                      label={
                        <label className="text-sm font-medium text-gray-700">
                          Nombre completo
                        </label>
                      }
                      error={errors.name}
                      errorId="err-name"
                    >
                      <div className="relative">
                        <UserIcon
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          maxLength={80}
                          placeholder="Ej: Juan Pérez López"
                          className={`wp-input pl-10 py-3 text-sm ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                          {...(errors.name ? { "aria-invalid": "true" as const, "aria-describedby": "err-name" } : {})}
                        />
                      </div>
                    </Field>
                  )}

                  {/* Email */}
                  <Field
                    label={
                      <label className="text-sm font-medium text-gray-700">
                        Correo electrónico
                      </label>
                    }
                    error={errors.email}
                    errorId="err-email"
                  >
                    <div className="relative">
                      <Mail
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        inputMode="email"
                        maxLength={120}
                        placeholder="tu@email.com"
                        className={`wp-input pl-10 py-3 text-sm ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                        {...(errors.email ? { "aria-invalid": "true" as const, "aria-describedby": "err-email" } : {})}
                      />
                    </div>
                  </Field>

                  {/* Password */}
                  {isRegistering ? (
                    <Field
                      label={
                        <label className="text-sm font-medium text-gray-700">
                          Contraseña
                        </label>
                      }
                      error={errors.password}
                      errorId="err-pw"
                    >
                      <div className="relative">
                        <Lock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`wp-input pl-10 pr-11 py-3 text-sm ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                          {...(errors.password ? { "aria-invalid": "true" as const, "aria-describedby": "err-pw" } : {})}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B5E20] transition-colors focus-visible:outline-none"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </Field>
                  ) : (
                    <Field
                      label={
                        <>
                          <label className="text-sm font-medium text-gray-700">
                            Contraseña
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setStatus({
                                type: "info",
                                text: "La recuperación de contraseña estará disponible pronto.",
                              })
                            }
                            className="text-xs text-[#1B5E20] hover:underline font-medium focus-visible:outline-none"
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        </>
                      }
                      error={errors.password}
                      errorId="err-pw"
                    >
                      <div className="relative">
                        <Lock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className={`wp-input pl-10 pr-11 py-3 text-sm ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                          {...(errors.password ? { "aria-invalid": "true" as const, "aria-describedby": "err-pw" } : {})}
                          aria-describedby={errors.password ? "err-pw" : undefined}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B5E20] transition-colors focus-visible:outline-none"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </Field>
                  )}

                  {/* Confirm password (register only) */}
                  {isRegistering && (
                    <Field
                      label={
                        <label className="text-sm font-medium text-gray-700">
                          Confirmar contraseña
                        </label>
                      }
                      error={errors.confirmPassword}
                      errorId="err-cfw"
                    >
                      <div className="relative">
                        <Lock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          autoComplete="new-password"
                          placeholder="••••••••"
                          className={`wp-input pl-10 py-3 text-sm ${errors.confirmPassword ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                          {...(errors.confirmPassword ? { "aria-invalid": "true" as const, "aria-describedby": "err-cfw" } : {})}
                        />
                      </div>
                    </Field>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.97 }}
                    className="w-full wp-btn-primary py-3 text-sm font-semibold mt-1 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/40"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                          aria-hidden="true"
                        />
                        {isRegistering ? "Creando cuenta..." : "Iniciando sesión..."}
                      </span>
                    ) : isRegistering ? (
                      "Crear mi cuenta"
                    ) : (
                      "Iniciar sesión"
                    )}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </form>

            {/* ── Mode toggle ────────────────────────────────── */}
            <p className="mt-7 text-sm text-center text-gray-500">
              {isRegistering ? "¿Ya tienes una cuenta? " : "¿Aún no tienes cuenta? "}
              <button
                type="button"
                onClick={handleModeToggle}
                className="font-semibold text-[#1B5E20] hover:underline focus-visible:outline-none"
              >
                {isRegistering ? "Inicia sesión" : "Regístrate gratis"}
              </button>
            </p>

            {/* ── Legal ──────────────────────────────────────── */}
            <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
              Al continuar, aceptas nuestros{" "}
              <Link href="/terms" className="text-[#1B5E20] hover:underline">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="text-[#1B5E20] hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="px-6 sm:px-10 py-5 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Explorando La Convención · Quillabamba, Cusco, Perú
          </p>
        </div>
      </motion.div>
    </div>
  );
}
