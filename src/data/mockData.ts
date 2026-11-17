import { EmailAccount, EmailMessage, SyncStage } from '../types';

export const INITIAL_SYNC_STAGES: SyncStage[] = [
  {
    id: 'oauth',
    label: 'Provider Authorization',
    detail: 'Exchanging security tokens with provider OAuth endpoint',
    status: 'pending'
  },
  {
    id: 'verify',
    label: 'Inbox Connection Handshake',
    detail: 'Verifying TLS encryption and IMAP/Graph API permissions',
    status: 'pending'
  },
  {
    id: 'folders',
    label: 'Structure & Label Mapping',
    detail: 'Mapping mailboxes: Inbox, Sent, Archive, and Labels',
    status: 'pending'
  },
  {
    id: 'indexing',
    label: 'Historical Mail Indexing',
    detail: 'Downloading recent headers and thread messages',
    status: 'pending'
  },
  {
    id: 'ai_triage',
    label: 'AI Categorization & Priority Engine',
    detail: 'Extracting key action items, deadlines, and smart summaries',
    status: 'pending'
  }
];

export const SAMPLE_GOOGLE_ACCOUNT: EmailAccount = {
  id: 'acc_gmail_01',
  provider: 'google',
  email: 'alex.chen@worksuite.io',
  displayName: 'Alex Chen (Work)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  status: 'connected',
  lastSyncedAt: 'Just now',
  totalEmails: 48,
  unreadCount: 4,
  syncProgress: 100,
  stages: INITIAL_SYNC_STAGES.map(s => ({ ...s, status: 'completed' }))
};

export const SAMPLE_MICROSOFT_ACCOUNT: EmailAccount = {
  id: 'acc_msft_02',
  provider: 'microsoft',
  email: 'alex.chen@contoso-enterprises.com',
  displayName: 'Alex Chen (Contoso 365)',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  status: 'connected',
  lastSyncedAt: '2 mins ago',
  totalEmails: 32,
  unreadCount: 2,
  syncProgress: 100,
  stages: INITIAL_SYNC_STAGES.map(s => ({ ...s, status: 'completed' }))
};

export const SAMPLE_EMAILS: EmailMessage[] = [
  {
    id: 'email_01',
    accountId: 'acc_gmail_01',
    sender: {
      name: 'Elena Rostova',
      email: 'elena.rostova@partner-ventures.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
    },
    to: ['alex.chen@worksuite.io'],
    subject: 'Urgent: Series A Term Sheet Feedback & Legal Rider Approval',
    snippet: 'Hey Alex, our legal team reviewed section 4.2 of the term sheet rider. We need your sign-off before Thursday 5 PM EST...',
    body: `Hi Alex,

Our legal counsel just completed their review of section 4.2 in the revised Series A term sheet rider. Overall, the terms are aligned with what we agreed in yesterday's call.

However, we need your confirmation on two specific points:
1. The Board observer appointment cadence (quarterly vs monthly).
2. The ESOP pool expansion timeline prior to the closing date.

Could you review the attached redline document and send over your explicit approval by Thursday at 5:00 PM EST? Our lead partner is prepared to execute immediately once this rider is cleared.

Thanks,
Elena Rostova
Partner | Partner Ventures
Office: +1 (415) 890-2100`,
    date: '10:42 AM',
    isRead: false,
    isStarred: true,
    folder: 'inbox',
    category: 'priority',
    aiSummary: {
      overview: 'Elena needs formal sign-off on 2 legal clauses (Board observer cadence & ESOP pool) for the Series A term sheet.',
      actionRequired: true,
      actionItem: 'Review attached redline and email approval before Thursday, 5:00 PM EST.',
      urgency: 'high',
      suggestedReply: 'Hi Elena, I reviewed the redline. We accept the quarterly observer cadence and pre-closing ESOP expansion. Please proceed with execution.',
      keyTakeaways: [
        'Deadline: Thursday at 5:00 PM EST',
        'Legal review completed with 2 clarifications needed',
        'Lead partner ready to execute once approved'
      ]
    },
    attachments: [
      { name: 'SeriesA_Rider_Redline_v3.pdf', size: '2.4 MB', type: 'PDF' }
    ]
  },
  {
    id: 'email_02',
    accountId: 'acc_gmail_01',
    sender: {
      name: 'DevOps & Cloud Alert',
      email: 'alerts@cloudops-monitor.io'
    },
    to: ['alex.chen@worksuite.io'],
    subject: '[Resolved] US-East-1 Database Latency Spike & Failover',
    snippet: 'Automated notification: Database latency returned to 12ms baseline after automated replica failover at 09:14 UTC...',
    body: `Incident Summary:
• Incident ID: INC-88219
• Service: Production PostgreSQL Cluster (us-east-1)
• Severity: Medium (Auto-remediated)
• Latency Peak: 840ms (09:08 UTC)
• Current Latency: 11.8ms (Nominal)

Automated health checks triggered a switchover to primary standby node db-prod-02b. All read/write transactions are processing normally. Zero data loss detected.

Post-mortem logs are aggregated in your monitoring dashboard.`,
    date: '9:15 AM',
    isRead: false,
    isStarred: false,
    folder: 'inbox',
    category: 'updates',
    aiSummary: {
      overview: 'CloudOps resolved the US-East-1 database latency spike via automated failover. Cluster is now healthy.',
      actionRequired: false,
      urgency: 'low',
      suggestedReply: 'Thanks for the alert, looks stable.',
      keyTakeaways: [
        'Automated failover successfully executed to standby db-prod-02b',
        'Latency back to nominal 11.8ms',
        'No data loss detected'
      ]
    }
  },
  {
    id: 'email_03',
    accountId: 'acc_msft_02',
    sender: {
      name: 'Marcus Brody',
      email: 'm.brody@enterprise-client.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    to: ['alex.chen@contoso-enterprises.com'],
    subject: 'Q3 Enterprise Deployment - Architecture Review Meeting',
    snippet: 'Alex, following up on our sync. Can your engineering lead join our security team next Tuesday at 2 PM to go over SSO and SOC2 compliance?',
    body: `Hello Alex,

Hope your week is going great.

Our Chief Information Security Officer (CISO) reviewed the security whitepaper you shared last Friday. She is generally pleased with the encryption at rest and role-based access policies.

Before we can sign the annual contract, our infosec committee requires a 30-minute technical review call. Could you and your lead architect join us next Tuesday (Oct 24) at 2:00 PM EST?

Please let me know if that time works or suggest an alternate slot.

Best regards,
Marcus Brody
VP of Technology Procurement`,
    date: 'Yesterday',
    isRead: true,
    isStarred: true,
    folder: 'inbox',
    category: 'priority',
    aiSummary: {
      overview: 'Client CISO approved initial whitepaper and requests a 30-min security review call next Tuesday at 2:00 PM EST before contract signing.',
      actionRequired: true,
      actionItem: 'Confirm availability for Tuesday 2 PM EST and invite lead security engineer.',
      urgency: 'medium',
      suggestedReply: 'Hi Marcus, Tuesday at 2:00 PM EST works perfectly. I will send a calendar invite including our Head of Security.',
      keyTakeaways: [
        'Security whitepaper cleared initial review',
        'Requires 30-min meeting before contract signing',
        'Proposed time: Next Tuesday at 2:00 PM EST'
      ]
    }
  },
  {
    id: 'email_04',
    accountId: 'acc_gmail_01',
    sender: {
      name: 'Stripe Billing',
      email: 'invoices@stripe.com'
    },
    to: ['alex.chen@worksuite.io'],
    subject: 'Invoice #INV-2026-9041 for OpenAI API Services ($1,420.50)',
    snippet: 'Your monthly invoice for OpenAI API Usage has been automatically settled via Visa ending in 4092...',
    body: `Receipt from OpenAI, LLC
Invoice #INV-2026-9041
Amount Paid: $1,420.50 USD
Date: November 16, 2026
Payment Method: Visa ending in 4092

Line Items:
- GPT-4.5 / Claude API tokens (Oct 16 - Nov 15): $1,280.00
- Embedding models & vector indexing: $140.50
Total: $1,420.50

Download your official PDF invoice or manage tax identification numbers in your billing settings.`,
    date: 'Nov 16',
    isRead: true,
    isStarred: false,
    folder: 'inbox',
    category: 'receipts',
    aiSummary: {
      overview: 'Stripe receipt for monthly OpenAI API usage ($1,420.50) successfully charged to corporate card.',
      actionRequired: false,
      urgency: 'low',
      keyTakeaways: [
        'Total charged: $1,420.50 USD',
        'Payment successful via Visa ending in 4092',
        'Tax invoice generated and stored'
      ]
    },
    attachments: [
      { name: 'Invoice_INV-2026-9041.pdf', size: '142 KB', type: 'PDF' }
    ]
  },
  {
    id: 'email_05',
    accountId: 'acc_msft_02',
    sender: {
      name: 'TechCrunch Daily Dispatch',
      email: 'newsletter@techcrunch.com'
    },
    to: ['alex.chen@contoso-enterprises.com'],
    subject: 'AI Agent Breakthroughs, New Autonomous Workflows, and Seed Rounds',
    snippet: 'Today in Tech: autonomous agents take center stage in enterprise software, plus new venture rounds in productivity tools...',
    body: `Welcome to TechCrunch Daily Dispatch.

Top Stories Today:
1. Autonomous AI Agents: Why enterprise software is shifting from chat interfaces to background execution systems.
2. The State of Seed Funding in Q3: Seed valuations remain strong while Series B hurdles rise.
3. Open Source LLMs: New benchmarks show efficient 8B parameter models rivaling last year's flagship weights.

Read the full analysis on techcrunch.com`,
    date: 'Nov 15',
    isRead: true,
    isStarred: false,
    folder: 'inbox',
    category: 'newsletters',
    aiSummary: {
      overview: 'Daily tech digest discussing AI enterprise agents, Q3 seed venture trends, and 8B parameter model benchmarks.',
      actionRequired: false,
      urgency: 'low',
      keyTakeaways: [
        'Focus on autonomous software agents',
        'Seed round valuations holding strong',
        'Lightweight LLM performance gains'
      ]
    }
  }
];

