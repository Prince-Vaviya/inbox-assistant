import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Cloud, Clock } from 'lucide-react';
import { ConnectionStatus } from '../../types';

interface SyncStatusBadgeProps {
  status: ConnectionStatus;
  lastSyncedAt: string;
  onManualSync: () => void;
  isSyncing?: boolean;
}

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({
  status,
  lastSyncedAt,
  onManualSync,
  isSyncing = false
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {isSyncing ? (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          ) : (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isSyncing ? 'bg-blue-600' : 'bg-emerald-500'}`} />
        </span>
        <span className="font-semibold text-slate-800">
          {isSyncing ? 'Syncing...' : 'Live Synced'}
        </span>
      </div>

      <span className="text-slate-300">|</span>

      <span className="text-[11px] text-slate-500 hidden sm:inline flex items-center gap-1">
        <Clock className="w-3 h-3 text-slate-400" />
        {lastSyncedAt}
      </span>

      <button
        type="button"
        onClick={onManualSync}
        disabled={isSyncing}
        title="Trigger instant mailbox synchronization"
        className="p-1 rounded-md text-slate-500 hover:text-brand-600 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-600' : ''}`} />
      </button>
    </div>
  );
};

