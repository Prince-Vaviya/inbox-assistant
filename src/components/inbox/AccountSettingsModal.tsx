import React from 'react';
import { X, Check, Trash2, RefreshCw, Plus, ShieldCheck, Mail, AlertTriangle, ExternalLink } from 'lucide-react';
import { EmailAccount } from '../../types';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: EmailAccount[];
  activeAccountId: string;
  onSelectAccount: (id: string) => void;
  onAddAnotherAccount: () => void;
  onDisconnectAccount: (id: string) => void;
  onSyncAccount: (id: string) => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  accounts,
  activeAccountId,
  onSelectAccount,
  onAddAnotherAccount,
  onDisconnectAccount,
  onSyncAccount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Connected Mailbox Accounts</h3>
              <p className="text-xs text-slate-500">Manage OAuth authorizations and sync preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Connections ({accounts.length})
            </span>
            <button
              onClick={() => {
                onClose();
                onAddAnotherAccount();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Connect Another Account
            </button>
          </div>

          {/* Accounts List */}
          <div className="space-y-3">
            {accounts.map((acc) => {
              const isActive = acc.id === activeAccountId;

              return (
                <div
                  key={acc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'border-brand-500 bg-brand-50/20 shadow-xs ring-1 ring-brand-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                        {acc.provider === 'google' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#F25022" d="M1 1h10v10H1z"/>
                            <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                            <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                            <path fill="#FFB900" d="M13 13h10v10H13z"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{acc.displayName}</span>
                          {isActive && (
                            <span className="text-[10px] uppercase font-bold text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded">
                              Current View
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">{acc.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isActive && (
                        <button
                          onClick={() => onSelectAccount(acc.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Switch
                        </button>
                      )}
                      <button
                        onClick={() => onSyncAccount(acc.id)}
                        title="Re-synchronize account"
                        className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      {accounts.length > 1 && (
                        <button
                          onClick={() => onDisconnectAccount(acc.id)}
                          title="Disconnect account"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> OAuth 2.0 Token Healthy
                    </span>
                    <span>Last synced: {acc.lastSyncedAt}</span>
                    <span>{acc.totalEmails} total messages indexed</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy Reassurance */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Token Isolation & Revocation
            </div>
            You can revoke access from your Google or Microsoft security dashboard at any time. Revoking immediately cuts synchronization and terminates session tokens.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

