import React, { useState, useMemo } from 'react';
import { Truck, Plus, Search, Filter, Settings, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from '../components/Modal';
import SidePanel from '../components/SidePanel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const vehicleSchema = z.object({
  plate: z.string().min(6, 'Placa inválida').max(7),
  type: z.enum(['Cama Baja', 'Cuna', 'Plataforma', 'Cisterna']),
  axles: z.number().min(1, 'Mínimo 1 eje').max(4, 'Máximo 4 ejes'),
  brand: z.string().min(2, 'Marca requerida'),
  model: z.string().min(2, 'Modelo requerido'),
  propertyCard: z.string().min(5, 'Tarjeta de propiedad requerida'),
});

type VehicleForm = z.infer<typeof vehicleSchema>;

const VehiclesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'V3X-982', type: 'Cama Baja', axles: 3, brand: 'Volvo', model: 'FH16', status: 'ACTIVE', lastMaintenance: '2024-12-10', propertyCard: 'TP-992211' },
    { id: 2, plate: 'B4Z-112', type: 'Cuna', axles: 4, brand: 'Mercedes-Benz', model: 'Actros', status: 'IN_REPAIR', lastMaintenance: '2025-01-05', propertyCard: 'TP-883344' },
    { id: 3, plate: 'C1Y-554', type: 'Plataforma', axles: 2, brand: 'Scania', model: 'R450', status: 'ACTIVE', lastMaintenance: '2024-11-20', propertyCard: 'TP-774455' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VehicleForm>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { axles: 2 }
  });

  const onSubmit = (data: VehicleForm) => {
    const newVehicle = { id: vehicles.length + 1, ...data, status: 'ACTIVE', lastMaintenance: new Date().toISOString().split('T')[0] };
    setVehicles([...vehicles, newVehicle]);
    setIsModalOpen(false);
    reset();
    alert('Vehículo registrado correctamente');
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchesSearch = v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || v.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'ALL' || v.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter, vehicles]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Flota de Vehículos</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Gestión de unidades y mantenimiento preventivo.</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center space-x-2 shadow-lg uppercase tracking-widest text-sm">
            <Plus className="h-5 w-5" />
            <span>Registrar Unidad</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por placa o marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-500 text-sm dark:text-white font-medium outline-none"
            />
         </div>
         <div className="md:col-span-2 flex space-x-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest outline-none"
            >
               <option value="ALL">Todos los tipos</option>
               <option value="Cama Baja">Cama Baja</option>
               <option value="Cuna">Cuna</option>
               <option value="Plataforma">Plataforma</option>
            </select>
            <button className="px-4 py-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold text-gray-600 dark:text-gray-300 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-14 w-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="h-7 w-7" />
              </div>
              <span className={cn(
                "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                vehicle.status === 'ACTIVE' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              )}>
                {vehicle.status === 'ACTIVE' ? 'Operativo' : 'En Taller'}
              </span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-1 uppercase">{vehicle.plate}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{vehicle.brand} {vehicle.model} • {vehicle.type}</p>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-700 pt-6">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ejes</span>
                <p className="font-bold text-gray-700 dark:text-gray-200">{vehicle.axles} Ejes</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mantenimiento</span>
                <p className="font-bold text-gray-700 dark:text-gray-200">{vehicle.lastMaintenance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nueva Unidad">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Placa (Ej: ABC-123)</label>
              <input {...register('plate')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.plate && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.plate.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Tarjeta Propiedad</label>
              <input {...register('propertyCard')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.propertyCard && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.propertyCard.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Tipo</label>
              <select {...register('type')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold">
                <option value="Cama Baja">Cama Baja</option>
                <option value="Cuna">Cuna</option>
                <option value="Plataforma">Plataforma</option>
                <option value="Cisterna">Cisterna</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Número de Ejes (1-4)</label>
              <input type="number" {...register('axles', { valueAsNumber: true })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.axles && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.axles.message}</p>}
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Marca</label>
               <input {...register('brand')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Modelo</label>
               <input {...register('model')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>
          <div className="pt-6 flex space-x-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">Registrar</button>
          </div>
        </form>
      </Modal>

      <SidePanel isOpen={!!selectedVehicle} onClose={() => setSelectedVehicle(null)} title={selectedVehicle ? `Vehículo ${selectedVehicle.plate}` : ''}>
        {selectedVehicle && (
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-600">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                     <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedVehicle.plate}</h4>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedVehicle.brand} {selectedVehicle.model}</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">SOAT</span>
                     <div className="flex items-center text-green-600 font-bold text-xs"><ShieldCheck className="h-3 w-3 mr-1" /> VIGENTE</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Rev. Técnica</span>
                     <div className="flex items-center text-red-600 font-bold text-xs"><AlertTriangle className="h-3 w-3 mr-1" /> VENCE 15D</div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Especificaciones</h5>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { label: 'Tipo de Carrocería', value: selectedVehicle.type },
                   { label: 'Número de Ejes', value: `${selectedVehicle.axles} Ejes` },
                   { label: 'Tarjeta Propiedad', value: selectedVehicle.propertyCard || 'N/A' },
                   { label: 'Capacidad de Carga', value: '32 Toneladas' },
                   { label: 'Último Mantenimiento', value: selectedVehicle.lastMaintenance },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-700">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-sm font-black text-gray-700 dark:text-gray-200">{item.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="pt-6">
               <button className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Configurar Mantenimiento</span>
               </button>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  );
};

export default VehiclesPage;
