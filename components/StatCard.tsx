import React from 'react';
import { Icon } from './Icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Decorative gradient blob behind */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-alpha15 rounded-full blur-2xl group-hover:bg-primary-alpha25 transition-colors duration-500"></div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-mono px-2 py-1 rounded-full border ${
            trendUp 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white font-sans">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;