import React, { useState } from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProviderType, User } from '../../types';

interface ProviderSelectStepProps {
  currentUser: User;
  onSelectProvider: (provider: ProviderType, options: ConnectionPreferences) => void;
  onBack: () => void;
}

export interface ConnectionPreferences {
  syncPastDays: number;
  enableAIPriority: boolean;
  categorizeNewsletters: boolean;
  notifyUrgent: boolean;
}

export const ProviderSelectStep: React.FC<ProviderSelectStepProps> = ({
  onSelectProvider,
  onBack
}) => {
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('google');

  const handleConnect = () => {
    onSelectProvider(selectedProvider, {
      syncPastDays: 30,
      enableAIPriority: true,
      categorizeNewsletters: true,
      notifyUrgent: true
    });
  };

  return (
    <div className="w-full max-w-[460px] mx-auto px-6 py-12 sm:py-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-800 font-medium mb-8 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Connect your email
        </h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Choose where you receive your messages
        </p>
      </div>

      {/* Provider Choices */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
        {/* Google Card */}
        <div
          onClick={() => setSelectedProvider('google')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedProvider === 'google'
              ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
              : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Google Workspace / Gmail</div>
              <div className={`text-xs mt-0.5 ${selectedProvider === 'google' ? 'text-slate-300' : 'text-slate-500'}`}>
                Personal @gmail or corporate domain
              </div>
            </div>
          </div>

          {selectedProvider === 'google' && (
            <Check className="w-4 h-4 text-white stroke-[2.5]" />
          )}
        </div>

        {/* Microsoft Card */}
        <div
          onClick={() => setSelectedProvider('microsoft')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedProvider === 'microsoft'
              ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
              : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Microsoft 365 / Outlook</div>
              <div className={`text-xs mt-0.5 ${selectedProvider === 'microsoft' ? 'text-slate-300' : 'text-slate-500'}`}>
                Office 365, Outlook.com, Hotmail
              </div>
            </div>
          </div>

          {selectedProvider === 'microsoft' && (
            <Check className="w-4 h-4 text-white stroke-[2.5]" />
          )}
        </div>

        {/* Primary Action Button */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleConnect}
            className="w-full h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Continue with {selectedProvider === 'google' ? 'Google' : 'Microsoft'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        Restricted OAuth 2.0 access • Revoke anytime
      </p>
    </div>
  );
};
