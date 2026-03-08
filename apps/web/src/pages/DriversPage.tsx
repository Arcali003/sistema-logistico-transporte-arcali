import React, { useState, useMemo } from 'react';
import { User, Plus, Search, Phone, FileText, Calendar, Shield, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from '../components/Modal';
import SidePanel from '../components/SidePanel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const driverSchema = z.object({
  fullName: z.string().min(5, 'Nombre completo requerido'),
  dni: z.string().length(8, 'DNI debe tener 8 dígitos'),
  license: z.string().min(9, 'Brevete inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  sctr: z.string().min(5, 'SCTR requerido'),
});

type DriverForm = z.infer<typeof driverSchema>;

const DriversPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const [drivers, setDrivers] = useState([
    { id: 1, fullName: 'Juan Pérez García', dni: '45678912', license: 'Q45678912', phone: '987654321', sctr: 'POL-998822', status: 'AVAILABLE', lastTrip: '2025-05-15' },
    { id: 2, fullName: 'Carlos Rodríguez Ruiz', dni: '12345678', license: 'A12345678', phone: '912345678', sctr: 'POL-776611', status: 'ON_TRIP', lastTrip: '2025-05-18' },
    { id: 3, fullName: 'David Sánchez Mora', dni: '87654321', license: 'B87654321', phone: '955443322', sctr: 'POL-554433', status: 'AVAILABLE', lastTrip: '2025-05-17' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<DriverForm>({ resolver: zodResolver(driverSchema) });

  const onSubmit = (data: DriverForm) => {
    const newDriver = { id: drivers.length + 1, ...data, status: 'AVAILABLE', lastTrip: 'N/A' };
    setDrivers([...drivers, newDriver]);
    setIsModalOpen(false);
    reset();
    alert('Conductor registrado con éxito');
  };

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d =>
      d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.dni.includes(searchTerm) ||
      d.license.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, drivers]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Personal de Conducción</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Registro de conductores y control de documentación.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center space-x-2 shadow-lg uppercase tracking-widest text-sm">
          <Plus className="h-5 w-5" />
          <span>Nuevo Conductor</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
        <Search className="absolute left-9 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, DNI o brevete..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-500 text-sm dark:text-white font-medium outline-none"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
               {['Conductor', 'DNI / Brevete', 'Teléfono', 'Estado', 'SCTR'].map(h => (
                 <th key={h} className="px-8 py-5 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{h}</th>
               ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} onClick={() => setSelectedDriver(driver)} className="group hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <User className="h-5 w-5" />
                    </div>
                    <p className="font-bold text-gray-900 dark:text-gray-200 uppercase text-xs tracking-widest">{driver.fullName}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{driver.dni}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{driver.license}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-mono text-sm text-gray-600 dark:text-gray-400">{driver.phone}</td>
                <td className="px-8 py-6">
                   <span className={cn(
                     "text-[10px] font-black px-3 py-1 rounded-full border tracking-tighter uppercase",
                     driver.status === 'AVAILABLE' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                   )}>
                     {driver.status === 'AVAILABLE' ? 'Disponible' : 'En Ruta'}
                   </span>
                </td>
                <td className="px-8 py-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{driver.sctr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Conductor">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Nombre Completo</label>
              <input {...register('fullName')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">DNI</label>
              <input {...register('dni')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.dni && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.dni.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Brevete</label>
              <input {...register('license')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.license && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.license.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Teléfono</label>
              <input {...register('phone')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Póliza SCTR</label>
              <input {...register('sctr')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              {errors.sctr && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.sctr.message}</p>}
            </div>
          </div>
          <div className="pt-6 flex space-x-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">Registrar Conductor</button>
          </div>
        </form>
      </Modal>

      <SidePanel isOpen={!!selectedDriver} onClose={() => setSelectedDriver(null)} title="Ficha del Conductor">
        {selectedDriver && (
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mb-4 border-2 border-dashed border-blue-200 dark:border-blue-800">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedDriver.fullName}</h4>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">ID de Empleado: #00{selectedDriver.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1"><CreditCard className="h-3 w-3 mr-1" /> DNI</span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedDriver.dni}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1"><FileText className="h-3 w-3 mr-1" /> Brevete</span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedDriver.license}</p>
              </div>
            </div>

            <div className="space-y-4">
               <h5 className="text-xs font-black text-gray-500 uppercase tracking-widest">Documentación y Seguros</h5>
               <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
                     <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-3" />
                        <div>
                           <p className="text-xs font-black text-green-700 dark:text-green-400 uppercase tracking-tighter">Seguro SCTR</p>
                           <p className="text-[10px] font-bold text-green-600/70">{selectedDriver.sctr}</p>
                        </div>
                     </div>
                     <span className="text-[10px] font-black text-green-700 uppercase">Vigente</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                     <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-600 mr-3" />
                        <div>
                           <p className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-tighter">Último Viaje</p>
                           <p className="text-[10px] font-bold text-blue-600/70">{selectedDriver.lastTrip}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-6">
               <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Contactar Conductor</span>
               </button>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  );
};

export default DriversPage;
