import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, Navigation, Info, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
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

const TrackingPage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const activeVehicles = [
    { id: 1, plate: 'V3X-982', driver: 'Juan Pérez', lat: -12.046, lng: -77.042, speed: '45 km/h', heading: 'Norte', status: 'MOVING' },
    { id: 2, plate: 'B4Z-112', driver: 'Carlos Rodríguez', lat: -12.085, lng: -77.025, speed: '0 km/h', heading: 'N/A', status: 'IDLE' },
    { id: 3, plate: 'C1Y-554', driver: 'David Sánchez', lat: -12.122, lng: -77.036, speed: '62 km/h', heading: 'Sur', status: 'MOVING' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Seguimiento en Vivo</h1>
           <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Monitoreo satelital de flota activa</p>
        </div>
        <div className="flex space-x-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input placeholder="Buscar placa..." className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold uppercase tracking-widest outline-none shadow-sm focus:ring-2 focus:ring-blue-500" />
           </div>
           <button className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm text-gray-500"><Filter className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
         <div className="w-full lg:w-80 flex flex-col space-y-4 overflow-y-auto pr-2">
            {activeVehicles.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={cn(
                  "p-5 rounded-3xl border transition-all cursor-pointer group",
                  selectedVehicle?.id === v.id
                    ? "bg-blue-600 border-blue-500 shadow-lg"
                    : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
                )}
              >
                 <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "p-3 rounded-2xl",
                      selectedVehicle?.id === v.id ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                    )}>
                       <Truck className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                      v.status === 'MOVING'
                        ? (selectedVehicle?.id === v.id ? "bg-white/20 text-white" : "bg-green-50 text-green-600")
                        : (selectedVehicle?.id === v.id ? "bg-white/10 text-white/70" : "bg-amber-50 text-amber-600")
                    )}>
                      {v.status === 'MOVING' ? 'En Movimiento' : 'Detenido'}
                    </span>
                 </div>
                 <h4 className={cn(
                   "text-lg font-black uppercase tracking-tighter",
                   selectedVehicle?.id === v.id ? "text-white" : "text-gray-900 dark:text-white"
                 )}>{v.plate}</h4>
                 <p className={cn(
                   "text-[10px] font-bold uppercase tracking-widest mb-4",
                   selectedVehicle?.id === v.id ? "text-blue-100" : "text-gray-400"
                 )}>{v.driver}</p>

                 <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                       <Navigation className={cn("h-3 w-3 mr-1", selectedVehicle?.id === v.id ? "text-white" : "text-blue-500")} />
                       <span className={cn("text-[10px] font-black uppercase", selectedVehicle?.id === v.id ? "text-white" : "text-gray-600 dark:text-gray-400")}>{v.speed}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="flex-1 bg-white dark:bg-gray-800 rounded-[2.5rem] border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden relative z-0">
            <MapContainer center={[-12.046, -77.042]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {activeVehicles.map((v) => (
                <Marker key={v.id} position={[v.lat, v.lng]} eventHandlers={{ click: () => setSelectedVehicle(v) }}>
                  <Popup>
                    <div className="p-2">
                       <p className="font-black text-blue-600 text-sm m-0">{v.plate}</p>
                       <p className="text-xs font-bold text-gray-500 uppercase m-0">{v.driver}</p>
                       <div className="mt-2 pt-2 border-t border-gray-100 flex items-center text-[10px] font-black text-gray-400 uppercase">
                          <Navigation className="h-3 w-3 mr-1" /> {v.speed} • {v.heading}
                       </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {selectedVehicle && (
               <div className="absolute bottom-6 right-6 left-6 lg:left-auto lg:w-96 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[1000] animate-in slide-in-from-bottom duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                     <div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                        <Navigation className="h-6 w-6" />
                     </div>
                     <div>
                        <h5 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedVehicle.plate}</h5>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estado en tiempo real</p>
                     </div>
                     <button onClick={() => setSelectedVehicle(null)} className="ml-auto text-gray-400 hover:text-gray-600 font-bold">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Velocidad</span>
                        <p className="text-sm font-black text-gray-800 dark:text-gray-200">{selectedVehicle.speed}</p>
                     </div>
                     <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Ubicación</span>
                        <p className="text-sm font-black text-gray-800 dark:text-gray-200">{selectedVehicle.lat.toFixed(3)}, {selectedVehicle.lng.toFixed(3)}</p>
                     </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2">
                     <Info className="h-4 w-4" />
                     <span>Ver Ficha Completa</span>
                  </button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default TrackingPage;
