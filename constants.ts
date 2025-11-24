import { PipelineStage, LogEntry, SearchResult, ViewMode } from './types';

export const PIPELINE_STAGES: PipelineStage[] = [
    {
        id: 'ingest',
        name: 'Ingestion Service',
        description: 'Loads varied file types from storage',
        tech: 'C# .NET 8',
        status: 'processing',
        iconName: 'FileArchive'
    },
    {
        id: 'convert',
        name: 'PDF Converter',
        description: 'Standardizes formats to searchable PDF',
        tech: 'C# Library',
        status: 'processing',
        iconName: 'FileText'
    },
    {
        id: 'parse',
        name: 'Intelligent Parser',
        description: 'Extracts text and table structures',
        tech: 'Python',
        status: 'completed',
        iconName: 'Code'
    },
    {
        id: 'process',
        name: 'NLP Processor',
        description: 'Chunks content and generates summaries',
        tech: 'Python/LangChain',
        status: 'idle',
        iconName: 'Brain'
    },
    {
        id: 'index',
        name: 'Search Indexer',
        description: 'Ingests documents into vector store',
        tech: 'Elasticsearch',
        status: 'idle',
        iconName: 'Database'
    }
];

export const MOCK_LOGS: LogEntry[] = [
    { id: '1', timestamp: '10:42:15', level: 'SUCCESS', message: 'Indexed Document_882.pdf successfully', stage: 'Elasticsearch' },
    { id: '2', timestamp: '10:42:10', level: 'INFO', message: 'Chunking content for ID #882', stage: 'Python Parser' },
    { id: '3', timestamp: '10:41:55', level: 'INFO', message: 'Extracted 3 tables from Financial_Report_Q3.docx', stage: 'Python Parser' },
    { id: '4', timestamp: '10:41:42', level: 'INFO', message: 'Converted Financial_Report_Q3.docx to PDF', stage: 'PDF Converter' },
    { id: '5', timestamp: '10:40:01', level: 'WARN', message: 'Retry attempt 1 for corrupt header in Legacy_Doc.rtf', stage: 'Ingestion Service' },
];

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
    {
        id: '101',
        title: 'Q3 Financial Overview 2024',
        snippet: '...revenue grew by 15% year-over-year, driven primarily by the new SaaS vertical defined in Table 3...',
        score: 0.98,
        tags: ['Finance', 'Report', 'Q3']
    },
    {
        id: '102',
        title: 'Engineering Architecture V2',
        snippet: '...the C# loader initiates the stream, passing byte arrays to the Python bridge for processing...',
        score: 0.85,
        tags: ['Engineering', 'Architecture', 'Internal']
    },
    {
        id: '103',
        title: 'Compliance Safety Standards',
        snippet: '...all hazardous materials must be logged within the ingestion service before conversion begins...',
        score: 0.72,
        tags: ['Compliance', 'Safety']
    }
];

export const CHART_DATA = [
    { name: '10:00', files: 45, latency: 120 },
    { name: '10:10', files: 52, latency: 132 },
    { name: '10:20', files: 38, latency: 101 },
    { name: '10:30', files: 65, latency: 154 },
    { name: '10:40', files: 48, latency: 118 },
    { name: '10:50', files: 60, latency: 140 },
];