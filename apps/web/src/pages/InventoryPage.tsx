import React from 'react';
import { Truck, Warehouse } from 'lucide-react';

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Control de Inventario</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Carga en tránsito y almacenes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700">
           <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Carga por Vehículo</h3>
           </div>
           <div className="space-y-6">
              {[
                { vehicle: 'V3X-982', load: 'ELECTRONICS', qty: '2,500 units', location: 'Lima Centro', fill: 75 },
                { vehicle: 'B4Z-112', load: 'FURNITURE', qty: '120 boxes', location: 'Arequipa', fill: 90 },
                { vehicle: 'C1Y-554', load: 'GENERAL_GOODS', qty: '4,000 kg', location: 'Cusco', fill: 60 },
              ].map((v, i) => (
                <div key={i} className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-3xl border border-gray-100 dark:border-gray-700">
                   <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-black text-gray-900 dark:text-white">{v.vehicle} • <span className="text-blue-600">{v.load}</span></p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{v.qty} • {v.location}</p>
                      </div>
                      <span className="text-[10px] font-black text-blue-600">{v.fill}% OCUPACIÓN</span>
                   </div>
                   <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${v.fill}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700">
           <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                <Warehouse className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Estado de Almacenes</h3>
           </div>
           <div className="space-y-4">
              {[
                { name: 'ALMACEN_CENTRAL', address: 'AV. LOS PROCERES 123', stock: '1,500 items', status: 'NORMAL' },
                { name: 'ALMACEN_SUR', address: 'PARQUE INDUSTRIAL SUR', stock: '850 items', status: 'STOCK BAJO' }
              ].map((w, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/30 rounded-3xl border border-gray-100 dark:border-gray-700">
                   <div className="flex items-center space-x-4">
                      <div className={`h-2 w-2 rounded-full ${w.status === 'NORMAL' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-black text-gray-900 dark:text-white text-sm">{w.name}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase">{w.address}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-gray-900 dark:text-white text-sm">{w.stock}</p>
                      <p className={`text-[10px] font-black uppercase ${w.status === 'NORMAL' ? 'text-green-600' : 'text-red-600'}`}>{w.status}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
