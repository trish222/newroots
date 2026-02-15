import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, Heart, Car, Scale, Calculator, Home as HomeIcon, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const guides = [
  {
    id: 'health-insurance',
    path: '/guide/health-insurance',
    titleKey: 'guide.health.title',
    icon: Heart,
    category: 'category.healthcare',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'car-accident',
    path: '/guide/car-accident',
    titleKey: 'guide.accident.title',
    icon: Car,
    category: 'category.emergency',
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'legal-help',
    path: '/guides',
    titleKey: 'Legal Rights & Immigration',
    icon: Scale,
    category: 'category.legal',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'taxes',
    path: '/guides',
    titleKey: 'Filing Taxes & ITIN',
    icon: Calculator,
    category: 'category.taxes',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'housing',
    path: '/guides',
    titleKey: 'Finding Housing',
    icon: HomeIcon,
    category: 'category.housing',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'community',
    path: '/guides',
    titleKey: 'Community Resources',
    icon: Users,
    category: 'category.community',
    color: 'bg-pink-100 text-pink-700',
  },
];

export function GuidesScreen() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">{t('nav.guides')}</h1>
          <p className="text-muted-foreground">
            Step-by-step help for important life tasks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card
                key={guide.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(guide.path)}
              >
                <div className={`w-12 h-12 rounded-lg ${guide.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="mb-2">
                  {guide.titleKey.startsWith('guide.') ? t(guide.titleKey) : guide.titleKey}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {t(guide.category)}
                </p>

                <Button variant="ghost" className="w-full group-hover:bg-muted">
                  View Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}