import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChatInterface } from '../components/ChatInterface';
import { StepChecklist, Step } from '../components/StepChecklist';
import { ResourceCard, Resource } from '../components/ResourceCard';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertCircle } from 'lucide-react';

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
    name: 'Legal Aid of North Carolina',
    category: 'Legal',
    city: 'Raleigh',
    phone: '(919) 856-2564',
    address: '224 S Dawson St, Raleigh, NC 27601',
    verified: true,
    description: 'Free legal assistance for low-income individuals',
  },
  {
    id: '3',
    name: 'Catholic Charities Immigration Services',
    category: 'Legal',
    city: 'Raleigh',
    phone: '(919) 841-8460',
    address: '400 E Six Forks Rd, Raleigh, NC 27609',
    verified: true,
    description: 'Immigration legal services and consultations',
  },
  {
    id: '4',
    name: 'IRS Taxpayer Assistance Center',
    category: 'Taxes',
    city: 'Raleigh',
    phone: '(844) 545-5640',
    address: '310 New Bern Ave, Raleigh, NC 27601',
    verified: true,
    description: 'Free tax help and ITIN applications',
  },
  {
    id: '5',
    name: 'El Centro Hispano',
    category: 'Community',
    city: 'Durham',
    phone: '(919) 687-4635',
    address: '2000 Chapel Hill Rd, Durham, NC 27707',
    verified: true,
    description: 'Community support, ESL classes, job assistance',
  },
  {
    id: '6',
    name: 'Wake County Housing Authority',
    category: 'Housing',
    city: 'Raleigh',
    phone: '(919) 856-7100',
    address: '3805 Beryl Rd, Raleigh, NC 27610',
    verified: false,
    description: 'Affordable housing programs and assistance',
  },
];

export function DashboardScreen() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
  ]);

  const handleStepToggle = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const handlePromptClick = (prompt: string) => {
    // Update steps based on the prompt
    if (prompt.toLowerCase().includes('health') || prompt.toLowerCase().includes('salud')) {
      navigate('/guide/health-insurance');
    } else if (prompt.toLowerCase().includes('accident') || prompt.toLowerCase().includes('accidente')) {
      navigate('/guide/car-accident');
    }
  };

  const filteredResources = mockResources.filter(resource => {
    const cityMatch = selectedCity === 'all' || resource.city === selectedCity;
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    return cityMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 p-6 h-screen">
        {/* Left Column - Chat */}
        <div className="flex flex-col min-h-0">
          <ChatInterface onPromptClick={handlePromptClick} />
        </div>

        {/* Right Column - Steps & Resources */}
        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Steps Panel */}
          <Card className="p-6">
            <h3 className="mb-4">{t('dashboard.steps.title')}</h3>
            <StepChecklist steps={steps} onStepToggle={handleStepToggle} />
          </Card>

          {/* Resources Panel */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>{t('dashboard.resources.title')}</h3>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                {language === 'en' ? 'English' : 'Español'}
              </Badge>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder={t('dashboard.filter.city')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('dashboard.filter.all')}</SelectItem>
                  <SelectItem value="Raleigh">{t('city.raleigh')}</SelectItem>
                  <SelectItem value="Durham">{t('city.durham')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('dashboard.filter.category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('dashboard.filter.all')}</SelectItem>
                  <SelectItem value="Healthcare">{t('category.healthcare')}</SelectItem>
                  <SelectItem value="Legal">{t('category.legal')}</SelectItem>
                  <SelectItem value="Taxes">{t('category.taxes')}</SelectItem>
                  <SelectItem value="Housing">{t('category.housing')}</SelectItem>
                  <SelectItem value="Community">{t('category.community')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No resources found matching your filters.</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="p-4 space-y-4">
          {/* Chat Section */}
          <div className="h-[500px]">
            <ChatInterface onPromptClick={handlePromptClick} />
          </div>

          {/* Steps Section */}
          <Card className="p-4">
            <h3 className="mb-4">{t('dashboard.steps.title')}</h3>
            <StepChecklist steps={steps} onStepToggle={handleStepToggle} />
          </Card>

          {/* Resources Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3>{t('dashboard.resources.title')}</h3>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                {language === 'en' ? 'English' : 'Español'}
              </Badge>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder={t('dashboard.filter.city')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('dashboard.filter.all')}</SelectItem>
                  <SelectItem value="Raleigh">{t('city.raleigh')}</SelectItem>
                  <SelectItem value="Durham">{t('city.durham')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('dashboard.filter.category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('dashboard.filter.all')}</SelectItem>
                  <SelectItem value="Healthcare">{t('category.healthcare')}</SelectItem>
                  <SelectItem value="Legal">{t('category.legal')}</SelectItem>
                  <SelectItem value="Taxes">{t('category.taxes')}</SelectItem>
                  <SelectItem value="Housing">{t('category.housing')}</SelectItem>
                  <SelectItem value="Community">{t('category.community')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No resources found matching your filters.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}