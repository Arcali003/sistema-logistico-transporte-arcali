import React, { useState, useMemo } from 'react';
import { Package, Plus, Search, Calendar, MapPin, ArrowRight, Download, History, ClipboardList, Info, Sparkles, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from '../components/Modal';
import SidePanel from '../components/SidePanel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const shipmentSchema = z.object({
  client: z.string().min(3, 'Mínimo 3 caracteres'),
  origin: z.string().min(3, 'Mínimo 3 caracteres'),
  destination: z.string().min(3, 'Mínimo 3 caracteres'),
  date: z.string().min(1, 'Fecha requerida'),
});

type ShipmentForm = z.infer<typeof shipmentSchema>;

const ShipmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  const [allShipments, setAllShipments] = useState([
    { id: 'SHP-1001', client: 'Minera Arcali', status: 'IN_TRANSIT', origin: 'Lima', destination: 'Cusco', date: '2025-05-18', driver: 'Juan Pérez', vehicle: 'V3X-982' },
    { id: 'SHP-1002', client: 'Retail SAC', status: 'DELIVERED', origin: 'Callao', destination: 'Trujillo', date: '2025-05-17', driver: 'Carlos Rodríguez', vehicle: 'B4Z-112' },
    { id: 'SHP-1003', client: 'Import Peru', status: 'PLANNED', origin: 'Matarani', destination: 'Arequipa', date: '2025-05-20', driver: 'Sin Asignar', vehicle: 'Sin Asignar' },
    { id: 'SHP-1004', client: 'Construcciones S.A.', status: 'DISPATCHED', origin: 'Lima', destination: 'Ica', date: '2025-05-19', driver: 'David Sánchez', vehicle: 'C1Y-554' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ShipmentForm>({ resolver: zodResolver(shipmentSchema) });

  const onSubmit = (data: ShipmentForm) => {
    const newShp = { id: `SHP-${1000 + allShipments.length + 1}`, ...data, status: 'PLANNED', driver: 'Sin Asignar', vehicle: 'Sin Asignar' };
    setAllShipments([newShp, ...allShipments]);
    setIsModalOpen(false);
    reset();
    alert('Envío programado exitosamente');
  };

  const filteredShipments = useMemo(() => {
    return allShipments.filter(shp => {
      const matchesSearch = shp.id.toLowerCase().includes(searchTerm.toLowerCase()) || shp.client.toLowerCase().includes(searchTerm.toLowerCase()) || shp.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || shp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, allShipments]);

  const handleOptimize = () => {
    alert('Iniciando Algoritmo de Optimización Automática de Rutas (Punto 1)...\n\nConsiderando:\n- Tráfico en tiempo real\n- Condiciones climáticas\n- Ventanas horarias de clientes\n- Costo operativo por km');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Gestión de Envíos</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Administra y programa las rutas de transporte.</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={handleOptimize} className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center space-x-2 shadow-lg uppercase tracking-widest text-sm">
            <Sparkles className="h-5 w-5" />
            <span>Optimizar con IA</span>
          </button>
          <button onClick={() => alert('Exportando...')} className="px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center space-x-2"><Download className="h-4 w-4" /><span className="hidden md:inline uppercase text-xs tracking-widest">Excel</span></button>
          <button onClick={() => setIsModalOpen(true)} className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center space-x-2 shadow-lg uppercase tracking-widest text-sm"><Plus className="h-5 w-5" /><span>Nueva Orden</span></button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" placeholder="Buscar envío..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-500 text-sm dark:text-white font-medium outline-none" /></div>
         <div className="flex space-x-2 md:col-span-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest outline-none">
               {['ALL', 'PLANNED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED'].map(s => <option key={s} value={s}>{s === 'ALL' ? 'Todos' : s}</option>)}
            </select>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold text-gray-600 dark:text-gray-300 transition-colors text-sm uppercase tracking-widest"><Calendar className="h-4 w-4" /></button>
         </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead><tr className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
               {['ID / Cliente', 'Ruta', 'Fecha Prog.', 'Estado', 'Acciones'].map(h => <th key={h} className="px-8 py-5 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
               {filteredShipments.map((shp) => (
                  <tr key={shp.id} onClick={() => setSelectedShipment(shp)} className="group hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                     <td className="px-8 py-6"><div className="flex items-center"><div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform"><Package className="h-5 w-5" /></div><div><p className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm leading-none mb-1">{shp.id}</p><p className="font-bold text-gray-900 dark:text-gray-200 text-xs uppercase tracking-widest">{shp.client}</p></div></div></td>
                     <td className="px-8 py-6"><div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300"><span className="flex items-center"><MapPin className="h-3 w-3 mr-1 text-gray-400" /> {shp.origin}</span><ArrowRight className="h-3 w-3 mx-2 text-gray-300 dark:text-gray-600" /><span className="flex items-center"><MapPin className="h-3 w-3 mr-1 text-blue-500" /> {shp.destination}</span></div></td>
                     <td className="px-8 py-6"><div className="flex flex-col"><span className="text-sm font-bold text-gray-800 dark:text-gray-200">{shp.date}</span><span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Confirmado</span></div></td>
                     <td className="px-8 py-6"><span className={cn("text-[10px] font-black px-3 py-1 rounded-full border tracking-tighter uppercase", shp.status === 'IN_TRANSIT' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100' : shp.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-600')}>{shp.status}</span></td>
                     <td className="px-8 py-6 text-right"><button className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Detalles</button></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Programar Nuevo Envío">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase tracking-widest">Cliente</label><input {...register('client')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="Empresa" />{errors.client && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.client.message}</p>}</div>
            <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase tracking-widest">Fecha</label><input {...register('date')} type="date" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />{errors.date && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.date.message}</p>}</div>
            <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase tracking-widest">Origen</label><input {...register('origin')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="Origen" />{errors.origin && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.origin.message}</p>}</div>
            <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase tracking-widest">Destino</label><input {...register('destination')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="Destino" />{errors.destination && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.destination.message}</p>}</div>
          </div>
          <div className="pt-6 flex space-x-4"><button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all">Cancelar</button><button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">Crear Orden</button></div>
        </form>
      </Modal>
      <SidePanel isOpen={!!selectedShipment} onClose={() => setSelectedShipment(null)} title={selectedShipment ? `Detalles ${selectedShipment.id}` : ''}>
        {selectedShipment && (
          <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/40"><div className="flex items-center space-x-4 mb-4"><div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center"><Package className="h-6 w-6" /></div><div><h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedShipment.client}</h4><span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedShipment.status}</span></div></div><div className="grid grid-cols-2 gap-4"><div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conductor</span><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedShipment.driver}</p></div><div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vehículo</span><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedShipment.vehicle}</p></div></div></div>
            <div className="space-y-4"><h5 className="flex items-center text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest"><ClipboardList className="h-4 w-4 mr-2 text-blue-600" /> Ruta</h5><div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700"><div className="relative pl-8"><div className="absolute left-0 top-1.5 h-5 w-5 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800"></div><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedShipment.origin}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Carga</p></div><div className="relative pl-8"><div className="absolute left-0 top-1.5 h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800"></div><p className="text-sm font-bold text-gray-500">{selectedShipment.destination}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Entrega</p></div></div></div>
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col space-y-3">
              <button onClick={() => alert('Punto 2: Despacho inteligente asignando automáticamente Conductor, Vehículo y Ruta')} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-blue-200">
                <Zap className="h-4 w-4" />
                <span>Despacho Inteligente</span>
              </button>
              <button className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"><Info className="h-4 w-4" /><span>Ver en Mapa</span></button>
              <button className="w-full py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"><History className="h-4 w-4" /><span>Historial</span></button>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  );
};
export default ShipmentsPage;
