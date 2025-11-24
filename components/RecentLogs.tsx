import React from 'react';
import { MOCK_LOGS } from '../constants';
import { Icon } from './Icons';

const RecentLogs: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_LOGS.map((log) => (
        <div 
          key={log.id} 
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
        >
          <div className="w-16 text-xs text-gray-500 font-mono text-right">
            {log.timestamp}
          </div>
          
          <div className="flex-shrink-0">
            {log.level === 'SUCCESS' && <Icon name="CheckCircle2" className="text-green-400" size={16} />}
            {log.level === 'INFO' && <Icon name="Info" className="text-blue-400" size={16} />}
            {log.level === 'WARN' && <Icon name="AlertTriangle" className="text-yellow-400" size={16} />}
            {log.level === 'ERROR' && <Icon name="XCircle" className="text-red-400" size={16} />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200 truncate font-mono">{log.message}</p>
          </div>

          <div className="hidden sm:block px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 uppercase tracking-wider">
            {log.stage}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentLogs;