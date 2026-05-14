# Plataforma de Gestión de Servicios de Seguridad Privada

Sistema web para la administración integral de una agencia de seguridad privada. Permite gestionar clientes, servicios, personal, turnos e incidentes con control de acceso basado en roles.

**Demo en vivo:** [privatedsecurity.vercel.app](https://privatedsecurity.vercel.app)

---

## Descripción

Prototipo funcional desarrollado como proyecto académico para el curso de **Administración de Proyectos . La plataforma centraliza la operación de una agencia de seguridad privada en un solo sistema web accesible desde cualquier dispositivo con internet, sin necesidad de instalación.

---

##  Módulos del sistema

| Módulo | Descripción |
|---|---|
|  **Login** | Autenticación con tres tipos de usuario |
| **Dashboard** | Estadísticas generales e indicadores clave |
| **Clientes** | Gestión de empresas contratantes |
| **Servicios** | Catálogo de servicios activos por cliente |
| **Personal** | Equipo operativo, disponibilidad y zonas |
| **Turnos** | Calendario y asignación de turnos |
| **Incidentes** | Registro y seguimiento de incidentes |
| **Reportes** | Gráficas y estadísticas filtradas por rol |


---

## Stack tecnológico

- **React** — Biblioteca UI con hooks y estado local
- **Tailwind CSS** — Utilidades CSS para diseño responsivo
- **Vite** — Bundler ultrarrápido para desarrollo
- **Recharts** — Gráficas de barras y pastel para reportes
- **Lucide React** — Íconos SVG consistentes
- **Vercel** — Despliegue continuo automático desde GitHub

---

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/chelmonque/privatedsecurity.git
cd privatedsecurity

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para despliegue estático.


---

##  Notas del proyecto

- No requiere backend ni base de datos — todos los datos son locales al frontend
- El control de acceso por roles está implementado con guards de renderizado condicional
- El despliegue en Vercel es automático con cada `git push` a la rama `main`

---

