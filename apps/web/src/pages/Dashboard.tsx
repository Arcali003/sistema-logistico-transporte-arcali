import React from 'react';
import { Truck, Users, Package, Map as MapIcon, FileText, AlertCircle, Clock, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PerformanceChart = ({ title, data, labels, colorClass }: { title: string, data: number[], labels: string[], colorClass: string }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-full">
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{title}</h3>
      <div className="flex-1 flex items-end gap-2 h-32 mb-4">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              {v} unidades
            </div>
            <div
              className={`w-full rounded-t-lg transition-all duration-700 ${colorClass} opacity-80 hover:opacity-100`}
              style={{ height: `${(v/max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1">
        {labels.map((l, i) => (
          <span key={i} className="text-[10px] font-bold text-gray-400 uppercase">{l}</span>
        ))}
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Envíos Activos', value: '24', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%' },
    { label: 'Vehículos en Ruta', value: '18', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: 'Estable' },
    { label: 'Conductores', value: '32', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '3 Libres' },
    { label: 'PODs Pendientes', value: '12', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: 'Revisar' },
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', msg: 'Retraso detectado en Ruta PE-1N (V3X-982)', time: 'Hace 5 min' },
    { id: 2, type: 'success', msg: 'Entrega completada: Minera Arcali (SHP-1002)', time: 'Hace 12 min' },
    { id: 3, type: 'info', msg: 'Vehículo B4Z-112 ingresó a mantenimiento', time: 'Hace 1 hora' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Panel de Control</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">Arcali Logistics v1.0 • Sistema de Gestión</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all">Hoy</button>
          <button className="px-4 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Semana</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerformanceChart
          title="Volumen de Envíos (Semanal)"
          data={[42, 38, 55, 48, 62, 75, 50]}
          labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          colorClass="bg-blue-600"
        />
        <PerformanceChart
          title="Cumplimiento de Entregas (%)"
          data={[92, 88, 95, 94, 98, 91, 96]}
          labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          colorClass="bg-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center">
              <MapIcon className="h-5 w-5 mr-2 text-blue-600" /> Vista en Tiempo Real
            </h2>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Ver pantalla completa</button>
          </div>
          <div className="h-[400px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner z-0">
             <MapContainer center={[-12.046374, -77.042793]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[-12.046374, -77.042793]}>
                   <Popup><span className="font-bold">Sede Principal Lima</span></Popup>
                </Marker>
             </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter px-2 flex items-center">
             <AlertCircle className="h-5 w-5 mr-2 text-amber-500" /> Alertas del Sistema
           </h2>
           <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-50 dark:divide-gray-700">
             {recentAlerts.map((alert) => (
               <div key={alert.id} className="p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer first:rounded-t-3xl last:rounded-b-3xl">
                 <div className={
                   alert.type === 'warning' ? 'text-amber-500' :
                   alert.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
                 }>
                   {alert.type === 'warning' ? <Clock className="h-5 w-5" /> :
                    alert.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                 </div>
                 <div className="flex-1">
                   <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight mb-1">{alert.msg}</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{alert.time}</p>
                 </div>
               </div>
             ))}
             <button onClick={() => alert('Todas las alertas')} className="w-full py-4 text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-colors">Ver todas las notificaciones</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
