import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProviderType } from '../../types';

interface AuthorizeStepProps {
  provider: ProviderType;
  accountName: string;
  accountEmail: string;
  onAuthorize: () => void;
  onBack: () => void;
}

export const AuthorizeStep: React.FC<AuthorizeStepProps> = ({
  provider,
  accountName,
  accountEmail,
  onAuthorize,
  onBack,
}) => {
  return (
    <div className="w-full max-w-[460px] mx-auto px-6 py-12 sm:py-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-800 font-medium mb-8 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Change account
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
          {provider === 'google' ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Authorize Account
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Grant Inbox Assistant access to {provider === 'google' ? 'Google Workspace' : 'Microsoft 365'}
        </p>
      </div>

      {/* Authorization Card */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
        {/* Selected Account Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center">
              {accountName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{accountName}</div>
              <div className="text-[11px] text-slate-500 font-mono">{accountEmail}</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
            {provider === 'google' ? 'Gmail' : 'Outlook'}
          </span>
        </div>

        {/* Permissions Requested */}
        <div>
          <div className="text-xs font-semibold text-slate-800 mb-3">
            Permissions requested:
          </div>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Read and summarize email threads for AI triage</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>View mailbox folders, labels, and metadata</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Detect priority actions, deliverables, and deadlines</span>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Restricted OAuth 2.0 access. Revoke anytime.</span>
        </div>

        {/* Authorize Action Button */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={onAuthorize}
            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Authorize & Connect Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-2 text-center text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

