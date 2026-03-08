import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <div className={cn("fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[110] transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={onClose} />
      <div className={cn(
        "fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-800 z-[120] shadow-2xl transition-transform duration-500 transform border-l border-gray-100 dark:border-gray-700",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors text-gray-400"><X className="h-6 w-6" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
