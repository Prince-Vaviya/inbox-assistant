import React, { useState } from 'react';
import { Shield, Lock, AlertCircle, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';
import { ProviderType, User } from '../../types';

interface OAuthModalProps {
  provider: ProviderType;
  currentUser: User;
  onAuthorizeSuccess: (accountDetails: { email: string; displayName: string }) => void;
  onCancel: () => void;
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  provider,
  currentUser,
  onAuthorizeSuccess,
  onCancel,
}) => {
  const [stage, setStage] = useState<'pick_account' | 'review_permissions'>('pick_account');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Suggested email based on provider
  const defaultEmail = provider === 'google' 
    ? (currentUser.email.includes('@gmail.com') ? currentUser.email : 'alex.chen@worksuite.io')
    : (currentUser.email.includes('@outlook.com') ? currentUser.email : 'alex.chen@contoso-enterprises.com');

  const [selectedEmail, setSelectedEmail] = useState(defaultEmail);
  const [selectedName, setSelectedName] = useState(currentUser.name || 'Alex Chen');

  const handleApprove = () => {
    setIsAuthorizing(true);
    // Simulate slight authentic cryptographic handshake latency
    setTimeout(() => {
      onAuthorizeSuccess({
        email: selectedEmail,
        displayName: `${selectedName} (${provider === 'google' ? 'Gmail' : 'Microsoft'})`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Browser simulated title bar */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-slate-500 ml-2 truncate">
              {provider === 'google' ? 'https://accounts.google.com/o/oauth2/v2/auth' : 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'}
            </span>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* GOOGLE OAUTH DIALOG */}
        {provider === 'google' ? (
          <div className="p-6 sm:p-7">
            {/* Google Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-semibold text-slate-800 text-sm">Sign in with Google</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">OAuth 2.0</span>
            </div>

            {stage === 'pick_account' ? (
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                  Choose an account
                </h3>
                <p className="text-xs text-slate-600 mb-5">
                  to continue to <strong className="text-slate-800">Inbox Assistant</strong>
                </p>

                {/* Account list */}
                <div className="space-y-2 mb-6">
                  <div
                    onClick={() => {
                      setSelectedEmail(defaultEmail);
                      setSelectedName(currentUser.name);
                      setStage('review_permissions');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        {selectedName.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-slate-900">{selectedName}</div>
                        <div className="text-xs text-slate-500">{defaultEmail}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div
                    onClick={() => {
                      setSelectedEmail('alex.chen.personal@gmail.com');
                      setSelectedName('Alex Chen (Personal)');
                      setStage('review_permissions');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                        G
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-slate-900">Personal Gmail Account</div>
                        <div className="text-xs text-slate-500">alex.chen.personal@gmail.com</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                  To continue, Google will share your name, email address, and language preference with Inbox Assistant.
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {selectedName.charAt(0)}
                  </div>
                  <span className="font-medium truncate">{selectedEmail}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Inbox Assistant wants to access your Google Account
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  This will allow Inbox Assistant to provide smart inbox triage and synthesis:
                </p>

                {/* Scopes list */}
                <div className="space-y-3 mb-6 bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">Read and summarize your email messages</span>
                      <p className="text-[11px] text-slate-500">Required to generate AI summaries and action item notifications.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">View email labels and thread metadata</span>
                      <p className="text-[11px] text-slate-500">Allows categorizing newsletters, receipts, and priority mail.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Shield className="w-3.5 h-3.5" /> Verified App ID #8921-Google
                  </span>
                  <button 
                    onClick={() => setStage('pick_account')} 
                    className="text-brand-600 hover:underline"
                  >
                    Switch account
                  </button>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={isAuthorizing}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isAuthorizing}
                    className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isAuthorizing ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Token...</span>
                      </>
                    ) : (
                      <span>Allow Access</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* MICROSOFT 365 OAUTH DIALOG */
          <div className="p-6 sm:p-7">
            {/* Microsoft Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M1 1h10v10H1z"/>
                  <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                  <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                  <path fill="#FFB900" d="M13 13h10v10H13z"/>
                </svg>
                <span className="font-semibold text-slate-800 text-sm">Microsoft Entra ID</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Graph API v1.0</span>
            </div>

            <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-medium truncate">{selectedEmail}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Permissions requested by Inbox Assistant
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Inbox Assistant is requesting permission to access your enterprise Microsoft 365 mailbox:
            </p>

            {/* Microsoft permissions */}
            <div className="space-y-3 mb-6 bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">Mail.Read</span>
                  <p className="text-[11px] text-slate-500">Read user mail and message folders in your Office 365 / Exchange account.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">offline_access</span>
                  <p className="text-[11px] text-slate-500">Maintain access to data you have granted it access to via secure refresh tokens.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">User.Read</span>
                  <p className="text-[11px] text-slate-500">View your basic profile information and corporate directory identifier.</p>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mb-6 leading-relaxed">
              Accepting these permissions gives Inbox Assistant the capability to sync email headers for AI prioritization according to your organization's compliance policy.
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onCancel}
                disabled={isAuthorizing}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={isAuthorizing}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                {isAuthorizing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Exchanging Tokens...</span>
                  </>
                ) : (
                  <span>Accept & Authorize</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

