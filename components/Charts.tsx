import React from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { CHART_DATA } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-primary border border-primary/30 p-3 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <p className="text-white font-mono text-xs mb-2">{label}</p>
          <p className="text-primary text-sm font-bold">
            Files: {payload[0].value}
          </p>
          <p className="text-purple-400 text-sm font-bold">
            Latency: {payload[1].value}ms
          </p>
        </div>
      );
    }
    return null;
  };

const Charts: React.FC = () => {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                    <defs>
                        <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00d6cb" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00d6cb" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        stroke="#666" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#666" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="files" 
                        stroke="#00d6cb" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorFiles)" 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#a78bfa" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorLatency)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;