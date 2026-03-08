import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, Users, MapPin, LogOut, Bell, Search, Menu, X, Sun, Moon, Gauge, Box, Globe, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/shipments', icon: Package, label: 'Envíos' },
    { to: '/vehicles', icon: Truck, label: 'Vehículos' },
    { to: '/drivers', icon: Users, label: 'Conductores' },
    { to: '/tracking', icon: MapPin, label: 'Seguimiento' },
    { to: '/fleet', icon: Gauge, label: 'Flota' },
    { to: '/inventory', icon: Box, label: 'Inventario' },
    { to: '/customer-portal', icon: Globe, label: 'Portal Clientes' },
    { to: '/driver-app', icon: Smartphone, label: 'App Conductor' },
  ];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 transform lg:relative lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg"><Truck className="h-6 w-6 text-white" /></div>
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Arcali</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-gray-400"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-200",
                  isActive ? "bg-blue-600 text-white shadow-xl" : "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}>
                <item.icon className="h-5 w-5" /><span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 mt-auto space-y-2">
            <button onClick={toggleTheme} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}<span>{theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <LogOut className="h-5 w-5" /><span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden mr-6 p-2 text-gray-400"><Menu className="h-6 w-6" /></button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Buscar..." className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-medium dark:text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-3 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors"><Bell className="h-5 w-5" /><span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span></button>
            <div className="flex items-center space-x-4 pl-6 border-l border-gray-100 dark:border-gray-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-gray-900 dark:text-white leading-none">{user?.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{user?.role}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black text-lg">{user?.name?.[0]}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth"><div className="max-w-7xl mx-auto">{children}</div></main>
      </div>
    </div>
  );
};
export default MainLayout;
