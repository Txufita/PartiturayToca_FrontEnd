# Partitura y Toca — Frontend

Cliente web para la plataforma *Partitura y Toca. Construido con **React + Vite, consume una API REST (Node/Express + MySQL) y ofrece una zona pública y un **panel de administración*.
---

## 🚀 Stack técnico

* *Framework:* React
* *Bundler/Dev server:* Vite
* *Routing:* React Router
* *Estado:* Hooks y contextos (AuthContext)
* *Estilos:* CSS (p. ej. components/Footer.css, estilos por componente)
* *Autenticación:* JWT almacenado en localStorage (auth_token) + usuario (auth_user)
* *Llamadas HTTP:* helpers en /API/* (p. ej. API/scores, API/instruments, API/composers)

## 📦 Requisitos

* Node.js 18+ y npm (o pnpm/yarn)

## 🛠 Puesta en marcha

bash
# 1) Instalar dependencias
npm install

# 2) Ajustar variables de entorno

# 3) Arrancar entorno dev
npm run dev



### Variables de entorno

env
# URL base de la API backend
VITE_API_URL="http://localhost:4000/api"


## 🗂 Estructura (orientativa)


src/
  API/
    auth.js          # login/register (POST /auth/login, POST /auth/register)
    scores.js        # CRUD de partituras (GET/POST/PUT/DELETE /scores)
    instruments.js   # CRUD instrumentos
    composers.js     # CRUD compositores
    users.js         # GET users
    upload.js        # POST archivos
    client.js        # Api
    commets.js       # CRUD comments
  components/
    ScoreCard.jsx
    ScoreList.jsx
    Footer.jsx
    Footer.css
  Context/
    authContext.jsx  # AuthContext + persistencia en localStorage
  Pages/
    Home.jsx
    About.jsx
    Login.jsx
    Register.jsx
    Admin/
      Home.jsx        # Hub admin (/admin/home)
      Scores.jsx      # Gestión de partituras
      Instruments.jsx # Gestión de instrumentos
      Composers.jsx   # Gestión de compositores
  App.jsx            # Router principal
  main.jsx
index.html


## 🔐 Autenticación y roles

* *Login/Register:* a través de API/auth.
* Tras login exitoso se guardan en localStorage:

  * auth_token (JWT)
  * auth_user (objeto usuario serializado)
* *AuthContext* expone: user, token, loading, login, register, logout y persist.
* *Protección de rutas:*

  * Si no hay sesión → se redirige a /login.
  * Si el usuario es *admin* (p. ej. user.role === 'ADMIN') se puede acceder a /admin/*. Tras login de admin se redirige a /admin/home.

> Nota: Asegúrate de que los *fetch* incluyen el header Authorization: Bearer <token> cuando sea necesario.

## 🧭 Routing

* / — Home pública
* /about — Información
* /login — Acceso
* /register — Registro
* /admin/home — Dashboard con accesos a *Scores, **Instruments, **Composers*
* /admin/scores — CRUD partituras (listado en tabla + crear/editar/eliminar)
* /admin/instruments — CRUD /gestión de instrumentos
* /admin/composers — CRUD /gestión de compositores

## 🔗 Endpoints (consumidos por el frontend)

> Los paths son orientativos; ajusta a tu backend real.

* *Auth*

  * POST /auth/login – body: { email, password } → { token, user }
  * POST /auth/register – body: { name, email, password } → { token, user }
* *Scores*

  * GET /scores → lista de partituras
  * POST /scores (admin) → crear
  * PUT /scores/:id (admin) → actualizar
  * DELETE /scores/:id (admin) → eliminar
* *Instruments*

  * GET /instruments → lista de instrumentos
  * POST /instruments (admin) → crear
  * PUT /instruments/:id (admin) → actualizar
  * DELETE /instruments/:id (admin) → eliminar
* *Composers*
  * GET /composers → lista de compsitores
  * POST /composers (admin) → crear
  * PUT /composers/:id (admin) → actualizar
  * DELETE /composers/:id (admin) → eliminar

> Último cambio en backend: preferencia por devolver *nombres* además de *IDs* de instrumento y compositor (para pintar directamente en el frontend).

## 🧩 Componentes clave

* ScoreList.jsx
  * Carga paralela de: partituras, instrumentos, compositores.
  * Filtros: query, instrumentId, composerId.
  * Muestra tarjetas ScoreCard.

* ScoreCard.jsx
  * Presenta datos base de la partitura (título, compositor, instrumento, etc.).

* Footer.jsx + Footer.css

  * Pie de página común.

## 🧱 Patrón de estado

* *Estados locales* con useState y side effects con useEffect.
* *Memoización* con useMemo cuando procede.
* *Contexto de auth* para sesión global.

## 🧪 Errores y carga

* Estados: loading, loadingFilters, error en listados.
* Mostrar mensajes de error de red y deshabilitar botones en loading.

## 🧭 Navegación y UI

* *Header/Nav* global (visible en todas las rutas de usuario).
* *Admin Home*: cabecera con enlaces a /scores, /instruments, /composers.

## 🧰 Scripts útiles

Asegúrate de tener en package.json:

json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}


## 🧹 Estilo y convenciones

* Componentes en *PascalCase* (ScoreList.jsx).
* Hooks/funciones en *PascalCase*.
* Archivos de estilo por componente cuando aplique.
* Mensajes de commit descriptivos (p. ej., feat(scores): add filters / fix(auth): persist token correctly).

## 🔒 Seguridad

* Nunca comitees .env*.
* Sanitiza entradas de formularios.
* Maneja expiración de token (401 → logout() y redirección a /login).

## 🧭 Roadmap (sugerido)

* [ ] Loading skeletons y toasts de éxito/error.
* [ ] Paginación/ordenación en /admin/scores.
* [ ] Mejorar guardas de ruta por rol.
* [ ] Tests básicos de componentes (Vitest/RTL).
* [ ] Migrar estilos a Tailwind o CSS Modules si se desea.

## 📄 Licencia

