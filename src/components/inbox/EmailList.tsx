import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Mail, 
  MailOpen, 
  Paperclip, 
  Zap, 
  AlertCircle,
  Filter
} from 'lucide-react';
import { EmailMessage } from '../../types';

interface EmailListProps {
  emails: EmailMessage[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleRead: (id: string, e: React.MouseEvent) => void;
  onArchive: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmailId,
  onSelectEmail,
  onToggleStar,
  onToggleRead,
  onArchive,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="w-96 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
      {/* Top Search Bar */}
      <div className="p-3 border-b border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search emails, senders, AI actions..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-[11px]">
          <button
            onClick={() => onFilterChange(null)}
            className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === null
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Messages ({emails.length})
          </button>
          <button
            onClick={() => onFilterChange('priority')}
            className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'priority'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Zap className="w-3 h-3" />
            Priority
          </button>
          <button
            onClick={() => onFilterChange('updates')}
            className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'updates'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Updates
          </button>
          <button
            onClick={() => onFilterChange('receipts')}
            className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'receipts'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Receipts
          </button>
        </div>
      </div>

      {/* Email Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {emails.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No emails match your filter or search criteria.
          </div>
        ) : (
          emails.map((email) => {
            const isSelected = email.id === selectedEmailId;

            return (
              <div
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                className={`group p-3.5 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-brand-50/70 border-l-4 border-l-brand-600'
                    : !email.isRead
                    ? 'bg-white font-medium hover:bg-slate-50/80 border-l-4 border-l-transparent'
                    : 'bg-slate-50/30 hover:bg-slate-50 border-l-4 border-l-transparent text-slate-600'
                }`}
              >
                {/* Header: Sender, Star, Date */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 overflow-hidden pr-2">
                    {!email.isRead && (
                      <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                    )}
                    <span
                      className={`text-xs truncate ${
                        !email.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                      }`}
                    >
                      {email.sender.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {email.date}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => onToggleStar(email.id, e)}
                      className="text-slate-300 hover:text-amber-400 p-0.5 cursor-pointer"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          email.isStarred ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <h4
                  className={`text-xs mb-1 line-clamp-1 ${
                    !email.isRead ? 'font-bold text-slate-900' : 'text-slate-800'
                  }`}
                >
                  {email.subject}
                </h4>

                {/* Snippet */}
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {email.snippet}
                </p>

                {/* Bottom Tags / AI Badge */}
                <div className="mt-2 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {email.aiSummary?.actionRequired && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Action Needed
                      </span>
                    )}

                    {email.category === 'priority' && !email.aiSummary?.actionRequired && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        <Zap className="w-2.5 h-2.5" />
                        Priority
                      </span>
                    )}

                    {email.category === 'receipts' && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Receipt
                      </span>
                    )}

                    {email.attachments && email.attachments.length > 0 && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <Paperclip className="w-3 h-3" />
                        {email.attachments.length}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <button
                      onClick={(e) => onToggleRead(email.id, e)}
                      title={email.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                    >
                      {email.isRead ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={(e) => onArchive(email.id, e)}
                      title="Archive Email"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

