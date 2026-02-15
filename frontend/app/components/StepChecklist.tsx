import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export interface Step {
  id: string;
  title: string;
  detail: string;
  completed?: boolean;
}

interface StepChecklistProps {
  steps: Step[];
  onStepToggle?: (stepId: string) => void;
}

export function StepChecklist({ steps, onStepToggle }: StepChecklistProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const handleCheckToggle = (stepId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onStepToggle?.(stepId);
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <Card 
          key={step.id}
          className="overflow-hidden hover:shadow-sm transition-shadow"
        >
          <button
            onClick={() => toggleStep(step.id)}
            className="w-full p-4 text-left flex items-start gap-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={(e) => handleCheckToggle(step.id, e)}
                className="flex-shrink-0"
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  <h4 className={step.completed ? 'line-through text-muted-foreground' : ''}>
                    {step.title}
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              {expandedSteps.has(step.id) ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>

          {expandedSteps.has(step.id) && (
            <div className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground pl-8">
                {step.detail}
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}