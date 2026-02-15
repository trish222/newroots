import { Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

export interface Resource {
  id: string;
  name: string;
  category: 'Healthcare' | 'Legal' | 'Taxes' | 'Emergency' | 'Housing' | 'Community';
  city: 'Raleigh' | 'Durham';
  phone: string;
  address?: string;
  verified?: boolean;
  description?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const categoryColors = {
  Healthcare: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Legal: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Taxes: 'bg-purple-100 text-purple-700 border-purple-200',
  Emergency: 'bg-red-100 text-red-700 border-red-200',
  Housing: 'bg-amber-100 text-amber-700 border-amber-200',
  Community: 'bg-pink-100 text-pink-700 border-pink-200',
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="truncate">{resource.name}</h3>
            {resource.verified && (
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
            )}
          </div>
          {resource.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="outline" className={categoryColors[resource.category]}>
          {t(`category.${resource.category.toLowerCase()}`)}
        </Badge>
        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
          {resource.city}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          className="flex-1 min-w-[120px]"
          onClick={() => window.location.href = `tel:${resource.phone}`}
        >
          <Phone className="w-4 h-4 mr-2" />
          {t('dashboard.resources.call')}
        </Button>
        {resource.address && (
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 min-w-[120px]"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(resource.address!)}`, '_blank')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {t('dashboard.resources.directions')}
          </Button>
        )}
      </div>
    </Card>
  );
}
