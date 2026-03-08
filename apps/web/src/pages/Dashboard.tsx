import React from 'react';
import { Truck, Package, Map as MapIcon, AlertCircle, Clock, CheckCircle2, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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

const PerformanceChart = ({ title, data, secondaryData, labels, colorClass, secondaryColorClass, unit = 'unidades' }: { title: string, data: number[], secondaryData?: number[], labels: string[], colorClass: string, secondaryColorClass?: string, unit?: string }) => {
  const max = Math.max(...data, ...(secondaryData || []), 1);
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-full min-h-[320px]">
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">{title}</h3>
      <div className="flex-1 flex items-end gap-4 h-48 mb-6 px-2">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative h-full">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-10 shadow-xl whitespace-nowrap border border-gray-700 dark:border-gray-600">
              <span className="font-black">{v}{unit}</span>
              {secondaryData && <span className="ml-2 opacity-60 border-l border-gray-600 pl-2">Cost: {secondaryData[i]}</span>}
            </div>
            <div className="flex w-full items-end gap-1 flex-1 h-full">
              <div
                className={`flex-1 rounded-t-md transition-all duration-700 ${colorClass} shadow-sm group-hover:brightness-110 cursor-pointer`}
                style={{ height: `${Math.max((v/max) * 100, 4)}%` }}
              />
              {secondaryData && (
                <div
                  className={`flex-1 rounded-t-md transition-all duration-700 ${secondaryColorClass} shadow-sm group-hover:brightness-110 cursor-pointer`}
                  style={{ height: `${Math.max((secondaryData[i]/max) * 100, 4)}%` }}
                />
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter shrink-0">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Utilización de Flota', value: '88.4%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+2.4%', trendColor: 'text-emerald-500' },
    { label: 'Eficiencia Combustible', value: '3.2 km/L', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: '-0.1', trendColor: 'text-amber-500' },
    { label: 'Salud de Vehículos', value: '95%', icon: AlertCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: 'Excelente', trendColor: 'text-emerald-500' },
    { label: 'Entregas a Tiempo', value: '94.2%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: '+1.2%', trendColor: 'text-emerald-500' },
  ];

  const recentAlerts = [
    { id: 1, type: 'critical', msg: 'Exceso de velocidad: V3X-982 (105 km/h) en zona urbana', time: 'Hace 2 min', action: 'Contactar' },
    { id: 2, type: 'warning', msg: 'Retraso detectado en Ruta PE-1N (SHP-1002)', time: 'Hace 15 min', action: 'Ver Mapa' },
    { id: 3, type: 'success', msg: 'Mantenimiento preventivo completado: B4Z-112', time: 'Hace 1 hora', action: 'Ficha' },
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
              <span className={`text-[10px] font-black ${stat.trendColor} bg-gray-50 dark:bg-gray-900/50 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerformanceChart
          title="Eficiencia vs Costo Operativo"
          data={[42, 38, 55, 48, 62, 75, 50]}
          secondaryData={[30, 35, 40, 38, 45, 50, 42]}
          labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          colorClass="bg-blue-600"
          secondaryColorClass="bg-rose-500"
          unit="envíos"
        />
        <PerformanceChart
          title="Consumo de Combustible (Gal/Km)"
          data={[8.2, 7.8, 8.5, 8.1, 7.5, 7.2, 7.9]}
          labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
          colorClass="bg-indigo-600"
          unit="%"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Estado de la Flota</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">24</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En Ruta / Activos</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">5</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En Mantenimiento</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">8</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disponibles / Idle</p>
            </div>
          </div>
        </div>
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
                {/* Active Route simulation */}
                <Polyline
                   positions={[
                     [-12.046374, -77.042793],
                     [-12.065, -77.035],
                     [-12.085, -77.025],
                     [-12.122, -77.036]
                   ]}
                   color="#3b82f6"
                   weight={4}
                   opacity={0.6}
                   dashArray="10, 10"
                />
                <Marker position={[-12.122, -77.036]}>
                   <Popup><span className="font-bold">Vehículo V3X-982 (En Ruta)</span></Popup>
                </Marker>
                <Marker position={[-12.085, -77.025]}>
                   <Popup><span className="font-bold">Vehículo B4Z-112 (Detenido)</span></Popup>
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
               <div key={alert.id} className="p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer first:rounded-t-3xl last:rounded-b-3xl group">
                 <div className={
                   alert.type === 'critical' ? 'text-rose-500' :
                   alert.type === 'warning' ? 'text-amber-500' :
                   alert.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
                 }>
                   {alert.type === 'critical' ? <AlertCircle className="h-5 w-5 animate-bounce" /> :
                    alert.type === 'warning' ? <Clock className="h-5 w-5" /> :
                    alert.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-start">
                     <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight mb-1 pr-4">{alert.msg}</p>
                     <span className="text-[9px] font-black bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       {alert.action}
                     </span>
                   </div>
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
