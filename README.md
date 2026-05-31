# Explorando la Convención

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)

Portal web informativo sobre turismo, cultura, gastronomía y experiencias de viaje en la provincia de La Convención, Cusco, Perú. El proyecto está construido con Next.js App Router, componentes React tipados, Tailwind CSS, autenticación con Better Auth y persistencia mediante Prisma/PostgreSQL.

La aplicación prioriza rendimiento, SEO, accesibilidad, diseño responsive y una arquitectura mantenible para seguir ampliando secciones públicas, contenido editorial y funcionalidades de usuario.

---

## Tabla de contenidos

1. [Características clave](#características-clave)
2. [Arquitectura y stack](#arquitectura-y-stack)
3. [Comenzar](#comenzar)
4. [Variables de entorno](#variables-de-entorno)
5. [Scripts disponibles](#scripts-disponibles)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Base de datos y autenticación](#base-de-datos-y-autenticación)
8. [Calidad y buenas prácticas](#calidad-y-buenas-prácticas)
9. [Despliegue](#despliegue)
10. [Licencia](#licencia)

---

## Características clave

- **Portal turístico editorial**: páginas para inicio, destinos, gastronomía, blog, galería, tips, contacto, perfil y equipo.
- **SEO con App Router**: metadata, canonical URLs, Open Graph, Twitter cards, sitemap, robots y JSON-LD del sitio.
- **Internacionalización**: contenido centralizado en `src/features/i18n` con selector de idioma reutilizable.
- **Autenticación moderna**: integración con Better Auth, Google OAuth y persistencia de sesión.
- **Experiencia de usuario responsive**: navbar adaptable, newsletter global, footer institucional, FAQ, mapa embebido y componentes optimizados para lectura.
- **Diseño consistente en modo claro**: Tailwind CSS con tokens de marca, layout mobile-first y estados de foco visibles.
- **Datos persistentes**: modelos Prisma para usuarios, sesiones, cuentas, favoritos, eventos guardados y preferencias.

## Arquitectura y stack

| Capa | Tecnologías | Descripción |
| --- | --- | --- |
| Framework | Next.js 15, App Router | Rutas públicas, API routes, metadata, renderizado estático y dinámico. |
| UI | React 19, TypeScript | Componentes tipados, hooks y estado local para interacciones. |
| Estilos | Tailwind CSS, CSS global | Sistema visual utilitario, responsive y orientado a modo claro. |
| Autenticación | Better Auth, Google OAuth | Sesiones, cuentas externas y usuario autenticado. |
| Datos | Prisma, PostgreSQL | Esquema relacional para usuarios y funcionalidades guardadas. |
| SEO | Metadata API, JSON-LD, sitemap, robots | Mejor indexación y tarjetas sociales. |
| Calidad | ESLint, TypeScript, Prettier | Validación estática y formato consistente. |

## Comenzar

### Requisitos previos

- Node.js 20 LTS o superior recomendado.
- npm 10 o superior.
- PostgreSQL disponible si vas a usar autenticación y persistencia.
- Credenciales de Google OAuth si vas a habilitar login con Google.

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/EzerZuniga/explorando-la-convencion-web.git
cd explorando-la-convencion-web

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env

# 4. Genera el cliente de Prisma
npx prisma generate

# 5. Levanta el servidor de desarrollo
npm run dev
```

La aplicación queda disponible por defecto en `http://localhost:3000`.

## Variables de entorno

El archivo `.env.example` documenta las variables necesarias:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública usada en metadata, canonical URLs y redirecciones. |
| `BETTER_AUTH_SECRET` | Secreto de Better Auth. Debe ser seguro y privado. |
| `BETTER_AUTH_URL` | URL base local o productiva de autenticación. |
| `GOOGLE_CLIENT_ID` | Client ID para login con Google. |
| `GOOGLE_CLIENT_SECRET` | Client secret para login con Google. |
| `DATABASE_URL` | Cadena de conexión PostgreSQL usada por Prisma. |

Nunca subas valores reales de secretos al repositorio. En producción, configura estas variables en el proveedor de hosting.

## Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo. |
| `npm run build` | Genera la build optimizada de producción. |
| `npm run start` | Sirve la build generada por Next.js. |
| `npm run lint` | Ejecuta ESLint en archivos JS, JSX, TS y TSX. |
| `npm run typecheck` | Ejecuta TypeScript sin emitir archivos. |
| `npm run postinstall` | Genera Prisma Client después de instalar dependencias. |

## Estructura del proyecto

```text
PortalConvencion-Web/
├── prisma/
│   └── schema.prisma              # Modelos de datos Prisma
├── public/
│   ├── images/                    # Logos, imágenes y recursos visuales
│   ├── video/                     # Video del hero
│   ├── favicon.ico
│   └── raya.png                   # Patrón decorativo del footer
├── src/
│   ├── app/                       # App Router, layouts, páginas y API routes
│   ├── components/                # Componentes UI y layout reutilizables
│   ├── config/                    # Metadata, JSON-LD y configuración SEO
│   ├── constants/                 # Constantes de sitio y validación
│   ├── data/                      # Datos estáticos del portal
│   ├── features/                  # Dominios funcionales: auth, i18n, SEO, widgets
│   ├── hooks/                     # Hooks reutilizables
│   ├── lib/                       # Integraciones de auth, Prisma y utilidades
│   ├── providers/                 # Providers globales de la aplicación
│   ├── styles/                    # Estilos globales
│   ├── types/                     # Tipos compartidos
│   ├── utils/                     # Utilidades generales
│   └── views/                     # Vistas principales de las rutas públicas
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Base de datos y autenticación

El esquema Prisma define las entidades base para autenticación y personalización:

- `User`, `Session`, `Account` y `Verification` para Better Auth.
- `Favorite` para guardar destinos, publicaciones, imágenes, platos, restaurantes o eventos.
- `SavedEvent` para eventos guardados por el usuario.
- `UserPreference` para preferencias configurables por clave.

Comandos útiles durante desarrollo:

```bash
# Regenerar Prisma Client
npx prisma generate

# Crear/aplicar migraciones en desarrollo
npx prisma migrate dev

# Abrir Prisma Studio
npx prisma studio
```

## Calidad y buenas prácticas

Antes de enviar cambios ejecuta:

```bash
npm run lint
npm run typecheck
npm run build
```

Recomendaciones del proyecto:

- Mantén componentes visuales pequeños y reutilizables.
- Centraliza textos editables en `src/features/i18n/translations.ts`.
- Usa `next/image` para imágenes del sitio cuando sea posible.
- Conserva foco visible, labels accesibles y estados `aria-*` en formularios.
- Evita mezclar contenido, estilos y lógica de negocio en un mismo componente si el flujo empieza a crecer.
- Mantén secrets fuera del repositorio y usa `.env.example` como contrato público.

## Despliegue

El proyecto está preparado para Vercel o cualquier plataforma compatible con Next.js.

Configuración recomendada:

- **Framework**: Next.js.
- **Build command**: `npm run build`.
- **Install command**: `npm install`.
- **Output**: gestionado por Next.js, no usar `dist/`.
- **Variables de entorno**: configurar las mismas de `.env.example`.

Después del despliegue, revisa:

- Metadata y favicon.
- Sitemap y robots.
- Login con Google.
- Conexión a PostgreSQL.
- Formularios y newsletter.
- Navegación responsive.

## Licencia

Distribuido bajo licencia MIT. Revisa el archivo `LICENSE` para más detalles.

## Créditos

Desarrollado por **Ezer B. Zuniga Chura** para promover el turismo, la cultura y la identidad de La Convención.
