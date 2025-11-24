import React from 'react';
import { 
  FileText, 
  FileArchive, 
  Code, 
  Brain, 
  Database, 
  Activity, 
  Search, 
  LayoutDashboard, 
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react';

export const IconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  FileText,
  FileArchive,
  Code,
  Brain,
  Database,
  Activity,
  Search,
  LayoutDashboard,
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = "" }) => {
  const IconComponent = IconMap[name] || Activity;
  return <IconComponent size={size} className={className} />;
};