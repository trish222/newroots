import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { GuidesScreen } from './screens/GuidesScreen';
import { ResourcesScreen } from './screens/ResourcesScreen';
import { AboutScreen } from './screens/AboutScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HealthInsuranceGuide } from './screens/HealthInsuranceGuide';
import { CarAccidentGuide } from './screens/CarAccidentGuide';

export default function App() {
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  const handleLanguageSelect = () => {
    setHasSelectedLanguage(true);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        {!hasSelectedLanguage ? (
          <WelcomeScreen onLanguageSelect={handleLanguageSelect} />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashboardScreen />
                </Layout>
              }
            />
            <Route
              path="/guides"
              element={
                <Layout>
                  <GuidesScreen />
                </Layout>
              }
            />
            <Route
              path="/resources"
              element={
                <Layout>
                  <ResourcesScreen />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutScreen />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <SettingsScreen />
                </Layout>
              }
            />
            <Route
              path="/guide/health-insurance"
              element={
                <Layout>
                  <HealthInsuranceGuide />
                </Layout>
              }
            />
            <Route
              path="/guide/car-accident"
              element={
                <Layout>
                  <CarAccidentGuide />
                </Layout>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </LanguageProvider>
  );
}