import React from 'react';
import { Truck, Map as MapIcon, AlertCircle, Clock, CheckCircle2, TrendingUp, DollarSign, Zap } from 'lucide-react';
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
              {v}
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
    { label: 'Utilización de Flota', value: '86%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+4% vs mes ant.' },
    { label: 'SLA de Entrega', value: '94.2%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: 'Objetivo: 95%' },
    { label: 'Costo por KM (Prom)', value: '$2.45', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '-12% ahorro' },
    { label: 'Emisiones CO2', value: '1.2t', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: 'Eco-driving act.' },
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', msg: 'Exceso de velocidad: V3X-982 (Ruta PE-1N)', time: 'Hace 5 min' },
    { id: 2, type: 'success', msg: 'Optimización de ruta SHP-1003 completada', time: 'Hace 12 min' },
    { id: 3, type: 'info', msg: 'Mantenimiento preventivo sugerido: B4Z-112', time: 'Hace 1 hora' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Business Intelligence</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">SLTA SaaS Enterprise • Visión General de Operaciones</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all">Tiempo Real</button>
          <button className="px-4 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Reportes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerformanceChart
          title="Rentabilidad por Ruta (USD)"
          data={[1200, 980, 1500, 1100, 1800, 2100, 1400]}
          labels={['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7']}
          colorClass="bg-emerald-500"
        />
        <PerformanceChart
          title="Consumo de Combustible (Gal/Km)"
          data={[8.2, 7.8, 8.5, 8.1, 7.5, 7.2, 7.9]}
          labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          colorClass="bg-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center">
              <MapIcon className="h-5 w-5 mr-2 text-blue-600" /> Control de Activos en Red
            </h2>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Abrir Centro de Monitoreo</button>
          </div>
          <div className="h-[400px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner z-0">
             <MapContainer center={[-12.046374, -77.042793]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[-12.046374, -77.042793]}>
                   <Popup><span className="font-bold">Centro de Distribución - Lima</span></Popup>
                </Marker>
             </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter px-2 flex items-center">
             <AlertCircle className="h-5 w-5 mr-2 text-amber-500" /> Eventos Criticos
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
             <button onClick={() => alert('Todas las alertas')} className="w-full py-4 text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-colors">Historial de Telemetría</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
