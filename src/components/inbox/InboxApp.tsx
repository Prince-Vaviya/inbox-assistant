import React, { useState } from 'react';
import { 
  EmailAccount, 
  EmailMessage, 
  User, 
  ProviderType 
} from '../../types';
import { InboxSidebar } from './InboxSidebar';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { AccountSettingsModal } from './AccountSettingsModal';
import { Sparkles, Plus, Bell, Check, RotateCcw } from 'lucide-react';

interface InboxAppProps {
  currentUser: User;
  accounts: EmailAccount[];
  emails: EmailMessage[];
  activeAccountId: string;
  onSelectAccount: (id: string) => void;
  onAddAnotherAccount: () => void;
  onRestartOnboarding: () => void;
  onUpdateEmails: (emails: EmailMessage[]) => void;
}

export const InboxApp: React.FC<InboxAppProps> = ({
  currentUser,
  accounts,
  emails,
  activeAccountId,
  onSelectAccount,
  onAddAnotherAccount,
  onRestartOnboarding,
  onUpdateEmails
}) => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(emails[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0];

  // Filter emails based on account, folder, category, search, and activeFilter
  const filteredEmails = emails.filter((item) => {
    // Account match (or show all if multi-inbox)
    if (activeAccount && item.accountId !== activeAccount.id && accounts.length > 1) {
      // In single account view mode, show emails belonging to that account
      // or if user wants combined, we can show matching account
      if (item.accountId !== activeAccount.id) return false;
    }

    // Category filter from sidebar or chips
    const effectiveCategory = activeFilter || selectedCategory;
    if (effectiveCategory && item.category !== effectiveCategory) {
      return false;
    }

    // Folder filter
    if (!effectiveCategory) {
      if (selectedFolder === 'starred' && !item.isStarred) return false;
      if (selectedFolder === 'archive' && !item.isArchived) return false;
      if (selectedFolder === 'inbox' && item.isArchived) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSender = item.sender.name.toLowerCase().includes(q) || item.sender.email.toLowerCase().includes(q);
      const matchSubject = item.subject.toLowerCase().includes(q);
      const matchSnippet = item.snippet.toLowerCase().includes(q);
      const matchAction = item.aiSummary?.actionItem?.toLowerCase().includes(q);
      if (!matchSender && !matchSubject && !matchSnippet && !matchAction) return false;
    }

    return true;
  });

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || null;

  // Actions
  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateEmails(
      emails.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateEmails(
      emails.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  const handleArchive = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onUpdateEmails(
      emails.map((m) => (m.id === id ? { ...m, isArchived: true, folder: 'archive' } : m))
    );
  };

  const handleDelete = (id: string) => {
    onUpdateEmails(emails.filter((m) => m.id !== id));
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast(`Mailbox synced with ${activeAccount?.provider === 'google' ? 'Google' : 'Microsoft'} API (48 items up to date)`);
      setTimeout(() => setSyncToast(null), 3500);
    }, 1100);
  };

  const unreadCount = emails.filter((e) => !e.isRead && e.accountId === activeAccountId).length;
  const priorityCount = emails.filter((e) => e.category === 'priority' && e.accountId === activeAccountId).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Sidebar */}
      <InboxSidebar
        currentUser={currentUser}
        accounts={accounts}
        activeAccountId={activeAccountId}
        onSelectAccount={onSelectAccount}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveFilter(cat);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onRestartOnboarding={onRestartOnboarding}
        onAddAccount={onAddAnotherAccount}
        unreadCount={unreadCount}
        priorityCount={priorityCount}
      />

      {/* Main Mail Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-extrabold text-slate-900 capitalize flex items-center gap-2">
              <span>{selectedCategory ? `${selectedCategory} Messages` : selectedFolder}</span>
              <span className="text-[11px] font-normal text-slate-400">
                ({filteredEmails.length} messages)
              </span>
            </h1>
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-3">
            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-100">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Authenticated
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Multi-Pane Body: Email List + Email Detail */}
        <div className="flex-1 flex overflow-hidden">
          <EmailList
            emails={filteredEmails}
            selectedEmailId={selectedEmail?.id || null}
            onSelectEmail={(id) => {
              setSelectedEmailId(id);
              // mark read automatically
              onUpdateEmails(
                emails.map((e) => (e.id === id ? { ...e, isRead: true } : e))
              );
            }}
            onToggleStar={handleToggleStar}
            onToggleRead={handleToggleRead}
            onArchive={handleArchive}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <EmailDetail
            email={selectedEmail}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Account Settings Modal */}
      <AccountSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        accounts={accounts}
        activeAccountId={activeAccountId}
        onSelectAccount={onSelectAccount}
        onAddAnotherAccount={onAddAnotherAccount}
        onDisconnectAccount={(id) => {
          if (accounts.length <= 1) return;
          const remaining = accounts.filter((a) => a.id !== id);
          if (activeAccountId === id && remaining.length > 0) {
            onSelectAccount(remaining[0].id);
          }
        }}
        onSyncAccount={() => handleManualSync()}
      />
    </div>
  );
};

