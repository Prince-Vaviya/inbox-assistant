import React, { useEffect, useState } from 'react';
import { 
  Check, 
  Loader2, 
  ArrowRight
} from 'lucide-react';
import { EmailAccount, SyncStage } from '../../types';

interface SyncStatusStepProps {
  account: EmailAccount;
  onSyncComplete: () => void;
  onConnectAnother: () => void;
}

export const SyncStatusStep: React.FC<SyncStatusStepProps> = ({
  account,
  onSyncComplete
}) => {
  const [progress, setProgress] = useState(20);
  const [isDone, setIsDone] = useState(false);
  const [stages, setStages] = useState<SyncStage[]>([
    {
      id: 'oauth',
      label: 'Security handshake',
      detail: `Verified with ${account.provider === 'google' ? 'Google' : 'Microsoft'}`,
      status: 'completed'
    },
    {
      id: 'verify',
      label: 'Mailbox connection',
      detail: 'TLS encryption active',
      status: 'in_progress'
    },
    {
      id: 'folders',
      label: 'Mailbox structure',
      detail: 'Folders and labels mapped',
      status: 'pending'
    },
    {
      id: 'indexing',
      label: 'Indexing messages',
      detail: 'Historical threads indexed',
      status: 'pending'
    },
    {
      id: 'ai_triage',
      label: 'AI triage & summaries',
      detail: 'Action items extracted',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }

        const next = prev + 8;

        if (next >= 40 && next < 65) {
          setStages((s) =>
            s.map((st, i) => (i <= 1 ? { ...st, status: 'completed' } : i === 2 ? { ...st, status: 'in_progress' } : st))
          );
        } else if (next >= 65 && next < 90) {
          setStages((s) =>
            s.map((st, i) => (i <= 2 ? { ...st, status: 'completed' } : i === 3 ? { ...st, status: 'in_progress' } : st))
          );
        } else if (next >= 90) {
          setStages((s) =>
            s.map((st, i) => (i <= 3 ? { ...st, status: 'completed' } : i === 4 ? { ...st, status: 'in_progress' } : st))
          );
        }

        if (next >= 100) {
          setStages((s) => s.map((st) => ({ ...st, status: 'completed' })));
          setIsDone(true);
        }

        return next;
      });
    }, 250);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[460px] mx-auto px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {isDone ? 'Inbox connected' : 'Connecting mailbox'}
        </h2>
        <p className="text-xs text-slate-500 mt-2 font-mono">
          {account.email}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2.5">
            <span>{isDone ? 'Synchronization complete' : 'Synchronizing...'}</span>
            <span className="font-mono text-slate-900 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stages Checklist with comfortable line spacing */}
        <div className="space-y-3 pt-2">
          {stages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isInProgress = stage.status === 'in_progress';

            return (
              <div
                key={stage.id}
                className="flex items-center justify-between text-xs py-1"
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : isInProgress ? (
                    <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-200 shrink-0" />
                  )}
                  <span className={`${isCompleted || isInProgress ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                    {stage.label}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-normal">
                  {stage.detail}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onSyncComplete}
            disabled={!isDone}
            className="w-full h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{isDone ? 'Open Inbox' : 'Finishing sync...'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
