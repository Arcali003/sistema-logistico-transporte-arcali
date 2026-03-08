import React from 'react';
import { Search, Package, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const CustomerPortal: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-600 p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Portal de Clientes</h1>
          <p className="text-blue-100 font-bold max-w-md">Rastrea tus envíos en tiempo real y gestiona tus entregas.</p>
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-blue-300" />
            <input
              type="text"
              placeholder="Número de guía o pedido..."
              className="w-full pl-16 pr-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[30px] focus:ring-4 focus:ring-white/30 text-lg font-bold placeholder:text-blue-200 outline-none transition-all"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Envíos Recientes</h2>
          {[
            { id: 'SHP-9921', status: 'IN_TRANSIT', origin: 'Lima, PE', destination: 'Cusco, PE', eta: '14:30 Today' },
            { id: 'SHP-9918', status: 'DELIVERED', origin: 'Arequipa, PE', destination: 'Lima, PE', eta: 'Delivered' },
          ].map((shipment, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-[35px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Package className="h-7 w-7 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white leading-none">{shipment.id}</h3>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">{shipment.origin} → {shipment.destination}</p>
                  </div>
                </div>
                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {shipment.status === 'DELIVERED' ? 'Entregado' : 'En Tránsito'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">ETA Estimado</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{shipment.eta}</p>
                  </div>
                </div>
                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Ver Mapa en Vivo</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">Mis Estadísticas</h3>
          <div className="space-y-6">
            {[
              { label: 'Entregas a tiempo', value: '98.5%', icon: CheckCircle2, color: 'green' },
              { label: 'Envíos este mes', value: '24', icon: Package, color: 'blue' },
              { label: 'Puntos de entrega', value: '12', icon: MapPin, color: 'purple' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center p-5 bg-gray-50 dark:bg-gray-700/30 rounded-3xl">
                <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center mr-5`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
