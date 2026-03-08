import React from 'react';
import { Truck, MapPin, Camera, Signature, CheckCircle2, AlertTriangle, Navigation } from 'lucide-react';

const DriverApp: React.FC = () => {
  const currentRoute = {
    id: 'RT-2025-001',
    stops: [
      { address: 'Av. Larco 123, Miraflores', type: 'PICKUP', status: 'COMPLETED' },
      { address: 'Calle Los Cedros 456, San Isidro', type: 'DELIVERY', status: 'ACTIVE' },
      { address: 'Av. La Marina 789, San Miguel', type: 'DELIVERY', status: 'PENDING' },
    ]
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24">
      <div className="bg-gray-900 dark:bg-white p-8 rounded-[40px] text-white dark:text-gray-900 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg"><Truck className="h-6 w-6 text-white" /></div>
          <span className="bg-green-500/20 text-green-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">En Turno</span>
        </div>
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Hola, Carlos</h1>
        <p className="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Ruta Actual: {currentRoute.id}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter px-2">Hoja de Ruta</h2>
        {currentRoute.stops.map((stop, i) => (
          <div key={i} className={`p-6 rounded-[30px] border-2 transition-all ${
            stop.status === 'ACTIVE' ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' :
            stop.status === 'COMPLETED' ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent text-gray-400' :
            'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                stop.status === 'ACTIVE' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {stop.status === 'COMPLETED' ? <CheckCircle2 className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{stop.type}</p>
                   {stop.status === 'ACTIVE' && <Navigation className="h-5 w-5 animate-pulse" />}
                </div>
                <p className="text-sm font-black leading-tight">{stop.address}</p>
              </div>
            </div>

            {stop.status === 'ACTIVE' && (
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-md">
                   <Camera className="h-4 w-4" /><span>Foto</span>
                </button>
                <button className="flex items-center justify-center space-x-3 bg-white text-blue-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg">
                   <Signature className="h-4 w-4" /><span>Confirmar</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-900/90 dark:bg-white/90 backdrop-blur-xl p-4 rounded-[30px] shadow-2xl border border-white/10 dark:border-gray-200 flex justify-between items-center z-[100]">
        <button className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><AlertTriangle className="h-6 w-6" /></button>
        <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/30">Finalizar Ruta</button>
        <div className="h-12 w-12 bg-gray-800 dark:bg-gray-100 rounded-2xl flex items-center justify-center"><Navigation className="h-6 w-6 text-blue-600" /></div>
      </div>
    </div>
  );
};

export default DriverApp;
