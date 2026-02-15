import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Globe, MapPin, Bell, Shield, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">{t('nav.settings')}</h1>
          <p className="text-muted-foreground">
            Manage your preferences and settings
          </p>
        </div>

        {/* Language Settings */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1">Language / Idioma</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your preferred language
              </p>
              <Select value={language} onValueChange={(val: 'en' | 'es') => setLanguage(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Location Settings */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1">Default City</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select your primary city for resource recommendations
              </p>
              <Select defaultValue="raleigh">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raleigh">{t('city.raleigh')}</SelectItem>
                  <SelectItem value="durham">{t('city.durham')}</SelectItem>
                  <SelectItem value="both">Both Cities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Notifications Settings */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-4">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="updates" className="flex-1">
                    <div>
                      <p className="font-medium">Resource Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about new resources</p>
                    </div>
                  </Label>
                  <Switch id="updates" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminders" className="flex-1">
                    <div>
                      <p className="font-medium">Task Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders for incomplete steps</p>
                    </div>
                  </Label>
                  <Switch id="reminders" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1">Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your privacy is important to us. This app:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Does not require account creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Does not store personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Does not share data with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Keeps all data on your device only</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Help & Support */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1">Help & Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need assistance using this app?
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Immigrant Help Hub v1.0.0
          <br />
          Raleigh & Durham, North Carolina
        </div>
      </div>
    </div>
  );
}