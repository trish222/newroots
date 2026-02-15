import { useState } from 'react';
import { Card } from '../components/ui/card';
import { ResourceCard, Resource } from '../components/ResourceCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Search, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const allResources: Resource[] = [
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
    address: '3643 N Roxboro St, Durham, NC 27704',
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
  {
    id: '7',
    name: 'Durham County Health Department',
    category: 'Healthcare',
    city: 'Durham',
    phone: '(919) 560-7800',
    address: '414 E Main St, Durham, NC 27701',
    verified: true,
    description: 'Immunizations, WIC, health screenings',
  },
  {
    id: '8',
    name: 'Volunteer Income Tax Assistance (VITA)',
    category: 'Taxes',
    city: 'Durham',
    phone: '(919) 560-0300',
    verified: true,
    description: 'Free tax preparation for low-income families',
  },
  {
    id: '9',
    name: 'Urban Ministries of Durham',
    category: 'Community',
    city: 'Durham',
    phone: '(919) 682-0538',
    address: '410 Liberty St, Durham, NC 27701',
    verified: true,
    description: 'Food, shelter, and support services',
  },
  {
    id: '10',
    name: 'Wake County Human Services',
    category: 'Healthcare',
    city: 'Raleigh',
    phone: '(919) 250-3100',
    address: '220 Swinburne St, Raleigh, NC 27610',
    verified: true,
    description: 'Medicaid, food stamps, and social services',
  },
];

export function ResourcesScreen() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || resource.city === selectedCity;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">{t('nav.resources')}</h1>
          <p className="text-muted-foreground">
            Find verified organizations and services near you
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid sm:grid-cols-2 gap-3">
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
                  <SelectItem value="Emergency">{t('category.emergency')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No resources found matching your search criteria.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}