import React from 'react';
import { Truck, Fuel, Wrench, DollarSign, TrendingUp } from 'lucide-react';
import PerformanceChart from '../components/PerformanceChart';

const FleetPage: React.FC = () => {
  const fleetKpis = [
    { label: 'Utilización de Flota', value: '85%', sub: '+2.4% vs mes anterior', icon: Truck, color: 'blue', bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30', text: 'text-blue-600' },
    { label: 'Eficiencia Combustible', value: '12.4 km/gl', sub: '-5% costo/km', icon: Fuel, color: 'green', bg: 'bg-green-100', darkBg: 'dark:bg-green-900/30', text: 'text-green-600' },
    { label: 'Alertas Mantenimiento', value: '3', sub: '2 Críticas', icon: Wrench, color: 'orange', bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30', text: 'text-orange-600' },
    { label: 'Gasto Operativo', value: '$12,450', sub: 'En presupuesto', icon: DollarSign, color: 'purple', bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30', text: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Control de Flota</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Monitoreo de eficiencia, combustible y mantenimiento.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fleetKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${kpi.bg} ${kpi.darkBg} ${kpi.text}`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{kpi.value}</h3>
            <p className="text-xs font-bold text-gray-500">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Eficiencia Operativa</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-[300px]">
             <PerformanceChart labels={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']} unit="%" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
           <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">Mantenimiento Predictivo</h3>
           <div className="space-y-4">
              {[
                { vehicle: 'V3X-982', task: 'Cambio de Aceite', due: 'En 450 km', priority: 'HIGH' },
                { vehicle: 'B4Z-112', task: 'Revisión de Frenos', due: 'En 1,200 km', priority: 'MEDIUM' },
                { vehicle: 'C1Y-554', task: 'Rotación Neumáticos', due: 'En 2 días', priority: 'LOW' }
              ].map((m, i) => (
                <div key={i} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <div className={`h-2 w-2 rounded-full mr-4 ${m.priority === 'HIGH' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-gray-900 dark:text-white">{m.vehicle}</p>
                    <p className="text-xs font-bold text-gray-500">{m.task}</p>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase">{m.due}</span>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all">Ver Calendario</button>
        </div>
      </div>
    </div>
  );
};

export default FleetPage;
