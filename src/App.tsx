import React, { useState } from 'react';
import { 
  User, 
  EmailAccount, 
  EmailMessage, 
  ProviderType, 
  OnboardingStep 
} from './types';
import { 
  SAMPLE_GOOGLE_ACCOUNT, 
  SAMPLE_MICROSOFT_ACCOUNT, 
  SAMPLE_EMAILS,
  INITIAL_SYNC_STAGES 
} from './data/mockData';
import { BrandLogo } from './components/common/BrandLogo';
import { OnboardingStepper } from './components/onboarding/OnboardingStepper';
import { WelcomeAuthStep } from './components/onboarding/WelcomeAuthStep';
import { AuthorizeStep } from './components/onboarding/AuthorizeStep';
import { SyncStatusStep } from './components/onboarding/SyncStatusStep';
import { InboxApp } from './components/inbox/InboxApp';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr_demo',
    name: 'Alex Chen',
    email: 'alex.chen@worksuite.io',
    createdAt: new Date().toISOString()
  });

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('google');
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string>('');
  const [emails, setEmails] = useState<EmailMessage[]>(SAMPLE_EMAILS);
  const [currentSyncingAccount, setCurrentSyncingAccount] = useState<EmailAccount | null>(null);

  // STEP 1: User selects provider or 1-click demo -> Goes STRAIGHT to Authorize Page
  const handleSelectProvider = (provider: ProviderType, name: string, email: string) => {
    setSelectedProvider(provider);
    setCurrentUser({
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      createdAt: new Date().toISOString()
    });
    setCurrentStep('authorizing');
  };

  // STEP 2: User approves authorization -> Goes to Authorizing/Syncing status page
  const handleAuthorizeApproved = () => {
    const newAccount: EmailAccount = {
      id: selectedProvider === 'google' ? 'acc_gmail_01' : 'acc_msft_02',
      provider: selectedProvider,
      email: currentUser.email,
      displayName: `${currentUser.name} (${selectedProvider === 'google' ? 'Gmail' : 'Microsoft'})`,
      status: 'syncing',
      lastSyncedAt: 'Just now',
      totalEmails: selectedProvider === 'google' ? 48 : 32,
      unreadCount: selectedProvider === 'google' ? 4 : 2,
      syncProgress: 0,
      stages: INITIAL_SYNC_STAGES.map((s) => ({ ...s }))
    };

    setCurrentSyncingAccount(newAccount);
    setCurrentStep('syncing');
  };

  // STEP 3: Sync Completed -> Goes directly into the Inbox
  const handleSyncComplete = () => {
    if (currentSyncingAccount) {
      const completedAccount: EmailAccount = {
        ...currentSyncingAccount,
        status: 'connected',
        syncProgress: 100
      };

      setAccounts((prev) => {
        const exists = prev.find((a) => a.id === completedAccount.id);
        if (exists) return prev.map((a) => (a.id === completedAccount.id ? completedAccount : a));
        return [...prev, completedAccount];
      });

      setActiveAccountId(completedAccount.id);
    } else {
      setAccounts([SAMPLE_GOOGLE_ACCOUNT]);
      setActiveAccountId(SAMPLE_GOOGLE_ACCOUNT.id);
    }
    setCurrentStep('completed');
  };

  // Reset Onboarding Tour to re-test anytime
  const handleRestartOnboarding = () => {
    setCurrentStep('welcome');
  };

  // Connect another account
  const handleConnectAnother = () => {
    setCurrentStep('welcome');
  };

  // If Onboarding is completed, render the full Inbox App
  if (currentStep === 'completed' && accounts.length > 0) {
    return (
      <InboxApp
        currentUser={currentUser}
        accounts={accounts}
        emails={emails}
        activeAccountId={activeAccountId}
        onSelectAccount={setActiveAccountId}
        onAddAnotherAccount={handleConnectAnother}
        onRestartOnboarding={handleRestartOnboarding}
        onUpdateEmails={setEmails}
      />
    );
  }

  // Streamlined 3-step Onboarding (Connect -> Authorize -> Syncing -> Inbox)
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xs">
        <BrandLogo size="sm" showTagline={false} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAccounts([SAMPLE_GOOGLE_ACCOUNT, SAMPLE_MICROSOFT_ACCOUNT]);
              setActiveAccountId(SAMPLE_GOOGLE_ACCOUNT.id);
              setCurrentStep('completed');
            }}
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Skip to Inbox →
          </button>
        </div>
      </header>

      {/* Understated Stepper: Connect -> Authorize -> Sync */}
      {currentStep !== 'welcome' && (
        <OnboardingStepper currentStep={currentStep} />
      )}

      {/* Main Flow: Exactly 2 screens before Inbox! */}
      <main className="flex-1 flex flex-col justify-center">
        {/* Step 1: Sign in / Select provider */}
        {currentStep === 'welcome' && (
          <WelcomeAuthStep onSelectProvider={handleSelectProvider} />
        )}

        {/* Step 2: The Authorize Page */}
        {currentStep === 'authorizing' && (
          <AuthorizeStep
            provider={selectedProvider}
            accountName={currentUser.name}
            accountEmail={currentUser.email}
            onAuthorize={handleAuthorizeApproved}
            onBack={() => setCurrentStep('welcome')}
          />
        )}

        {/* Step 3: Authorizing & Syncing Status */}
        {currentStep === 'syncing' && currentSyncingAccount && (
          <SyncStatusStep
            account={currentSyncingAccount}
            onSyncComplete={handleSyncComplete}
            onConnectAnother={handleConnectAnother}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400">
        Inbox Assistant
      </footer>
    </div>
  );
};

export default App;
