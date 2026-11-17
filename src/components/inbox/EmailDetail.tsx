import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Check, 
  AlertTriangle, 
  Clock, 
  Archive, 
  Trash2, 
  Reply, 
  MoreVertical, 
  FileText, 
  Download,
  Share2,
  ThumbsUp,
  RotateCw
} from 'lucide-react';
import { EmailMessage } from '../../types';

interface EmailDetailProps {
  email: EmailMessage | null;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email, onArchive, onDelete }) => {
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs text-slate-300 mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-700">No Email Selected</h3>
        <p className="text-xs text-slate-400 max-w-xs mt-1">
          Select an email from the left pane to view the thread and AI-generated summary.
        </p>
      </div>
    );
  }

  const handleUseSuggestedReply = () => {
    if (email.aiSummary?.suggestedReply) {
      setReplyText(email.aiSummary.suggestedReply);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setReplySuccess(true);
      setReplyText('');
      setTimeout(() => setReplySuccess(false), 3500);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Top Toolbar */}
      <div className="px-6 py-3 border-b border-slate-200/80 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onArchive(email.id)}
            title="Archive"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(email.id)}
            title="Move to Trash"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono">{email.date}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6 max-w-4xl">
        {/* Subject */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {email.subject}
          </h2>
        </div>

        {/* Sender Info Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {email.sender.avatar ? (
              <img
                src={email.sender.avatar}
                alt={email.sender.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm">
                {email.sender.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{email.sender.name}</span>
                <span className="text-xs text-slate-400 font-mono">&lt;{email.sender.email}&gt;</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                to {email.to.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* AI SMART EXECUTIVE SUMMARY CARD */}
        {email.aiSummary && (
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-brand-50/50 to-white border border-brand-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">AI Assistant Summary & Action Triage</h3>
              </div>

              {email.aiSummary.urgency === 'high' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Urgent
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  Normal Priority
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {email.aiSummary.overview}
            </p>

            {/* Action Item highlight */}
            {email.aiSummary.actionItem && (
              <div className="mt-3.5 p-3 rounded-xl bg-amber-500/10 border border-amber-300/80 text-xs text-amber-950 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900">Extracted Action Deliverable: </span>
                  <span>{email.aiSummary.actionItem}</span>
                </div>
              </div>
            )}

            {/* Key takeaways */}
            {email.aiSummary.keyTakeaways && email.aiSummary.keyTakeaways.length > 0 && (
              <div className="mt-3.5 pt-3 border-t border-brand-200/50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Key Takeaways
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {email.aiSummary.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Reply CTA */}
            {email.aiSummary.suggestedReply && (
              <div className="mt-4 pt-3 border-t border-brand-200/60 flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs text-brand-900 font-medium truncate max-w-md">
                  💡 <span className="text-slate-500">Draft suggestion:</span> "{email.aiSummary.suggestedReply.slice(0, 50)}..."
                </div>
                <button
                  type="button"
                  onClick={handleUseSuggestedReply}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Insert AI Reply Draft</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Email Body Content */}
        <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-line text-sm leading-relaxed font-normal">
          {email.body}
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Attachments ({email.attachments.length})
            </h4>
            <div className="flex flex-wrap gap-3">
              {email.attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors text-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">
                    {att.type}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{att.name}</div>
                    <div className="text-[11px] text-slate-400">{att.size}</div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading attachment: ${att.name}`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
                    title="Download attachment"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Reply Box */}
        <div className="pt-6 border-t border-slate-200">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold flex items-center gap-1.5">
                <Reply className="w-3.5 h-3.5 text-brand-600" />
                Reply to {email.sender.name}
              </span>
              {email.aiSummary?.suggestedReply && (
                <button
                  type="button"
                  onClick={handleUseSuggestedReply}
                  className="text-brand-600 hover:underline text-[11px] font-medium"
                >
                  Prefill with AI Suggestion
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply or click 'Insert AI Reply Draft' above..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
            />

            {replySuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                Reply sent successfully via {email.accountId.includes('msft') ? 'Microsoft Graph' : 'Gmail API'}!
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-slate-400">
                Encrypted outbound transmission
              </div>
              <button
                type="button"
                onClick={handleSendReply}
                disabled={isSending || !replyText.trim()}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

