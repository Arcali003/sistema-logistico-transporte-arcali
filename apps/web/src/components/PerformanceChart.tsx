import React from 'react';

interface PerformanceChartProps {
  labels: string[];
  unit: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ labels, unit }) => {
  return (
    <div className="w-full h-full flex flex-col items-end justify-end space-y-2">
      <div className="flex-1 w-full flex items-end justify-between px-2">
        {[40, 70, 55, 90, 65, 80, 85].map((val, i) => (
          <div key={i} className="group relative flex flex-col items-center w-8">
            <div
              className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 cursor-pointer"
              style={{ height: `${val}%` }}
            >
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}{unit}
               </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between px-2">
        {labels.map((l, i) => (
          <span key={i} className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-8 text-center">{l}</span>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
