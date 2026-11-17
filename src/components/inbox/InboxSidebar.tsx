import React from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  Archive, 
  Trash2, 
  Zap, 
  Bell, 
  Newspaper, 
  Receipt, 
  Settings, 
  RotateCcw, 
  Plus, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EmailAccount, User } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface InboxSidebarProps {
  currentUser: User;
  accounts: EmailAccount[];
  activeAccountId: string;
  onSelectAccount: (id: string) => void;
  selectedFolder: string;
  onSelectFolder: (folder: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onOpenSettings: () => void;
  onRestartOnboarding: () => void;
  onAddAccount: () => void;
  unreadCount: number;
  priorityCount: number;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({
  currentUser,
  accounts,
  activeAccountId,
  onSelectAccount,
  selectedFolder,
  onSelectFolder,
  selectedCategory,
  onSelectCategory,
  onOpenSettings,
  onRestartOnboarding,
  onAddAccount,
  unreadCount,
  priorityCount
}) => {
  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0];

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: unreadCount },
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const smartCategories = [
    { id: 'priority', label: 'Action & Priority', icon: Zap, count: priorityCount, color: 'text-amber-500 bg-amber-50' },
    { id: 'updates', label: 'System Updates', icon: Bell, color: 'text-blue-500 bg-blue-50' },
    { id: 'newsletters', label: 'Newsletters', icon: Newspaper, color: 'text-purple-500 bg-purple-50' },
    { id: 'receipts', label: 'Receipts & Billing', icon: Receipt, color: 'text-emerald-500 bg-emerald-50' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/80">
        <BrandLogo size="sm" showTagline={false} />
      </div>

      {/* Account Switcher Widget */}
      <div className="p-3 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0">
                {activeAccount?.provider === 'google' ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                )}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {activeAccount?.displayName || 'Connected Mailbox'}
                </div>
                <div className="text-[10px] text-slate-500 truncate font-mono">
                  {activeAccount?.email}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={onAddAccount}
                className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Add Another Account"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenSettings}
                className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Account Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
        {/* Core Mail Folders */}
        <div>
          <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Mailboxes
          </div>
          <div className="space-y-0.5">
            {folders.map((folder) => {
              const Icon = folder.icon;
              const isSelected = selectedFolder === folder.id && selectedCategory === null;

              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    onSelectFolder(folder.id);
                    onSelectCategory(null);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{folder.label}</span>
                  </div>
                  {folder.count !== undefined && folder.count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {folder.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Smart Categories */}
        <div>
          <div className="px-2 mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI Smart Triage
            </span>
          </div>
          <div className="space-y-0.5">
            {smartCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${cat.id === 'priority' ? 'text-amber-500' : 'text-slate-400'}`} />
                    <span>{cat.label}</span>
                  </div>
                  {cat.count !== undefined && cat.count > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-white">
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 space-y-2">
        <button
          onClick={onRestartOnboarding}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-brand-600 bg-white border border-slate-200 rounded-xl hover:border-brand-300 hover:bg-brand-50/30 transition-all shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Onboarding Tour</span>
        </button>

        <div className="flex items-center justify-between px-2 text-[10px] text-slate-400">
          <span>Inbox Assistant 2.0</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3 h-3" /> Secure
          </span>
        </div>
      </div>
    </aside>
  );
};

