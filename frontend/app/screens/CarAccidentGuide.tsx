import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Share2, Languages, MapPin, Stethoscope } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { StepChecklist, Step } from '../components/StepChecklist';
import { ResourceCard, Resource } from '../components/ResourceCard';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'WakeMed Emergency Department',
    category: 'Emergency',
    city: 'Raleigh',
    phone: '(919) 350-8000',
    address: '3000 New Bern Ave, Raleigh, NC 27610',
    verified: true,
    description: '24/7 emergency care',
  },
  {
    id: '2',
    name: 'Legal Aid of North Carolina',
    category: 'Legal',
    city: 'Raleigh',
    phone: '(919) 856-2564',
    address: '224 S Dawson St, Raleigh, NC 27601',
    verified: true,
    description: 'Free legal assistance for accident victims',
  },
  {
    id: '3',
    name: 'Duke Urgent Care',
    category: 'Healthcare',
    city: 'Durham',
    phone: '(919) 660-0000',
    address: '3643 N Roxboro St, Durham, NC 27704',
    verified: true,
    description: 'Non-emergency medical care',
  },
];

const englishPhrases = [
  { en: "I've been in a car accident", es: "He tenido un accidente de auto" },
  { en: "I need help", es: "Necesito ayuda" },
  { en: "Call the police", es: "Llame a la policía" },
  { en: "I need an ambulance", es: "Necesito una ambulancia" },
  { en: "Are you hurt?", es: "¿Estás herido?" },
  { en: "Exchange insurance information", es: "Intercambiar información de seguro" },
];

export function CarAccidentGuide() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      title: t('guide.accident.step1'),
      detail: t('guide.accident.step1.detail'),
      completed: false,
    },
    {
      id: '2',
      title: t('guide.accident.step2'),
      detail: t('guide.accident.step2.detail'),
      completed: false,
    },
    {
      id: '3',
      title: t('guide.accident.step3'),
      detail: t('guide.accident.step3.detail'),
      completed: false,
    },
    {
      id: '4',
      title: t('guide.accident.step4'),
      detail: t('guide.accident.step4.detail'),
      completed: false,
    },
    {
      id: '5',
      title: t('guide.accident.step5'),
      detail: t('guide.accident.step5.detail'),
      completed: false,
    },
    {
      id: '6',
      title: t('guide.accident.step6'),
      detail: t('guide.accident.step6.detail'),
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
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🚗</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="mb-1">{t('guide.accident.title')}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t('common.step')} {completedSteps} {t('common.of')} {steps.length}</span>
                <Badge variant="outline" className="bg-red-100 text-red-700">
                  {t('category.emergency')}
                </Badge>
              </div>
            </div>
          </div>

          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        <EmergencyBanner message={t('guide.accident.emergency')} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Step-by-Step Guide</h3>
              <StepChecklist steps={steps} onStepToggle={handleStepToggle} />
            </Card>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-3 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                    <Languages className="w-6 h-6" />
                    <span className="text-sm">{t('guide.accident.translate')}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Helpful Phrases / Frases Útiles</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {englishPhrases.map((phrase, index) => (
                      <Card key={index} className="p-4">
                        <p className="font-medium mb-1">🇺🇸 {phrase.en}</p>
                        <p className="text-muted-foreground">🇪🇸 {phrase.es}</p>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => window.open('https://maps.google.com/?q=urgent+care+near+me', '_blank')}
              >
                <Stethoscope className="w-6 h-6" />
                <span className="text-sm">{t('guide.accident.urgentcare')}</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => window.open('https://maps.google.com/?q=legal+aid+near+me', '_blank')}
              >
                <MapPin className="w-6 h-6" />
                <span className="text-sm">{t('guide.accident.legalaid')}</span>
              </Button>
            </div>

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
              <h3 className="mb-4">Emergency Resources</h3>
              <div className="space-y-3">
                {mockResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="mb-2">Document Checklist</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Driver's license and registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Insurance card</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Photos of damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Police report number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Other driver's information</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}