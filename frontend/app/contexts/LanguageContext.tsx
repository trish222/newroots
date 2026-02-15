import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Welcome Screen
    'welcome.title': 'Welcome',
    'welcome.subtitle': 'Get guidance in your language for life in Raleigh & Durham.',
    'welcome.english': 'English',
    'welcome.spanish': 'Español',
    'welcome.privacy': 'No account needed. Your privacy matters.',
    'welcome.about': 'About',
    'welcome.emergency': 'Emergency Disclaimer',
    
    // Navigation
    'nav.home': 'Home',
    'nav.guides': 'Guides',
    'nav.resources': 'Resources',
    'nav.about': 'About',
    'nav.chat': 'Chat',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.chat.title': 'Ask for help',
    'dashboard.chat.placeholder': 'Tell us what you need help with...',
    'dashboard.chat.send': 'Send',
    'dashboard.chat.clear': 'Clear chat',
    'dashboard.chat.privacy': 'Avoid sharing SSN, passport numbers, or bank info.',
    'dashboard.steps.title': 'Your Next Steps',
    'dashboard.resources.title': 'Resources near you',
    'dashboard.resources.call': 'Call',
    'dashboard.resources.directions': 'Directions',
    'dashboard.filter.city': 'City',
    'dashboard.filter.category': 'Category',
    'dashboard.filter.all': 'All',
    
    // Quick Prompts
    'prompt.health': 'Find health insurance',
    'prompt.accident': 'I had a car accident',
    'prompt.legal': 'Need legal help',
    'prompt.taxes': 'Help with taxes',
    'prompt.doctor': 'Find a doctor',
    'prompt.community': 'Community resources',
    
    // Categories
    'category.healthcare': 'Healthcare',
    'category.legal': 'Legal',
    'category.taxes': 'Taxes',
    'category.emergency': 'Emergency',
    'category.housing': 'Housing',
    'category.community': 'Community',
    
    // Cities
    'city.raleigh': 'Raleigh',
    'city.durham': 'Durham',
    
    // Health Insurance Guide
    'guide.health.title': 'Find Health Insurance in Raleigh/Durham',
    'guide.health.step1': 'Check eligibility',
    'guide.health.step1.detail': 'Determine if you qualify for Medicaid or the Marketplace based on your income and immigration status.',
    'guide.health.step2': 'Gather documents',
    'guide.health.step2.detail': 'Collect proof of identity, income, and residency. You may need: ID, proof of address, pay stubs, and tax returns.',
    'guide.health.step3': 'Compare plans',
    'guide.health.step3.detail': 'Look at premiums, deductibles, copays, and which doctors are covered. Choose what fits your budget and health needs.',
    'guide.health.step4': 'Where to apply',
    'guide.health.step4.detail': 'Apply online at healthcare.gov, call 1-800-318-2596, or visit a local enrollment center for in-person help.',
    'guide.health.step5': 'Get local help',
    'guide.health.step5.detail': 'Community clinics and navigators can guide you through the process for free. See resources below.',
    
    // Car Accident Guide
    'guide.accident.title': 'What to do after a car accident',
    'guide.accident.emergency': 'If you are in danger call 911',
    'guide.accident.step1': 'Check for injuries',
    'guide.accident.step1.detail': 'Make sure you and your passengers are safe. Call 911 immediately if anyone is hurt.',
    'guide.accident.step2': 'Move to safety',
    'guide.accident.step2.detail': 'If possible, move your vehicle to the side of the road. Turn on hazard lights.',
    'guide.accident.step3': 'Call police if needed',
    'guide.accident.step3.detail': 'In North Carolina, you must report accidents with injury, death, or property damage over $1,000.',
    'guide.accident.step4': 'Exchange information',
    'guide.accident.step4.detail': 'Get names, phone numbers, insurance info, and license plate numbers from all drivers involved.',
    'guide.accident.step5': 'Take photos',
    'guide.accident.step5.detail': 'Document damage to all vehicles, the accident scene, license plates, and any visible injuries.',
    'guide.accident.step6': 'Insurance claim',
    'guide.accident.step6.detail': 'Contact your insurance company as soon as possible. Provide them with all the information you collected.',
    'guide.accident.translate': 'Translate phrases',
    'guide.accident.urgentcare': 'Find nearby urgent care',
    'guide.accident.legalaid': 'Find legal aid',
    
    // Common
    'common.save': 'Save this guide',
    'common.share': 'Share',
    'common.verified': 'Verified',
    'common.disclaimer': 'This is general guidance, not legal or medical advice.',
    'common.step': 'Step',
    'common.of': 'of',
  },
  es: {
    // Welcome Screen
    'welcome.title': 'Bienvenido',
    'welcome.subtitle': 'Obtén orientación en tu idioma para la vida en Raleigh y Durham.',
    'welcome.english': 'English',
    'welcome.spanish': 'Español',
    'welcome.privacy': 'No se necesita cuenta. Tu privacidad es importante.',
    'welcome.about': 'Acerca de',
    'welcome.emergency': 'Aviso de Emergencia',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.guides': 'Guías',
    'nav.resources': 'Recursos',
    'nav.about': 'Acerca de',
    'nav.chat': 'Chat',
    'nav.settings': 'Ajustes',
    
    // Dashboard
    'dashboard.chat.title': 'Pide ayuda',
    'dashboard.chat.placeholder': 'Cuéntanos en qué necesitas ayuda...',
    'dashboard.chat.send': 'Enviar',
    'dashboard.chat.clear': 'Borrar chat',
    'dashboard.chat.privacy': 'Evita compartir tu SSN, números de pasaporte o información bancaria.',
    'dashboard.steps.title': 'Tus próximos pasos',
    'dashboard.resources.title': 'Recursos cerca de ti',
    'dashboard.resources.call': 'Llamar',
    'dashboard.resources.directions': 'Direcciones',
    'dashboard.filter.city': 'Ciudad',
    'dashboard.filter.category': 'Categoría',
    'dashboard.filter.all': 'Todos',
    
    // Quick Prompts
    'prompt.health': 'Encontrar seguro médico',
    'prompt.accident': 'Tuve un accidente de auto',
    'prompt.legal': 'Necesito ayuda legal',
    'prompt.taxes': 'Ayuda con impuestos',
    'prompt.doctor': 'Encontrar un doctor',
    'prompt.community': 'Recursos comunitarios',
    
    // Categories
    'category.healthcare': 'Salud',
    'category.legal': 'Legal',
    'category.taxes': 'Impuestos',
    'category.emergency': 'Emergencia',
    'category.housing': 'Vivienda',
    'category.community': 'Comunidad',
    
    // Cities
    'city.raleigh': 'Raleigh',
    'city.durham': 'Durham',
    
    // Health Insurance Guide
    'guide.health.title': 'Encontrar seguro médico en Raleigh/Durham',
    'guide.health.step1': 'Verifica elegibilidad',
    'guide.health.step1.detail': 'Determina si calificas para Medicaid o el Mercado según tus ingresos y estado migratorio.',
    'guide.health.step2': 'Reúne documentos',
    'guide.health.step2.detail': 'Recopila prueba de identidad, ingresos y residencia. Puedes necesitar: identificación, comprobante de domicilio, talones de pago y declaraciones de impuestos.',
    'guide.health.step3': 'Compara planes',
    'guide.health.step3.detail': 'Revisa primas, deducibles, copagos y qué médicos están cubiertos. Elige lo que se ajuste a tu presupuesto y necesidades de salud.',
    'guide.health.step4': 'Dónde aplicar',
    'guide.health.step4.detail': 'Solicita en línea en cuidadodesalud.gov, llama al 1-800-318-2596, o visita un centro de inscripción local para ayuda en persona.',
    'guide.health.step5': 'Obtén ayuda local',
    'guide.health.step5.detail': 'Las clínicas comunitarias y navegadores pueden guiarte a través del proceso de forma gratuita. Consulta los recursos a continuación.',
    
    // Car Accident Guide
    'guide.accident.title': 'Qué hacer después de un accidente de auto',
    'guide.accident.emergency': 'Si estás en peligro llama al 911',
    'guide.accident.step1': 'Verifica lesiones',
    'guide.accident.step1.detail': 'Asegúrate de que tú y tus pasajeros estén seguros. Llama al 911 inmediatamente si alguien está herido.',
    'guide.accident.step2': 'Muévete a un lugar seguro',
    'guide.accident.step2.detail': 'Si es posible, mueve tu vehículo al lado de la carretera. Enciende las luces de emergencia.',
    'guide.accident.step3': 'Llama a la policía si es necesario',
    'guide.accident.step3.detail': 'En Carolina del Norte, debes reportar accidentes con lesiones, muerte o daños a la propiedad superiores a $1,000.',
    'guide.accident.step4': 'Intercambia información',
    'guide.accident.step4.detail': 'Obtén nombres, números de teléfono, información de seguro y placas de todos los conductores involucrados.',
    'guide.accident.step5': 'Toma fotos',
    'guide.accident.step5.detail': 'Documenta los daños a todos los vehículos, la escena del accidente, placas y cualquier lesión visible.',
    'guide.accident.step6': 'Reclamo de seguro',
    'guide.accident.step6.detail': 'Contacta a tu compañía de seguros lo antes posible. Proporciónales toda la información que recopilaste.',
    'guide.accident.translate': 'Traducir frases',
    'guide.accident.urgentcare': 'Encontrar atención urgente cercana',
    'guide.accident.legalaid': 'Encontrar ayuda legal',
    
    // Common
    'common.save': 'Guardar esta guía',
    'common.share': 'Compartir',
    'common.verified': 'Verificado',
    'common.disclaimer': 'Esta es orientación general, no consejo legal o médico.',
    'common.step': 'Paso',
    'common.of': 'de',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
