import React from 'react';
import { Mail } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false 
}) => {
  const iconSizes = {
    sm: 'w-6 h-6 p-1 rounded-lg',
    md: 'w-7 h-7 p-1.5 rounded-lg',
    lg: 'w-9 h-9 p-2 rounded-xl',
  };

  const titleSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-xl font-bold',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`flex items-center justify-center bg-slate-900 text-white shadow-2xs ${iconSizes[size]}`}>
        <Mail className="w-full h-full" />
      </div>
      <div>
        <div className={`tracking-tight text-slate-900 ${titleSizes[size]}`}>
          Inbox Assistant
        </div>
        {showTagline && (
          <p className="text-[11px] text-slate-400 font-normal">Email copilot</p>
        )}
      </div>
    </div>
  );
};
