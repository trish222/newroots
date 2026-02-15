import { Globe, Shield, Info, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

interface WelcomeScreenProps {
  onLanguageSelect: (language: 'en' | 'es') => void;
}

export function WelcomeScreen({ onLanguageSelect }: WelcomeScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl mb-3">
              Welcome / Bienvenido
            </h1>
            
            <p className="text-lg text-muted-foreground mb-2">
              Immigrant Help Hub
            </p>
            
            <p className="text-base text-muted-foreground max-w-lg mx-auto">
              {t('welcome.subtitle')}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              size="lg"
              className="w-full h-auto py-6 text-lg"
              onClick={() => onLanguageSelect('en')}
            >
              <span className="text-2xl mr-3">🇺🇸</span>
              {t('welcome.english')}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full h-auto py-6 text-lg border-2"
              onClick={() => onLanguageSelect('es')}
            >
              <span className="text-2xl mr-3">🇪🇸</span>
              {t('welcome.spanish')}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Shield className="w-4 h-4" />
            <span>{t('welcome.privacy')}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0">
                  <Info className="w-4 h-4 mr-1" />
                  {t('welcome.about')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About Immigrant Help Hub</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>
                    The Immigrant Help Hub is a free, privacy-friendly resource designed to help immigrants 
                    in Raleigh and Durham navigate important life tasks.
                  </p>
                  <p>
                    We provide guidance in English and Spanish on topics like healthcare, legal matters, 
                    taxes, housing, and community resources.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This tool provides general guidance only and is not a substitute for professional 
                    legal or medical advice.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {t('welcome.emergency')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Emergency Disclaimer / Aviso de Emergencia</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-medium text-red-900">
                      🚨 If you are in immediate danger, call 911
                    </p>
                    <p className="text-sm text-red-800 mt-2">
                      🚨 Si estás en peligro inmediato, llama al 911
                    </p>
                  </div>
                  <p className="text-sm">
                    This app is for informational purposes only and should not be used in emergency 
                    situations. Always contact emergency services directly if you need immediate help.
                  </p>
                  <p className="text-sm">
                    Esta aplicación es solo para fines informativos y no debe usarse en situaciones 
                    de emergencia. Siempre contacta a los servicios de emergencia directamente si necesitas 
                    ayuda inmediata.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Raleigh & Durham, North Carolina
        </p>
      </div>
    </div>
  );
}
