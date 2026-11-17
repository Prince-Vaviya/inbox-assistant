export type ProviderType = 'google' | 'microsoft' | 'imap';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'authorizing' | 'syncing' | 'connected' | 'error';

export interface SyncStage {
  id: string;
  label: string;
  detail: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface EmailAccount {
  id: string;
  provider: ProviderType;
  email: string;
  displayName: string;
  avatar?: string;
  status: ConnectionStatus;
  lastSyncedAt: string;
  totalEmails: number;
  unreadCount: number;
  syncProgress: number; // 0 - 100
  stages: SyncStage[];
}

export interface AISummary {
  overview: string;
  actionRequired: boolean;
  actionItem?: string;
  suggestedReply?: string;
  urgency: 'low' | 'medium' | 'high';
  keyTakeaways: string[];
}

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
}

export interface EmailMessage {
  id: string;
  accountId: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: string[];
  subject: string;
  snippet: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived?: boolean;
  folder: 'inbox' | 'starred' | 'sent' | 'archive' | 'trash';
  category: 'priority' | 'updates' | 'newsletters' | 'receipts';
  aiSummary: AISummary;
  attachments?: EmailAttachment[];
}

export type OnboardingStep = 
  | 'welcome'          // Step 1: Sign In / Provider Selection
  | 'authorizing'      // Step 2: Authorize Permissions Page
  | 'syncing'          // Step 3: Authorizing & Syncing Status
  | 'completed';       // Step 4: Inbox

