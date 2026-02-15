import { Card } from '../components/ui/card';
import { Globe, Heart, Shield, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutScreen() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Globe,
      titleEn: 'Bilingual Support',
      titleEs: 'Soporte bilingüe',
      descEn: 'Get help in English or Spanish, whichever you prefer.',
      descEs: 'Obtén ayuda en inglés o español, el que prefieras.',
    },
    {
      icon: Shield,
      titleEn: 'Privacy First',
      titleEs: 'Privacidad primero',
      descEn: 'No account required. We never store your personal information.',
      descEs: 'No se requiere cuenta. Nunca almacenamos tu información personal.',
    },
    {
      icon: Heart,
      titleEn: 'Community Focused',
      titleEs: 'Enfocado en la comunidad',
      descEn: 'Built for immigrants in Raleigh and Durham by people who care.',
      descEs: 'Creado para inmigrantes en Raleigh y Durham por personas que se preocupan.',
    },
    {
      icon: Users,
      titleEn: 'Verified Resources',
      titleEs: 'Recursos verificados',
      descEn: 'All organizations are vetted and verified for quality.',
      descEs: 'Todas las organizaciones están verificadas por calidad.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="mb-2">{t('nav.about')}</h1>
          <p className="text-lg text-muted-foreground">
            Immigrant Help Hub
          </p>
        </div>

        <Card className="p-8 mb-6">
          {language === 'en' ? (
            <div className="space-y-4">
              <p>
                The Immigrant Help Hub is a free, privacy-friendly resource designed to help immigrants 
                in Raleigh and Durham navigate important life tasks with confidence.
              </p>
              <p>
                Whether you need to find health insurance, understand what to do after a car accident, 
                get help with taxes, or find community resources, we provide clear, step-by-step guidance 
                in both English and Spanish.
              </p>
              <p>
                Our mission is to make essential information accessible to everyone, regardless of 
                language barriers or technical expertise. We believe everyone deserves to understand 
                their options and get the help they need.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                El Centro de Ayuda para Inmigrantes es un recurso gratuito y respetuoso de la privacidad 
                diseñado para ayudar a los inmigrantes en Raleigh y Durham a navegar tareas importantes 
                de la vida con confianza.
              </p>
              <p>
                Ya sea que necesites encontrar seguro médico, entender qué hacer después de un accidente 
                de auto, obtener ayuda con impuestos o encontrar recursos comunitarios, proporcionamos 
                orientación clara y paso a paso tanto en inglés como en español.
              </p>
              <p>
                Nuestra misión es hacer que la información esencial sea accesible para todos, 
                independientemente de las barreras del idioma o la experiencia técnica. Creemos que 
                todos merecen entender sus opciones y obtener la ayuda que necesitan.
              </p>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2">
                  {language === 'en' ? feature.titleEn : feature.titleEs}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? feature.descEn : feature.descEs}
                </p>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 bg-amber-50 border-amber-200">
          <h3 className="mb-2">
            {language === 'en' ? 'Important Disclaimer' : 'Aviso importante'}
          </h3>
          <p className="text-sm text-amber-900">
            {t('common.disclaimer')} {language === 'en' 
              ? 'Always consult with qualified professionals for legal, medical, or financial advice specific to your situation.'
              : 'Siempre consulta con profesionales calificados para asesoramiento legal, médico o financiero específico para tu situación.'}
          </p>
        </Card>
      </div>
    </div>
  );
}