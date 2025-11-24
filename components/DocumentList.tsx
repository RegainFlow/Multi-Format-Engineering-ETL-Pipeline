import React from 'react';
import { Icon } from './Icons';

const DOCUMENTS = [
    { id: 1, name: 'P&ID_Rev3.pdf', source: 'S3 Bucket', type: 'pdf', size: '2.4 MB', status: 'indexed', time: '2 mins ago' },
    { id: 2, name: 'Sensor_Specs_2024.docx', source: 'SharePoint', type: 'doc', size: '1.1 MB', status: 'processing', time: '5 mins ago' },
    { id: 3, name: 'Pump_Maintenance_Log.csv', source: 'PostgreSQL', type: 'csv', size: '450 KB', status: 'indexed', time: '12 mins ago' },
    { id: 4, name: 'Safety_Protocol_v2.pdf', source: 'S3 Bucket', type: 'pdf', size: '3.2 MB', status: 'failed', time: '1 hour ago' },
    { id: 5, name: 'Calibration_Report_Q3.pdf', source: 'Email', type: 'pdf', size: '890 KB', status: 'indexed', time: '2 hours ago' },
];

const DocumentList: React.FC = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Ingestions</h3>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                    Live Stream
                </span>
            </div>

            <div className="space-y-2">
                {DOCUMENTS.map((doc) => (
                    <div key={doc.id} className="glass-card p-3 flex items-center justify-between group hover:bg-white/5 transition-colors border border-white/5 hover:border-primary/20">
                        <div className="flex items-center gap-4">
                            {/* Icon based on type */}
                            <div className={`p-2 rounded-lg ${doc.type === 'pdf' ? 'bg-red-500/10 text-red-400' :
                                    doc.type === 'csv' ? 'bg-green-500/10 text-green-400' :
                                        'bg-blue-500/10 text-blue-400'
                                }`}>
                                <Icon name={doc.type === 'csv' ? 'Database' : 'FileText'} size={16} />
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                    {doc.name}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{doc.source}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                                    <span>{doc.size}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-600 font-mono hidden sm:block">{doc.time}</span>

                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${doc.status === 'indexed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    doc.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse' :
                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                }`}>
                                {doc.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentList;
