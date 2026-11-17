import React from 'react';
import { Check } from 'lucide-react';
import { OnboardingStep } from '../../types';

interface OnboardingStepperProps {
  currentStep: OnboardingStep;
}

const STEPS = [
  { key: 'welcome', label: 'Connect' },
  { key: 'authorizing', label: 'Authorize' },
  { key: 'syncing', label: 'Sync' },
  { key: 'completed', label: 'Inbox' }
];

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ currentStep }) => {
  const getStepIndex = (step: OnboardingStep): number => {
    switch (step) {
      case 'welcome': return 0;
      case 'authorizing': return 1;
      case 'syncing': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="w-full border-b border-slate-100 bg-white/50 backdrop-blur-xs py-2.5 px-4">
      <div className="max-w-xs mx-auto flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${
                    isDone
                      ? 'bg-slate-900 text-white'
                      : isCurrent
                      ? 'bg-slate-900 text-white ring-2 ring-slate-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[2.5]" /> : idx + 1}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isCurrent ? 'text-slate-900 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="flex-1 mx-2 h-[1px] bg-slate-200 mb-3" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
