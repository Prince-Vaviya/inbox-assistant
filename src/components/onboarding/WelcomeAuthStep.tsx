import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { ProviderType } from '../../types';

interface WelcomeAuthStepProps {
  onSelectProvider: (provider: ProviderType, name: string, email: string) => void;
}

export const WelcomeAuthStep: React.FC<WelcomeAuthStepProps> = ({ onSelectProvider }) => {
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) return;
    const name = customEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const provider: ProviderType = customEmail.includes('outlook') || customEmail.includes('microsoft') || customEmail.includes('hotmail')
      ? 'microsoft'
      : 'google';
    onSelectProvider(provider, formattedName, customEmail);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-9">
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
          <Mail className="w-5 h-5" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Inbox Assistant
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Intelligent email prioritization & triage
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
        {/* Primary 1-Click Demo Action */}
        <div>
          <button
            type="button"
            onClick={() => onSelectProvider('google', 'Alex Chen', 'alex.chen@worksuite.io')}
            className="w-full h-12 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-between cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-[10px] flex items-center justify-center">
                AC
              </span>
              <span className="font-semibold text-xs">Alex Chen</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300 font-semibold text-xs">
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-xs text-slate-400">
            <span className="bg-white px-3 font-normal">or connect your account</span>
          </div>
        </div>

        {/* Social Provider Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => onSelectProvider('google', 'Alex Chen', 'alex.chen@gmail.com')}
            className="w-full h-11 flex items-center justify-center gap-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProvider('microsoft', 'Alex Chen', 'alex.chen@outlook.com')}
            className="w-full h-11 flex items-center justify-center gap-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            <span>Continue with Microsoft</span>
          </button>
        </div>

        {/* Custom Work Email */}
        <div className="pt-2">
          {!showCustomInput ? (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Or enter work email
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-2.5">
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-11 px-4 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all bg-white"
                autoFocus
              />
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        Protected with OAuth 2.0 & end-to-end encryption.
      </p>
    </div>
  );
};
