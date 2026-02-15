import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { StepChecklist, Step } from '../components/StepChecklist';
import { ResourceCard, Resource } from '../components/ResourceCard';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from '../components/ui/badge';

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Lincoln Community Health Center',
    category: 'Healthcare',
    city: 'Durham',
    phone: '(919) 956-4000',
    address: '1301 Fayetteville St, Durham, NC 27707',
    verified: true,
    description: 'Affordable primary care, accepts uninsured patients',
  },
  {
    id: '2',
    name: 'Wake County Human Services',
    category: 'Healthcare',
    city: 'Raleigh',
    phone: '(919) 250-3100',
    address: '220 Swinburne St, Raleigh, NC 27610',
    verified: true,
    description: 'Medicaid enrollment assistance',
  },
  {
    id: '3',
    name: 'Healthcare.gov Navigator',
    category: 'Healthcare',
    city: 'Raleigh',
    phone: '1-800-318-2596',
    verified: true,
    description: 'Free enrollment help in multiple languages',
  },
];

export function HealthInsuranceGuide() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      title: t('guide.health.step1'),
      detail: t('guide.health.step1.detail'),
      completed: false,
    },
    {
      id: '2',
      title: t('guide.health.step2'),
      detail: t('guide.health.step2.detail'),
      completed: false,
    },
    {
      id: '3',
      title: t('guide.health.step3'),
      detail: t('guide.health.step3.detail'),
      completed: false,
    },
    {
      id: '4',
      title: t('guide.health.step4'),
      detail: t('guide.health.step4.detail'),
      completed: false,
    },
    {
      id: '5',
      title: t('guide.health.step5'),
      detail: t('guide.health.step5.detail'),
      completed: false,
    },
  ]);

  const handleStepToggle = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedSteps = steps.filter(s => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                {t('common.save')}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t('common.share')}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🏥</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="mb-1">{t('guide.health.title')}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t('common.step')} {completedSteps} {t('common.of')} {steps.length}</span>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700">
                  {t('category.healthcare')}
                </Badge>
              </div>
            </div>
          </div>

          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Step-by-Step Guide</h3>
              <StepChecklist steps={steps} onStepToggle={handleStepToggle} />
            </Card>

            {/* Disclaimer */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <p className="text-sm text-amber-900">
                ⚠️ {t('common.disclaimer')}
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Recommended Resources</h3>
              <div className="space-y-3">
                {mockResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Call the Healthcare Marketplace at 1-800-318-2596 for free enrollment assistance in your language.
              </p>
              <Button className="w-full" onClick={() => window.location.href = 'tel:1-800-318-2596'}>
                Call Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}