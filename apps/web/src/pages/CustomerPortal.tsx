import React, { useState, useMemo } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

const mockShipments = [
  { id: 'SHP-9921', status: 'IN_TRANSIT', origin: 'LIMA, PE', destination: 'CUSCO, PE', eta: '14:30 Today', coordinates: { lat: -12.0464, lng: -77.0428 } },
  { id: 'SHP-9918', status: 'DELIVERED', origin: 'AREQUIPA, PE', destination: 'LIMA, PE', eta: 'Delivered', coordinates: { lat: -16.409, lng: -71.5375 } },
  { id: 'SHP-9925', status: 'IN_TRANSIT', origin: 'PIURA, PE', destination: 'LIMA, PE', eta: '18:00 Tomorrow', coordinates: { lat: -5.1945, lng: -80.6328 } },
  { id: 'SHP-9930', status: 'IN_TRANSIT', origin: 'TRUJILLO, PE', destination: 'CHICLAYO, PE', eta: '10:00 Monday', coordinates: { lat: -8.1091, lng: -79.0215 } },
  { id: 'SHP-9935', status: 'DELIVERED', origin: 'IQUITOS, PE', destination: 'LIMA, PE', eta: 'Delivered', coordinates: { lat: -3.7452, lng: -73.2514 } },
];

const CustomerPortal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<typeof mockShipments[0] | null>(null);

  const filteredShipments = useMemo(() => {
    const term = searchTerm.toUpperCase();
    if (!term) return mockShipments;
    return mockShipments.filter(s => s.id.includes(term));
  }, [searchTerm]);

  const stats = useMemo(() => {
    return [
      {
        label: 'Entregas a tiempo',
        value: `${(Math.random() * (99 - 95) + 95).toFixed(1)}%`,
        icon: CheckCircle2,
        colorClass: 'bg-green-100 dark:bg-green-900/30',
        iconClass: 'text-green-600'
      },
      {
        label: 'Envíos este mes',
        value: mockShipments.length.toString(),
        icon: Package,
        colorClass: 'bg-blue-100 dark:bg-blue-900/30',
        iconClass: 'text-blue-600'
      },
      {
        label: 'Puntos de entrega',
        value: new Set(mockShipments.map(s => s.destination)).size.toString(),
        icon: MapPin,
        colorClass: 'bg-purple-100 dark:bg-purple-900/30',
        iconClass: 'text-purple-600'
      },
    ];
  }, []);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[30px] focus:ring-4 focus:ring-white/30 text-lg font-bold placeholder:text-blue-200 outline-none transition-all"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Envíos Recientes</h2>
          {filteredShipments.length === 0 && (
            <div className="bg-white dark:bg-gray-800 p-12 rounded-[35px] border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold">No se encontraron envíos con ese número de guía</p>
            </div>
          )}
          {filteredShipments.map((shipment) => (
            <div key={shipment.id} className="bg-white dark:bg-gray-800 p-8 rounded-[35px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
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
                <button
                  onClick={() => {
                    setSelectedShipment(shipment);
                    setIsModalOpen(true);
                  }}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Ver Mapa en Vivo
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedShipment ? `Ruta: ${selectedShipment.origin} → ${selectedShipment.destination}` : 'Mapa de Envío'}
        >
          <div className="space-y-6">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center overflow-hidden relative border-2 border-gray-100 dark:border-gray-600">
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${selectedShipment?.coordinates.lat},${selectedShipment?.coordinates.lng}&zoom=12`}
                className="opacity-50 grayscale"
              ></iframe>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/10 backdrop-blur-[2px]">
                <MapPin className="h-12 w-12 text-blue-600 animate-bounce mb-2" />
                <p className="text-gray-900 dark:text-white font-black uppercase tracking-tighter bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-xl">Seguimiento en Vivo Activado</p>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">ID: {selectedShipment?.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Estado Actual</p>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-100">{selectedShipment?.status === 'DELIVERED' ? 'ENTREGADO' : 'EN TRÁNSITO'}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600/30">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ETA Estimado</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedShipment?.eta}</p>
              </div>
            </div>
          </div>
        </Modal>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">Mis Estadísticas</h3>
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center p-5 bg-gray-50 dark:bg-gray-700/30 rounded-3xl">
                <div className={`h-12 w-12 rounded-2xl ${stat.colorClass} flex items-center justify-center mr-5`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconClass}`} />
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
