import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Building2, Briefcase, Users, Calendar,
  AlertTriangle, BarChart2, Eye, LogOut, Search, Shield, User, X, Clock,
  Camera, Bell, ClipboardList, FileText, CheckCircle, UserCheck, UserX,
  CalendarDays, MapPin, ChevronRight, Save, TrendingUp, TrendingDown, PlusCircle,
  Mail, Lock, Phone
} from "lucide-react";

// ─── DATOS QUEMADOS ───────────────────────────────────────────────────────────

const USERS = [
  { email: "admin@seguridad.com",       password: "1234", role: "Administrador", nombre: "Admin",    apellido: "Sistema"   },
  { email: "supervisor@seguridad.com",  password: "1234", role: "Supervisor",    nombre: "Jorge",    apellido: "Mora"      },
  // Usuarios cliente — uno por empresa
  { email: "norte@seguridad.com",    password: "1234", role: "Cliente", empresa: "Corporación Norte S.A.",       nombre: "Juan",    apellido: "Pérez"    },
  { email: "fortuna@seguridad.com",  password: "1234", role: "Cliente", empresa: "Centro Comercial La Fortuna",  nombre: "Roberto", apellido: "Jiménez"  },
  { email: "bodega@seguridad.com",   password: "1234", role: "Cliente", empresa: "Bodega Industrial San Carlos", nombre: "María",   apellido: "González" },
  { email: "clinica@seguridad.com",  password: "1234", role: "Cliente", empresa: "Clínica Santa Elena",         nombre: "Carlos",  apellido: "Mora"     },
];

const INITIAL_CLIENTES = [
  { id: 1, empresa: "Corporación Norte S.A.",       ubicacion: "San José, Centro",       direccion: "Avenida Central, Edificio Norte, Piso 5",  nombre: "Juan",    apellido: "Pérez",    cargo: "Gerente de Operaciones", telefono: "2222-3333", correo: "juan.perez@corporacionnorte.com", servicios: "Vigilancia Física, Monitoreo de Cámaras",    estado: "Activo" },
  { id: 2, empresa: "Bodega Industrial San Carlos",  ubicacion: "San Carlos, Alajuela",   direccion: "Zona Industrial, Bodega 14-B",             nombre: "María",   apellido: "González", cargo: "Administradora",         telefono: "2401-5566", correo: "maria@bodegasancarlos.com",        servicios: "Vigilancia Nocturna",                        estado: "Activo" },
  { id: 3, empresa: "Centro Comercial La Fortuna",   ubicacion: "La Fortuna, San Carlos", direccion: "Calle Principal, frente al parque",        nombre: "Roberto", apellido: "Jiménez",  cargo: "Director de Seguridad",  telefono: "2479-8899", correo: "rjimenez@ccfortuna.com",           servicios: "Monitoreo de Cámaras, Atención de Eventos", estado: "Activo" },
  { id: 4, empresa: "Condominio Los Robles",         ubicacion: "Escazú, San José",       direccion: "Residencial Los Robles, Portón Principal", nombre: "Ana",     apellido: "Vargas",   cargo: "Administradora",         telefono: "2228-4455", correo: "avargas@losrobles.com",            servicios: "Vigilancia 24/7",                            estado: "Activo" },
  { id: 5, empresa: "Clínica Santa Elena",           ubicacion: "Cartago Centro",         direccion: "Av. 8, diagonal a Correos",                nombre: "Carlos",  apellido: "Mora",     cargo: "Director Médico",        telefono: "2551-7788", correo: "cmora@clinicasantaelena.com",      servicios: "Vigilancia Física, Monitoreo de Alarmas",   estado: "Activo" },
];

const SERVICIOS = [
  { id: 1, nombre: "Vigilancia Física",    cliente: "Corporación Norte S.A.",      horario: "Lunes a Viernes, 8:00–17:00",        modalidad: "Presencial", responsable: "Laura Rojas",    tipo: "vigilancia", estado: "Activo" },
  { id: 2, nombre: "Monitoreo de Cámaras", cliente: "Centro Comercial La Fortuna", horario: "24/7",                               modalidad: "Remoto",    responsable: "Mariana Solís",  tipo: "camaras",   estado: "Activo" },
  { id: 3, nombre: "Vigilancia Nocturna",  cliente: "Bodega Industrial San Carlos",horario: "Lunes a Domingo, 18:00–06:00",       modalidad: "Presencial", responsable: "Andrés Vargas",  tipo: "vigilancia", estado: "Activo" },
  { id: 4, nombre: "Monitoreo de Alarmas", cliente: "Clínica Santa Elena",         horario: "24/7",                               modalidad: "Remoto",    responsable: "Mariana Solís",  tipo: "alarmas",   estado: "Activo" },
  { id: 5, nombre: "Vigilancia 24/7",      cliente: "Condominio Los Robles",       horario: "Todos los días, 24 horas",           modalidad: "Presencial", responsable: "Carlos Méndez",  tipo: "vigilancia", estado: "Activo" },
  { id: 6, nombre: "Atención de Eventos",  cliente: "Centro Comercial La Fortuna", horario: "Según evento",                       modalidad: "Presencial", responsable: "Laura Rojas",    tipo: "eventos",   estado: "Activo" },
];

const INITIAL_PERSONAL = [
  { id: 1, nombre: "Carlos Méndez",   rol: "Guarda de Seguridad",    telefono: "8888-1111", disponibilidad: "Disponible",    zona: "San José Centro" },
  { id: 2, nombre: "Laura Rojas",     rol: "Supervisora",             telefono: "8888-2222", disponibilidad: "En turno",      zona: "Escazú"          },
  { id: 3, nombre: "Andrés Vargas",   rol: "Guarda Nocturno",         telefono: "8888-3333", disponibilidad: "Disponible",    zona: "San Carlos"      },
  { id: 4, nombre: "Mariana Solís",   rol: "Operadora de Monitoreo",  telefono: "8888-4444", disponibilidad: "En turno",      zona: "Central"         },
  { id: 5, nombre: "Roberto Castro",  rol: "Guarda de Seguridad",     telefono: "8888-5555", disponibilidad: "Disponible",    zona: "Cartago"         },
  { id: 6, nombre: "Patricia Vega",   rol: "Guarda de Seguridad",     telefono: "8888-6666", disponibilidad: "No disponible", zona: "Heredia"         },
  { id: 7, nombre: "Jorge Mora",      rol: "Supervisor",              telefono: "8888-7777", disponibilidad: "Disponible",    zona: "Alajuela"        },
  { id: 8, nombre: "Sandra Jiménez",  rol: "Operadora de Monitoreo",  telefono: "8888-8888", disponibilidad: "En turno",      zona: "Central"         },
];

const INITIAL_TURNOS = [
  { id: 1, fecha: "2026-05-06", inicio: "08:00", fin: "16:00", cliente: "Corporación Norte S.A.",      servicio: "Vigilancia Física",    personal: "Carlos Méndez",  estado: "Programado" },
  { id: 2, fecha: "2026-05-06", inicio: "14:00", fin: "22:00", cliente: "Centro Comercial La Fortuna", servicio: "Monitoreo de Cámaras", personal: "Mariana Solís",  estado: "En curso"   },
  { id: 3, fecha: "2026-05-06", inicio: "22:00", fin: "06:00", cliente: "Bodega Industrial San Carlos",servicio: "Vigilancia Nocturna",  personal: "Andrés Vargas",  estado: "Programado" },
  { id: 4, fecha: "2026-05-07", inicio: "06:00", fin: "14:00", cliente: "Clínica Santa Elena",         servicio: "Vigilancia Física",    personal: "Laura Rojas",    estado: "Programado" },
  { id: 5, fecha: "2026-05-04", inicio: "08:00", fin: "16:00", cliente: "Condominio Los Robles",       servicio: "Vigilancia 24/7",      personal: "Roberto Castro", estado: "Completado" },
  { id: 6, fecha: "2026-05-05", inicio: "08:00", fin: "16:00", cliente: "Corporación Norte S.A.",      servicio: "Vigilancia Física",    personal: "Carlos Méndez",  estado: "Completado" },
  { id: 7, fecha: "2026-05-05", inicio: "14:00", fin: "22:00", cliente: "Centro Comercial La Fortuna", servicio: "Monitoreo de Cámaras", personal: "Mariana Solís",  estado: "Completado" },
  { id: 8, fecha: "2026-05-05", inicio: "22:00", fin: "06:00", cliente: "Bodega Industrial San Carlos",servicio: "Vigilancia Nocturna",  personal: "Andrés Vargas",  estado: "Completado" },
];

const INITIAL_INCIDENTES = [
  { id: 1, tipo: "Intrusión detectada", cliente: "Bodega Industrial San Carlos", fecha: "2026-05-05", hora: "23:45", desc: "Alarma perimetral activada en sector norte",    responsable: "Andrés Vargas",  estado: "Resuelto"    },
  { id: 2, tipo: "Alarma activada",     cliente: "Corporación Norte S.A.",       fecha: "2026-05-05", hora: "14:30", desc: "Alarma de incendio activada en piso 3",         responsable: "Laura Rojas",    estado: "En atención" },
  { id: 3, tipo: "Incidente menor",     cliente: "Condominio Los Robles",        fecha: "2026-05-04", hora: "08:15", desc: "Vehículo sospechoso reportado por residente",   responsable: "Carlos Méndez",  estado: "Resuelto"    },
  { id: 4, tipo: "Falla técnica",       cliente: "Centro Comercial La Fortuna",  fecha: "2026-05-04", hora: "16:00", desc: "Cámara sector 5 fuera de servicio",             responsable: "Mariana Solís",  estado: "Cerrado"     },
];

const TURNOS_CHART = [
  { mes: "Ene", Completados: 145, Pendientes: 12 },
  { mes: "Feb", Completados: 155, Pendientes: 10 },
  { mes: "Mar", Completados: 175, Pendientes: 8  },
  { mes: "Abr", Completados: 180, Pendientes: 6  },
  { mes: "May", Completados: 158, Pendientes: 5  },
];

const INCIDENTES_PIE = [
  { name: "Alarmas",         value: 12, color: "#f97316" },
  { name: "Intrusión",       value: 8,  color: "#ef4444" },
  { name: "Fallas Técnicas", value: 5,  color: "#3b82f6" },
  { name: "Otros",           value: 3,  color: "#6b7280" },
];

// ─── HELPERS / BADGES ─────────────────────────────────────────────────────────

const Badge = ({ children, color }) => {
  const colors = {
    green:  "bg-green-100 text-green-700",
    blue:   "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    red:    "bg-red-100 text-red-700",
    gray:   "bg-gray-100 text-gray-600",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

const estadoBadge = (e) => {
  if (e === "Activo")       return <Badge color="green">{e}</Badge>;
  if (e === "Resuelto")     return <Badge color="green">{e}</Badge>;
  if (e === "Programado")   return <Badge color="blue">{e}</Badge>;
  if (e === "En curso")     return <Badge color="green">{e}</Badge>;
  if (e === "En atención")  return <Badge color="orange">{e}</Badge>;
  if (e === "Completado")   return <Badge color="gray">{e}</Badge>;
  if (e === "Cerrado")      return <Badge color="gray">{e}</Badge>;
  if (e === "No disponible")return <Badge color="red">{e}</Badge>;
  if (e === "Disponible")   return <Badge color="green">{e}</Badge>;
  if (e === "En turno")     return <Badge color="blue">{e}</Badge>;
  return <Badge color="gray">{e}</Badge>;
};

const SVC_ICON = { vigilancia: Shield, camaras: Camera, alarmas: Bell, eventos: Users };
const INC_BORDER = { "Resuelto": "border-red-400", "En atención": "border-orange-400", "Cerrado": "border-gray-300", "Registrado": "border-blue-400" };

// ─── STAT CARD ────────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, iconBg = "bg-gray-100", iconColor = "text-gray-500", num, label, numColor = "text-[#1a2744]", trend, trendUp }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      {Icon && <Icon size={20} className={iconColor} />}
    </div>
    <div>
      <div className={`text-3xl font-bold ${numColor}`}>{num}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {trend && (
        <div className={`text-xs mt-1 font-medium flex items-center gap-0.5 ${trendUp ? "text-green-600" : "text-red-500"}`}>
          {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {trend}
        </div>
      )}
    </div>
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────

const Modal = ({ title, subtitle, children, onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl p-7 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold text-[#1a2744]">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mb-5">{subtitle}</p>}
      {children}
    </div>
  </div>
);

const FormRow = ({ children }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const Field = ({ label, children, full }) => (
  <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    {children}
  </div>
);

const inputCls = "border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white";
const selectCls = inputCls;

const SectionLabel = ({ children }) => (
  <div className="text-sm font-bold text-[#1a2744] border-b border-gray-200 pb-1.5 mt-4 mb-3">{children}</div>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

// ─── PERMISOS POR ROL ─────────────────────────────────────────────────────────
const ROL_PAGES = {
  Administrador: ["dashboard","clientes","servicios","personal","turnos","incidentes","reportes"],
  Supervisor:    ["dashboard","clientes","turnos","incidentes"],
  Cliente:       ["vista-cliente","reportes"],
};

const ROL_HOME = {
  Administrador: "dashboard",
  Supervisor:    "dashboard",
  Cliente:       "vista-cliente",
};

const NAV = [
  { id: "dashboard",     Icon: LayoutDashboard, label: "Dashboard"     },
  { id: "clientes",      Icon: Building2,       label: "Clientes"      },
  { id: "servicios",     Icon: Briefcase,       label: "Servicios"     },
  { id: "personal",      Icon: Users,           label: "Personal"      },
  { id: "turnos",        Icon: Calendar,        label: "Turnos"        },
  { id: "incidentes",    Icon: AlertTriangle,   label: "Incidentes"    },
  { id: "reportes",      Icon: BarChart2,       label: "Reportes"      },
  { id: "vista-cliente", Icon: Eye,             label: "Resumen"       },
];

const Sidebar = ({ page, onNavigate, onLogout, role }) => {
  const allowed = ROL_PAGES[role] || [];
  const visibleNav = NAV.filter((n) => allowed.includes(n.id));
  return (
    <aside className="w-52 min-h-screen bg-[#1a2744] flex flex-col fixed top-0 left-0 bottom-0 z-10">
      <div className="px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
          <Shield size={18} className="text-white" />
        </div>
        <div className="text-sm font-bold text-white leading-tight">Seguridad Privada</div>
        <div className="text-xs text-white/40 mt-0.5">Sistema de Gestión</div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {visibleNav.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm transition-all mb-0.5
              ${page === id
                ? "text-white bg-blue-600/25 border-l-2 border-blue-400"
                : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"}`}
          >
            <Icon size={16} className="flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center gap-2.5 w-full text-sm text-white/55 hover:text-white py-2"
        >
          <LogOut size={16} /><span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

// ─── PAGE TITLES ──────────────────────────────────────────────────────────────

const PAGE_META = {
  dashboard:      ["Dashboard",             "Resumen general del sistema"],
  clientes:       ["Gestión de Clientes",   "Empresas contratantes de servicios de seguridad"],
  servicios:      ["Gestión de Servicios",  "Servicios de seguridad contratados por los clientes"],
  personal:       ["Gestión de Personal",   "Personal de seguridad disponible"],
  turnos:         ["Asignación de Turnos",  "Gestión de turnos del personal de seguridad"],
  incidentes:     ["Registro de Incidentes","Seguimiento de incidentes de seguridad"],
  reportes:       ["Reportes y Estadísticas","Análisis de desempeño del sistema"],
  "vista-cliente":["Resumen de mi Empresa",  "Servicios, turnos e incidentes asociados a su empresa"],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── LOGIN ────────────────────────────────────────────────────────────────────

const LoginPage = ({ onLogin }) => {
  const [email, setEmail]   = useState("");
  const [pass,  setPass]    = useState("");
  const [error, setError]   = useState("");

  const handleLogin = () => {
    const user = USERS.find((u) => u.email === email && u.password === pass);
    if (!user) { setError("Credenciales incorrectas. Intente de nuevo."); return; }
    setError("");
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f4b] p-5"
         style={{ background: "radial-gradient(ellipse at 60% 40%, #1a3a8f 0%, #0d1b4b 60%, #091232 100%)" }}>
      <div className="bg-white rounded-2xl px-10 pt-10 pb-8 w-full max-w-sm shadow-2xl">

        {/* Ícono escudo */}
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield size={28} className="text-white" />
        </div>

        {/* Título — sin subtítulo aquí */}
        <h1 className="text-center text-xl font-bold text-[#1a2744] leading-snug mb-6">
          Plataforma de Gestión de Servicios de Seguridad Privada
        </h1>

        {/* Campo correo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Correo electrónico</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"><Mail size={16} /></span>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              className="w-full border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Campo contraseña */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Contraseña</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"><Lock size={16} /></span>
            <input
              type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs text-center mb-3">{error}</p>}

        {/* Botón */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#1a3a8f] hover:bg-[#15307a] text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-5"
        >
          Ingresar
        </button>

        {/* Subtítulo abajo */}
        <p className="text-center text-xs text-gray-400">Sistema de gestión empresarial</p>
      </div>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

const Dashboard = ({ clientes, turnos, incidentes }) => {
  const pendientes = incidentes.filter((i) => i.estado === "En atención");
  const proxTurnos = turnos.filter((t) => t.estado !== "Completado").slice(0, 4);
  const incRec     = incidentes.slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Building2}     iconBg="bg-blue-50"   iconColor="text-blue-600"   num={clientes.length}  label="Empresas Clientes"   />
        <StatCard icon={Briefcase}     iconBg="bg-green-50"  iconColor="text-green-600"  num={SERVICIOS.length} label="Servicios Activos"  numColor="text-green-600" />
        <StatCard icon={CalendarDays}  iconBg="bg-teal-50"   iconColor="text-teal-500"   num={turnos.length}     label="Turnos Programados" numColor="text-blue-600"  />
        <StatCard icon={AlertTriangle} iconBg="bg-red-50"    iconColor="text-red-500"    num={pendientes.length} label="Incidentes Pendientes" numColor="text-red-500" />
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-5">
        {/* Próximos Turnos */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Próximos Turnos</div>
          {proxTurnos.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1a2744] truncate">{t.cliente}</div>
                <div className="text-xs text-gray-400">{t.servicio} · {t.fecha} {t.inicio} · {t.personal}</div>
              </div>
              {estadoBadge(t.estado)}
            </div>
          ))}
        </div>

        {/* Incidentes Recientes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Incidentes Recientes</div>
          {incRec.map((i) => (
            <div key={i.id} className="flex items-start gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                ${i.estado === "Resuelto" ? "bg-green-50" : i.estado === "En atención" ? "bg-orange-50" : "bg-gray-50"}`}>
                <AlertTriangle size={16} className={i.estado === "En atención" ? "text-orange-500" : i.estado === "Resuelto" ? "text-green-500" : "text-gray-400"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1a2744]">{i.tipo}</div>
                <div className="text-xs text-gray-400">{i.cliente} · {i.fecha}</div>
              </div>
              {estadoBadge(i.estado)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── CLIENTES ─────────────────────────────────────────────────────────────────

// Form fields for cliente modal — defined OUTSIDE component to avoid re-mount on every render
const ClienteFormFields = ({ form, setF }) => (
  <>
    <SectionLabel>Información de la Empresa</SectionLabel>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Nombre de la Empresa *"><input className={inputCls} value={form.empresa} onChange={setF("empresa")} /></Field>
      <Field label="Ubicación (Ciudad/Provincia) *"><input className={inputCls} value={form.ubicacion} onChange={setF("ubicacion")} /></Field>
    </div>
    <div className="mt-2">
      <Field label="Dirección Completa *"><input className={`${inputCls} w-full`} value={form.direccion} onChange={setF("direccion")} /></Field>
    </div>
    <SectionLabel>Persona de Contacto</SectionLabel>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Nombre *"><input className={inputCls} value={form.nombre} onChange={setF("nombre")} /></Field>
      <Field label="Apellido *"><input className={inputCls} value={form.apellido} onChange={setF("apellido")} /></Field>
      <Field label="Cargo"><input className={inputCls} value={form.cargo} onChange={setF("cargo")} /></Field>
      <Field label="Teléfono *"><input className={inputCls} value={form.telefono} onChange={setF("telefono")} /></Field>
      <Field label="Correo Electrónico *"><input className={inputCls} type="email" value={form.correo} onChange={setF("correo")} /></Field>
    </div>
    <SectionLabel>Información del Contrato</SectionLabel>
    <div className="grid grid-cols-2 gap-3">
      <Field label="Servicios Contratados"><input className={inputCls} placeholder="Ej: Vigilancia Física, Monitoreo" value={form.servicios} onChange={setF("servicios")} /></Field>
      <Field label="Estado del Contrato *">
        <select className={selectCls} value={form.estado} onChange={setF("estado")}>
          <option>Activo</option><option>Inactivo</option><option>Suspendido</option>
        </select>
      </Field>
    </div>
  </>
);

const Clientes = ({ clientes, setClientes, readOnly = false }) => {
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(null); // null | "nuevo" | cliente obj

  const filtered = clientes.filter((c) =>
    [c.empresa, c.ubicacion, c.nombre, c.apellido].filter(Boolean).some((f) =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

  const blankForm = { empresa:"", ubicacion:"", direccion:"", nombre:"", apellido:"", cargo:"", telefono:"", correo:"", servicios:"", estado:"Activo" };
  const [form, setForm] = useState(blankForm);
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openNuevo = () => { setForm(blankForm); setModal("nuevo"); };
  const openDetalle = (c) => { setForm({ ...c }); setModal(c); };

  const guardar = () => {
    if (!form.empresa) return alert("El nombre de la empresa es requerido");
    if (modal === "nuevo") {
      setClientes((prev) => [...prev, { ...form, id: Date.now() }]);
    } else {
      setClientes((prev) => prev.map((c) => (c.id === modal.id ? { ...modal, ...form } : c)));
    }
    setModal(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {!readOnly && (
          <button onClick={openNuevo} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <PlusCircle size={15}/> Agregar Cliente
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search size={15} /></span>
        <input
          className={`${inputCls} w-full pl-9`}
          placeholder="Buscar cliente por nombre, ubicación o contacto..."
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>{["Empresa","Ubicación","Contacto","Teléfono","Servicios","Estado","Acciones"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-[#1a2744]">{c.empresa}</td>
                <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><MapPin size={13} className="text-gray-400"/> {c.ubicacion}</span></td>
                <td className="px-4 py-3 text-sm">{c.nombre} {c.apellido}</td>
                <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><Phone size={13} className="text-gray-400"/> {c.telefono}</span></td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px] truncate">{c.servicios}</td>
                <td className="px-4 py-3">{estadoBadge(c.estado)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openDetalle(c)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                    <Eye size={14} /> Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal === "nuevo" ? "Registrar Nueva Empresa Cliente" : "Detalle de Empresa Cliente"}
          subtitle={modal === "nuevo" ? "Complete la información del nuevo cliente" : "Información detallada del cliente"}
          onClose={() => setModal(null)}
        >
          <ClienteFormFields form={form} setF={setF} />
          <div className="flex gap-3 mt-5">
            <button onClick={guardar} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {modal === "nuevo" ? <><Building2 size={15}/> Registrar Cliente</> : <><Save size={15}/> Guardar Cambios</>}
            </button>
            <button onClick={() => setModal(null)} className="border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── SERVICIOS ────────────────────────────────────────────────────────────────

const DIAS_SEMANA = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const HORAS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2,"0")}:00`);

const HorarioSelector = ({ form, setForm }) => {
  const toggle = (dia) => {
    const dias = form.horarioDias || [];
    setForm((f) => ({ ...f, horarioDias: dias.includes(dia) ? dias.filter((d) => d !== dia) : [...dias, dia] }));
  };
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Computed horario string for storage
  const buildHorario = (dias, ini, fin) => {
    if (!dias || dias.length === 0) return "";
    const dStr = dias.length === 7 ? "Todos los días" : dias.join(", ");
    return ini && fin ? `${dStr}, ${ini}–${fin}` : dStr;
  };

  const dias = form.horarioDias || [];
  const ini  = form.horarioIni  || "";
  const fin  = form.horarioFin  || "";

  const onToggle = (dia) => {
    const newDias = dias.includes(dia) ? dias.filter((d) => d !== dia) : [...dias, dia];
    setForm((f) => ({ ...f, horarioDias: newDias, horario: buildHorario(newDias, ini, fin) }));
  };
  const onIni = (e) => setForm((f) => ({ ...f, horarioIni: e.target.value, horario: buildHorario(dias, e.target.value, fin) }));
  const onFin = (e) => setForm((f) => ({ ...f, horarioFin: e.target.value, horario: buildHorario(dias, ini, e.target.value) }));

  return (
    <div className="col-span-2">
      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Días de atención *</label>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {DIAS_SEMANA.map((d) => (
          <button key={d} type="button"
            onClick={() => onToggle(d)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors
              ${dias.includes(d) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:border-blue-400"}`}>
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Hora de inicio">
          <select className={selectCls} value={ini} onChange={onIni}>
            <option value="">--:--</option>
            {HORAS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </Field>
        <Field label="Hora de fin">
          <select className={selectCls} value={fin} onChange={onFin}>
            <option value="">--:--</option>
            {HORAS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </Field>
      </div>
      {form.horario && (
        <p className="text-xs text-blue-600 mt-2 font-medium flex items-center gap-1">
          <Clock size={11}/> {form.horario}
        </p>
      )}
    </div>
  );
};

const Servicios = ({ clientes, personal, servicios: lista, setServicios: setLista }) => {
  const blank = { nombre: "", cliente: clientes[0]?.empresa || "", horario: "", horarioDias: [], horarioIni: "", horarioFin: "", modalidad: "Presencial", responsable: "", tipo: "vigilancia", estado: "Activo" };
  const [modal,   setModal]   = useState(null); // null | "nuevo" | "editar"
  const [form,    setForm]    = useState(blank);
  const [editId,  setEditId]  = useState(null);
  const [confirm, setConfirm] = useState(null); // id a eliminar
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openNuevo = () => { setForm(blank); setModal("nuevo"); };
  const openEditar = (s) => {
    // Parse existing horario back into fields if possible
    setForm({ ...s, horarioDias: s.horarioDias || [], horarioIni: s.horarioIni || "", horarioFin: s.horarioFin || "" });
    setEditId(s.id);
    setModal("editar");
  };

  const guardar = () => {
    if (!form.nombre || !form.cliente) return alert("Nombre y cliente son requeridos");
    if (modal === "nuevo") {
      setLista((prev) => [...prev, { ...form, id: Date.now() }]);
    } else {
      setLista((prev) => prev.map((s) => s.id === editId ? { ...form, id: editId } : s));
    }
    setModal(null);
  };

  const eliminar = (id) => {
    setLista((prev) => prev.filter((s) => s.id !== id));
    setConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={openNuevo} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <PlusCircle size={15}/> Registrar Servicio
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Shield}    iconBg="bg-blue-50"   iconColor="text-blue-600"   num={lista.filter(s=>s.tipo==="vigilancia").length} label="Vigilancia Física"  />
        <StatCard icon={Camera}    iconBg="bg-purple-50" iconColor="text-purple-600" num={lista.filter(s=>s.tipo==="camaras").length}    label="Monitoreo Cámaras"  />
        <StatCard icon={Bell}      iconBg="bg-orange-50" iconColor="text-orange-500" num={lista.filter(s=>s.tipo==="alarmas").length}    label="Monitoreo Alarmas"  />
        <StatCard icon={Briefcase} iconBg="bg-green-50"  iconColor="text-green-600"  num={lista.length} label="Total Servicios" numColor="text-green-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {lista.map((s) => (
          <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">{(() => { const I = SVC_ICON[s.tipo] || Briefcase; return <I size={18} className="text-blue-600" />; })()}</div>
                <div>
                  <div className="text-sm font-bold text-[#1a2744]">{s.nombre}</div>
                  <div className="text-xs text-gray-400">{s.cliente}</div>
                </div>
              </div>
              {estadoBadge(s.estado)}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5"><Clock size={12} className="text-gray-400" /> {s.horario || "Sin horario"}</div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Modalidad: <strong className="text-gray-700">{s.modalidad}</strong></span>
              <span className="text-xs text-gray-500">Responsable: <strong className="text-gray-700">{s.responsable || "—"}</strong></span>
            </div>
            {/* Acciones */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => openEditar(s)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                <FileText size={13}/> Editar
              </button>
              <button onClick={() => setConfirm(s.id)}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
                <X size={13}/> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal nuevo / editar */}
      {modal && (
        <Modal
          title={modal === "nuevo" ? "Registrar Servicio Contratado" : "Editar Servicio"}
          subtitle={modal === "nuevo" ? "Complete la información del nuevo servicio" : "Modifique los datos del servicio"}
          onClose={() => setModal(null)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre del Servicio *"><input className={inputCls} value={form.nombre} onChange={setF("nombre")} placeholder="Ej: Vigilancia Física" /></Field>
            <Field label="Empresa Cliente *">
              <select className={selectCls} value={form.cliente} onChange={setF("cliente")}>
                {clientes.map((c) => <option key={c.id}>{c.empresa}</option>)}
              </select>
            </Field>
            <Field label="Tipo de Servicio">
              <select className={selectCls} value={form.tipo} onChange={setF("tipo")}>
                <option value="vigilancia">Vigilancia</option>
                <option value="camaras">Monitoreo de Cámaras</option>
                <option value="alarmas">Monitoreo de Alarmas</option>
                <option value="eventos">Atención de Eventos</option>
              </select>
            </Field>
            <Field label="Modalidad">
              <select className={selectCls} value={form.modalidad} onChange={setF("modalidad")}>
                <option>Presencial</option><option>Remoto</option>
              </select>
            </Field>
            <Field label="Responsable">
              <select className={selectCls} value={form.responsable} onChange={setF("responsable")}>
                <option value="">— Seleccionar —</option>
                {personal.map((p) => <option key={p.id} value={p.nombre}>{p.nombre} · {p.rol}</option>)}
              </select>
            </Field>
            <Field label="Estado">
              <select className={selectCls} value={form.estado} onChange={setF("estado")}>
                <option>Activo</option><option>Inactivo</option>
              </select>
            </Field>
            <HorarioSelector form={form} setForm={setForm} />
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={guardar} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {modal === "nuevo" ? <><Briefcase size={15}/> Registrar Servicio</> : <><Save size={15}/> Guardar Cambios</>}
            </button>
            <button onClick={() => setModal(null)} className="border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
          </div>
        </Modal>
      )}

      {/* Confirm eliminar */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setConfirm(null)}>
          <div className="bg-white rounded-2xl p-7 w-full max-w-xs shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={22} className="text-red-500"/>
            </div>
            <h3 className="text-base font-bold text-[#1a2744] mb-1">¿Eliminar servicio?</h3>
            <p className="text-sm text-gray-400 mb-5">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => eliminar(confirm)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Eliminar</button>
              <button onClick={() => setConfirm(null)} className="border border-gray-200 text-gray-500 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PERSONAL ─────────────────────────────────────────────────────────────────

const Personal = ({ personal, setPersonal }) => {
  const [modal, setModal] = useState(false);
  const blank = { nombre:"", apellido:"", rol:"Guarda de Seguridad", telefono:"", zona:"", disponibilidad:"Disponible" };
  const [form, setForm] = useState(blank);
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const guardar = () => {
    if (!form.nombre || !form.apellido) return alert("El nombre y apellido son requeridos");
    setPersonal((prev) => [...prev, { ...form, id: Date.now(), nombre: `${form.nombre} ${form.apellido}` }]);
    setModal(false);
  };

  const avail   = personal.filter((p) => p.disponibilidad === "Disponible").length;
  const onDuty  = personal.filter((p) => p.disponibilidad === "En turno").length;
  const noAvail = personal.filter((p) => p.disponibilidad === "No disponible").length;

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={() => { setForm(blank); setModal(true); }} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <PlusCircle size={15}/> Agregar Personal
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users}         iconBg="bg-blue-50"   iconColor="text-blue-600"   num={personal.length} label="Total Personal"   />
        <StatCard icon={UserCheck}     iconBg="bg-green-50"  iconColor="text-green-600"  num={avail}   label="Disponibles"  numColor="text-green-600" />
        <StatCard icon={Clock}         iconBg="bg-teal-50"   iconColor="text-teal-500"   num={onDuty}  label="En Turno"     numColor="text-blue-600"  />
        <StatCard icon={UserX}         iconBg="bg-red-50"    iconColor="text-red-500"    num={noAvail} label="No Disponibles" numColor="text-red-500" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>{["Nombre","Rol","Teléfono","Disponibilidad","Zona Asignada","Estado"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {personal.map((p) => (
              <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#1a2744] rounded-full flex items-center justify-center text-white text-sm font-bold">{p.nombre[0]}</div>
                    <span className="text-sm font-semibold text-[#1a2744]">{p.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.rol}</td>
                <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><Phone size={13} className="text-gray-400"/> {p.telefono}</span></td>
                <td className="px-4 py-3">{estadoBadge(p.disponibilidad)}</td>
                <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><MapPin size={13} className="text-gray-400"/> {p.zona}</span></td>
                <td className="px-4 py-3">{p.disponibilidad === "No disponible" ? <X size={16} className="text-red-400"/> : <CheckCircle size={16} className="text-green-500"/>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title="Registrar Nuevo Personal" subtitle="Ingrese los datos del personal de seguridad" onClose={() => setModal(false)}>
          <FormRow>
            <Field label="Nombre *"><input className={inputCls} value={form.nombre} onChange={setF("nombre")} /></Field>
            <Field label="Apellido *"><input className={inputCls} value={form.apellido} onChange={setF("apellido")} /></Field>
            <Field label="Rol *">
              <select className={selectCls} value={form.rol} onChange={setF("rol")}>
                {["Guarda de Seguridad","Guarda Nocturno","Supervisora","Supervisor","Operadora de Monitoreo"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Teléfono *"><input className={inputCls} value={form.telefono} onChange={setF("telefono")} /></Field>
            <Field label="Zona Asignada *"><input className={inputCls} value={form.zona} onChange={setF("zona")} /></Field>
            <Field label="Disponibilidad">
              <select className={selectCls} value={form.disponibilidad} onChange={setF("disponibilidad")}>
                <option>Disponible</option><option>En turno</option><option>No disponible</option>
              </select>
            </Field>
          </FormRow>
          <div className="flex gap-3 mt-5">
            <button onClick={guardar} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"><User size={15}/> Registrar Personal</button>
            <button onClick={() => setModal(false)} className="border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── TURNOS ───────────────────────────────────────────────────────────────────

const Turnos = ({ turnos, setTurnos, clientes, personal }) => {
  const [modal, setModal] = useState(false);
  const blank = { cliente: clientes[0]?.empresa || "", servicio: SERVICIOS[0]?.nombre || "", personal: personal[0]?.nombre || "", fecha: "2026-05-06", inicio: "08:00", fin: "16:00" };
  const [form, setForm] = useState(blank);
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const guardar = () => {
    setTurnos((prev) => [...prev, { ...form, id: Date.now(), estado: "Programado" }]);
    setModal(false);
  };

  // Calendar — May 2026 starts on Friday (index 4, Mon=0)
  const turnosByDay = {};
  turnos.forEach((t) => { const d = parseInt(t.fecha.split("-")[2]); turnosByDay[d] = (turnosByDay[d] || 0) + 1; });
  const dayNames = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
  const offset = 4; // May 1 2026 = Thursday (index 3 in Mon-based)

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={() => { setForm(blank); setModal(true); }} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <PlusCircle size={15}/> Asignar Turno
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4 text-base font-bold text-[#1a2744]"><CalendarDays size={18} className="text-blue-600"/> Mayo 2026</div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((d) => <div key={d} className="text-center text-xs font-semibold text-gray-400 uppercase py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(offset).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
            const count  = turnosByDay[d] || 0;
            const isToday = d === 6;
            return (
              <div key={d} className={`border rounded-lg p-2 min-h-[56px] cursor-pointer transition-all
                ${count > 0 ? "bg-green-50 border-green-300" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"}
                ${isToday ? "border-blue-500 bg-blue-50" : ""}`}>
                <div className={`text-sm font-semibold ${isToday ? "text-blue-600" : "text-gray-600"}`}>{d}</div>
                {count > 0 && <div className="text-xs text-green-600 font-semibold mt-0.5">{count} turno{count > 1 ? "s" : ""}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Lista de Turnos</div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>{["Fecha","Horario","Cliente","Servicio","Personal Asignado","Estado"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-gray-400"/> {t.fecha}</span></td>
                <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><Clock size={13} className="text-gray-400"/> {t.inicio} – {t.fin}</span></td>
                <td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><Building2 size={13} className="text-gray-400"/> {t.cliente}</span></td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.servicio}</td>
                <td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><User size={13} className="text-gray-400"/> {t.personal}</span></td>
                <td className="px-4 py-3">{estadoBadge(t.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title="Asignar Nuevo Turno" onClose={() => setModal(false)}>
          <FormRow>
            <Field label="Cliente">
              <select className={selectCls} value={form.cliente} onChange={setF("cliente")}>
                {clientes.map((c) => <option key={c.id}>{c.empresa}</option>)}
              </select>
            </Field>
            <Field label="Servicio">
              <select className={selectCls} value={form.servicio} onChange={setF("servicio")}>
                {SERVICIOS.map((s) => <option key={s.id}>{s.nombre}</option>)}
              </select>
            </Field>
          </FormRow>
          <div className="mt-2">
            <Field label="Personal" full>
              <select className={`${selectCls} w-full`} value={form.personal} onChange={setF("personal")}>
                {personal.map((p) => <option key={p.id}>{p.nombre}</option>)}
              </select>
            </Field>
          </div>
          <FormRow>
            <Field label="Fecha"><input type="date" className={inputCls} value={form.fecha} onChange={setF("fecha")} /></Field>
            <Field label="Hora Inicio"><input type="time" className={inputCls} value={form.inicio} onChange={setF("inicio")} /></Field>
            <Field label="Hora Fin"><input type="time" className={inputCls} value={form.fin} onChange={setF("fin")} /></Field>
          </FormRow>
          <div className="flex gap-3 mt-5">
            <button onClick={guardar} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"><CalendarDays size={15}/> Asignar Turno</button>
            <button onClick={() => setModal(false)} className="border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── INCIDENTES ───────────────────────────────────────────────────────────────

const Incidentes = ({ incidentes, setIncidentes, clientes, personal, role }) => {
  const [modal, setModal] = useState(false);
  const blank = { tipo: "Intrusión detectada", cliente: clientes[0]?.empresa || "", fecha: "2026-05-06", hora: "", desc: "", responsable: personal[0]?.nombre || "" };
  const [form, setForm] = useState(blank);
  const setF = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const isSupervisor = role === "Supervisor";

  const guardar = () => {
    setIncidentes((prev) => [{ ...form, id: Date.now(), estado: "En atención" }, ...prev]);
    setModal(false);
  };

  // RF-09: cambiar estado del incidente
  const ESTADOS = ["En atención", "Resuelto", "Cerrado"];
  const cambiarEstado = (id) => {
    setIncidentes((prev) => prev.map((i) => {
      if (i.id !== id) return i;
      const idx = ESTADOS.indexOf(i.estado);
      return { ...i, estado: ESTADOS[(idx + 1) % ESTADOS.length] };
    }));
  };

  const borderColor = { "Resuelto": "border-green-400", "En atención": "border-orange-400", "Cerrado": "border-gray-300" };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        {isSupervisor && (
          <button onClick={() => { setForm(blank); setModal(true); }} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <PlusCircle size={15}/> Registrar Incidente
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={ClipboardList}  iconBg="bg-blue-50"   iconColor="text-blue-600"   num={incidentes.length} label="Total Incidentes" />
        <StatCard icon={FileText}       iconBg="bg-blue-50"   iconColor="text-blue-500"   num={incidentes.filter((i) => i.estado === "En atención").length} label="En Atención" numColor="text-blue-600" />
        <StatCard icon={AlertTriangle}  iconBg="bg-orange-50" iconColor="text-orange-500" num={incidentes.filter((i) => i.estado === "En atención").length} label="Pendientes"  numColor="text-orange-500" />
        <StatCard icon={CheckCircle}    iconBg="bg-green-50"  iconColor="text-green-600"  num={incidentes.filter((i) => i.estado === "Resuelto").length}    label="Resueltos"   numColor="text-green-600" />
      </div>

      <div className="space-y-3">
        {incidentes.map((i) => (
          <div key={i.id} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 flex items-start justify-between gap-4 ${borderColor[i.estado] || "border-gray-200"}`}>
            <div className="flex items-start gap-3 flex-1">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                ${i.estado === "En atención" ? "bg-orange-50" : i.estado === "Resuelto" ? "bg-green-50" : "bg-gray-50"}`}>
                <AlertTriangle size={16} className={i.estado === "En atención" ? "text-orange-500" : i.estado === "Resuelto" ? "text-green-500" : "text-gray-400"} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1a2744]">{i.tipo}</div>
                <div className="text-xs text-gray-500 mt-0.5">{i.desc}</div>
                <div className="flex gap-4 mt-2 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><Building2 size={12} className="text-gray-400"/> {i.cliente}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-gray-400"/> {i.fecha}{i.hora ? ` · ${i.hora}` : ""}</span>
                  <span className="flex items-center gap-1"><User size={12} className="text-gray-400"/> {i.responsable}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {estadoBadge(i.estado)}
              {isSupervisor && i.estado !== "Cerrado" && (
                <button
                  onClick={() => cambiarEstado(i.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-200 rounded-lg px-2 py-1 hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  Cambiar estado <ChevronRight size={13} className="inline"/>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal && isSupervisor && (
        <Modal title="Registrar Nuevo Incidente" onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo de Incidente">
              <select className={selectCls} value={form.tipo} onChange={setF("tipo")}>
                {["Intrusión detectada","Alarma activada","Incidente menor","Falla técnica","Emergencia"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Cliente">
              <select className={selectCls} value={form.cliente} onChange={setF("cliente")}>
                {clientes.map((c) => <option key={c.id}>{c.empresa}</option>)}
              </select>
            </Field>
            <Field label="Fecha"><input type="date" className={inputCls} value={form.fecha} onChange={setF("fecha")} /></Field>
            <Field label="Hora"><input type="time" className={inputCls} value={form.hora} onChange={setF("hora")} /></Field>
          </div>
          <div className="mt-3">
            <Field label="Descripción del Incidente">
              <textarea className={`${inputCls} w-full min-h-[80px] resize-y`} placeholder="Describa detalladamente el incidente..." value={form.desc} onChange={setF("desc")} />
            </Field>
          </div>
          <div className="mt-2">
            <Field label="Responsable">
              <select className={`${selectCls} w-full`} value={form.responsable} onChange={setF("responsable")}>
                {personal.map((p) => <option key={p.id}>{p.nombre}</option>)}
              </select>
            </Field>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={guardar} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"><AlertTriangle size={15}/> Registrar Incidente</button>
            <button onClick={() => setModal(false)} className="border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};


// ─── REPORTES ─────────────────────────────────────────────────────────────────

const Reportes = ({ incidentes, turnos, servicios, user }) => {
  const esCliente = user?.role === "Cliente";
  const empresa   = user?.empresa || null;

  // Si es cliente, filtramos todo por su empresa
  const misIncidentes = esCliente ? incidentes.filter((i) => i.cliente === empresa) : incidentes;
  const misTurnos     = esCliente ? turnos.filter((t) => t.cliente === empresa)     : turnos;
  const misServicios  = esCliente ? servicios.filter((s) => s.cliente === empresa)  : servicios;

  const resueltos  = misIncidentes.filter((i) => i.estado === "Resuelto").length;
  const completados = misTurnos.filter((t) => t.estado === "Completado").length;
  const resolucion = misIncidentes.length > 0 ? Math.round((resueltos / misIncidentes.length) * 100) : 0;

  // Gráfico de barras — para cliente mostramos sus turnos reales, para admin los globales
  const barData = esCliente
    ? [
        { mes: "Ene", Completados: misTurnos.filter(t=>t.estado==="Completado").length, Pendientes: misTurnos.filter(t=>t.estado==="Programado").length },
        { mes: "Feb", Completados: 0, Pendientes: 0 },
        { mes: "Mar", Completados: 0, Pendientes: 0 },
        { mes: "Abr", Completados: 0, Pendientes: 0 },
        { mes: "May", Completados: completados, Pendientes: misTurnos.filter(t=>t.estado!=="Completado").length },
      ]
    : TURNOS_CHART;

  // Gráfico de pastel — para cliente filtramos por su empresa
  const pieData = esCliente
    ? (() => {
        const tipos = {};
        misIncidentes.forEach((i) => { tipos[i.tipo] = (tipos[i.tipo] || 0) + 1; });
        const colors = ["#f97316","#ef4444","#3b82f6","#6b7280","#a855f7"];
        return Object.entries(tipos).map(([name, value], idx) => ({ name, value, color: colors[idx % colors.length] }));
      })()
    : INCIDENTES_PIE;

  // Tabla resumen — para admin muestra todos los clientes; para cliente su fila
  const RESUMEN_GLOBAL = [
    { cliente: "Corporación Norte S.A.",      servicios: 3, turnos: 45, incidentes: 2 },
    { cliente: "Centro Comercial La Fortuna", servicios: 2, turnos: 38, incidentes: 1 },
    { cliente: "Bodega Industrial San Carlos",servicios: 1, turnos: 32, incidentes: 1 },
    { cliente: "Condominio Los Robles",       servicios: 1, turnos: 28, incidentes: 0 },
    { cliente: "Clínica Santa Elena",         servicios: 2, turnos: 41, incidentes: 0 },
  ];

  return (
    <div className="space-y-5">
      {/* Banner empresa para cliente */}
      {esCliente && (
        <div className="bg-gradient-to-r from-[#1a2744] to-[#2d3a66] rounded-xl px-6 py-4 text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><Building2 size={16} className="text-white"/></div>
          <div>
            <div className="text-xs opacity-60 uppercase tracking-widest">Reportes de</div>
            <div className="font-bold text-base">{empresa}</div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={TrendingUp}    iconBg="bg-green-50"  iconColor="text-green-600"  num={misServicios.length}   label="Servicios Activos"      trend="+12% vs mes anterior" trendUp />
        <StatCard icon={CalendarDays}  iconBg="bg-blue-50"   iconColor="text-blue-600"   num={esCliente ? completados : 782} label="Turnos Completados" trend="+8% vs mes anterior" trendUp />
        <StatCard icon={TrendingDown}  iconBg="bg-red-50"    iconColor="text-red-500"    num={misIncidentes.length}  label="Incidentes Registrados"  trend="-15% vs mes anterior" trendUp={false} />
        <StatCard icon={CheckCircle}   iconBg="bg-green-50"  iconColor="text-green-600"  num={resueltos}             label="Incidentes Resueltos"     trend={`${resolucion}% de resolución`} trendUp />
      </div>

      <div className="grid grid-cols-[1.2fr_1fr] gap-5">
        {/* Bar chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="text-sm font-bold text-[#1a2744] mb-4">Turnos por Mes</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Completados" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pendientes"  fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="text-sm font-bold text-[#1a2744] mb-4">Incidentes por Tipo</div>
          {pieData.length === 0
            ? <div className="flex items-center justify-center h-48 text-sm text-gray-400">Sin incidentes registrados</div>
            : <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90}
                    dataKey="value" nameKey="name"
                    label={({ name, value }) => `${name}: ${value}`} labelLine>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
          }
        </div>
      </div>

      {/* Tabla — admin ve todos, cliente ve solo su fila */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">
          {esCliente ? `Resumen de ${empresa}` : "Resumen por Cliente"}
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {!esCliente && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Cliente</th>}
              {["Servicios Activos","Turnos Completados","Incidentes"].map((h) => (
                <th key={h} className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {esCliente
              ? (
                <tr className="border-t border-gray-50">
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{misServicios.length}</span></td>
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">{completados}</span></td>
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{misIncidentes.length}</span></td>
                </tr>
              )
              : RESUMEN_GLOBAL.map((r) => (
                <tr key={r.cliente} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{r.cliente}</td>
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{r.servicios}</span></td>
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">{r.turnos}</span></td>
                  <td className="px-4 py-3 text-center"><span className="inline-block min-w-[36px] text-center px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{r.incidentes}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── VISTA CLIENTE ────────────────────────────────────────────────────────────

const VistaCliente = ({ clientes, turnos, incidentes, servicios, user }) => {
  const empresa = user?.empresa || clientes[0]?.empresa;
  const c = clientes.find((cl) => cl.empresa === empresa) || clientes[0];
  const misTurnos     = turnos.filter((t) => t.cliente === empresa);
  const misIncidentes = incidentes.filter((i) => i.cliente === empresa);
  const misServicios  = servicios.filter((s) => s.cliente === empresa);

  const totalTurnos     = misTurnos.length;
  const turnosCompletados = misTurnos.filter((t) => t.estado === "Completado").length;
  const incResueltos    = misIncidentes.filter((i) => i.estado === "Resuelto").length;

  return (
    <div className="space-y-5">
      {/* Banner empresa */}
      <div className="bg-gradient-to-r from-[#1a2744] to-[#2d3a66] rounded-xl p-7 text-white">
        <div className="text-xs font-semibold opacity-60 uppercase tracking-widest mb-2">Empresa Contratante</div>
        <div className="text-2xl font-bold">{c.empresa}</div>
        <div className="text-sm opacity-70 mt-1.5">
          <span className="flex items-center gap-1.5 text-sm opacity-70 mt-1.5"><MapPin size={13}/> {c.ubicacion} · Contacto: {c.nombre} {c.apellido}</span>
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Briefcase}    iconBg="bg-blue-50"   iconColor="text-blue-600"   num={misServicios.length}  label="Servicios Activos"    numColor="text-blue-600"  />
        <StatCard icon={CalendarDays} iconBg="bg-teal-50"   iconColor="text-teal-500"   num={totalTurnos}           label="Turnos Totales"        />
        <StatCard icon={CheckCircle}  iconBg="bg-green-50"  iconColor="text-green-600"  num={turnosCompletados}     label="Turnos Completados"    numColor="text-green-600" />
        <StatCard icon={AlertTriangle}iconBg="bg-orange-50" iconColor="text-orange-500" num={misIncidentes.length}  label="Incidentes Registrados" numColor="text-orange-500" />
      </div>

      {/* Mis servicios */}
      {misServicios.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Mis Servicios Contratados</div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>{["Servicio","Horario","Modalidad","Responsable","Estado"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {misServicios.map((s) => (
                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-[#1a2744]">{s.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-500"><span className="flex items-center gap-1"><Clock size={13} className="text-gray-400"/> {s.horario}</span></td>
                  <td className="px-4 py-3 text-sm">{s.modalidad}</td>
                  <td className="px-4 py-3 text-sm"><span className="flex items-center gap-1"><User size={13} className="text-gray-400"/> {s.responsable}</span></td>
                  <td className="px-4 py-3">{estadoBadge(s.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        {/* Mis Turnos */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Turnos Recientes</div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>{["Fecha","Horario","Servicio","Estado"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {misTurnos.length === 0
                ? <tr><td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-400">Sin turnos registrados</td></tr>
                : misTurnos.slice(0,5).map((t) => (
                    <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{t.fecha}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{t.inicio}–{t.fin}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{t.servicio}</td>
                      <td className="px-4 py-3">{estadoBadge(t.estado)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Mis Incidentes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 font-semibold text-[#1a2744]">Incidentes</div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>{["Tipo","Fecha","Estado"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {misIncidentes.length === 0
                ? <tr><td colSpan={3} className="px-4 py-4 text-center text-sm text-gray-400">Sin incidentes registrados</td></tr>
                : misIncidentes.map((i) => (
                    <tr key={i.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{i.tipo}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{i.fecha}</td>
                      <td className="px-4 py-3">{estadoBadge(i.estado)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporte de cumplimiento */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="font-semibold text-[#1a2744] mb-4">Reporte de Cumplimiento</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{totalTurnos > 0 ? Math.round((turnosCompletados/totalTurnos)*100) : 0}%</div>
            <div className="text-xs text-blue-600 mt-1">Turnos completados</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{misIncidentes.length > 0 ? Math.round((incResueltos/misIncidentes.length)*100) : 100}%</div>
            <div className="text-xs text-green-600 mt-1">Incidentes resueltos</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">{misIncidentes.filter(i=>i.estado==="En atención").length}</div>
            <div className="text-xs text-orange-600 mt-1">Incidentes pendientes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [user,       setUser]       = useState(null);
  const [page,       setPage]       = useState("dashboard");
  const [clientes,   setClientes]   = useState(INITIAL_CLIENTES);
  const [personal,   setPersonal]   = useState(INITIAL_PERSONAL);
  const [turnos,     setTurnos]     = useState(INITIAL_TURNOS);
  const [incidentes, setIncidentes] = useState(INITIAL_INCIDENTES);
  const [servicios,  setServicios]  = useState(SERVICIOS);

  const handleLogin = (u) => {
    setUser(u);
    setPage(ROL_HOME[u.role] || "dashboard");
  };

  const handleNavigate = (p) => {
    const allowed = ROL_PAGES[user?.role] || [];
    if (allowed.includes(p)) setPage(p);
  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const allowed  = ROL_PAGES[user.role] || [];
  const safePage = allowed.includes(page) ? page : (ROL_HOME[user.role] || allowed[0]);
  const isReadOnly = user.role === "Supervisor";

  const renderPage = () => {
    switch (safePage) {
      case "dashboard":     return <Dashboard    clientes={clientes} turnos={turnos} incidentes={incidentes} />;
      case "clientes":      return <Clientes     clientes={clientes} setClientes={setClientes} readOnly={isReadOnly} />;
      case "servicios":     return <Servicios    clientes={clientes} personal={personal} servicios={servicios} setServicios={setServicios} />;
      case "personal":      return <Personal     personal={personal} setPersonal={setPersonal} />;
      case "turnos":        return <Turnos       turnos={turnos} setTurnos={setTurnos} clientes={clientes} personal={personal} role={user.role} />;
      case "incidentes":    return <Incidentes   incidentes={incidentes} setIncidentes={setIncidentes} clientes={clientes} personal={personal} role={user.role} />;
      case "reportes":      return <Reportes     incidentes={incidentes} turnos={turnos} servicios={servicios} user={user} />;
      case "vista-cliente": return <VistaCliente clientes={clientes} turnos={turnos} incidentes={incidentes} servicios={servicios} user={user} />;
      default:              return null;
    }
  };

  const [title, subtitle] = PAGE_META[safePage] || ["", ""];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar page={safePage} onNavigate={handleNavigate} onLogout={() => setUser(null)} role={user.role} />
      <div className="ml-52 flex-1 min-h-screen">
        <div className="bg-white border-b border-gray-200 px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a2744]">{title}</h1>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{user.role}</span>
            <div className="w-9 h-9 bg-[#1a2744] rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
        <div className="p-7">{renderPage()}</div>
      </div>
    </div>
  );
}
