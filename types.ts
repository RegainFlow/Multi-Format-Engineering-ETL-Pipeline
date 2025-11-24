export interface PipelineStats {
    totalFiles: number;
    processedFiles: number;
    failedFiles: number;
    avgProcessingTime: string;
    activeNodes: number;
}

export interface PipelineStage {
    id: string;
    name: string;
    description: string;
    tech: string;
    status: 'idle' | 'processing' | 'completed' | 'error';
    iconName: string;
}

export interface LogEntry {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
    message: string;
    stage: string;
}

export interface SearchResult {
    id: string;
    title: string;
    snippet: string;
    score: number;
    tags: string[];
}

export enum ViewMode {
    DASHBOARD = 'DASHBOARD',
    SEARCH = 'SEARCH'
}
