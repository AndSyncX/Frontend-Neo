import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ClipboardList,
  FolderOpen,
  UploadCloud,
  Settings,
  LogOut,
  Box,
  UniversityIcon,
  University
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#0f172a] text-white flex flex-col justify-between shadow-md">
      {/* Sección superior */}
      <div className="flex flex-col px-6 py-6 overflow-y-auto">
        {/* Logo y Título */}
        <div className="flex items-center gap-3 mb-4">
          <Box className="w-7 h-7 text-cyan-400 stroke-2" />
          <h1 className="text-2xl font-bold text-cyan-400">Neo-System</h1>
        </div>

        {/* Sección PANEL */}
        <h2 className="text-sm text-slate-400 uppercase mb-3">Panel</h2>
        <nav className="space-y-2 mb-6">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/users" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <Users className="w-5 h-5" />
            <span>Usuarios</span>
          </Link>
        </nav>

        {/* Sección GESTIÓN */}
        <h2 className="text-sm text-slate-400 uppercase mb-3">Gestión</h2>
        <nav className="space-y-2">
          <Link to="/careers" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <University className="w-5 h-5" />
            <span>Carreras</span>
          </Link>
          <Link to="/courses" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <BookOpen className="w-5 h-5" />
            <span>Cursos</span>
          </Link>
          <Link to="/tasks" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <FileText className="w-5 h-5" />
            <span>Tareas</span>
          </Link>
          <Link to="/enrollments" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <ClipboardList className="w-5 h-5" />
            <span>Inscripción</span>
          </Link>
          <Link to="/materials" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <FolderOpen className="w-5 h-5" />
            <span>Materiales</span>
          </Link>
          <Link to="/assignment-delivery" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition">
            <UploadCloud className="w-5 h-5" />
            <span>Asignar Tareas</span>
          </Link>
        </nav>
      </div>

      {/* Sección inferior */}
      <div className="px-6 py-2 border-t border-slate-700">
        <div className="space-y-2 mb-4">
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-cyan-800/40 transition w-full text-left">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-500/30 transition w-full text-left text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
