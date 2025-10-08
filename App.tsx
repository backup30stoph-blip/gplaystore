import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AppDetailPage from './components/AppDetailPage';
import type { AppType } from './types';
import { getAppDetails } from './api';

const App: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectApp = async (app: AppType) => {
    window.scrollTo(0, 0);
    setIsLoadingDetails(true);
    setError(null);
    try {
      // Re-fetch full details from the API to ensure data is complete
      const fullAppDetails = await getAppDetails(app.slug);
      setSelectedApp(fullAppDetails);
    } catch (e) {
      console.error(e);
      setError("Could not load app details. Please try again.");
      setSelectedApp(null); // Clear selection on error
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleGoBack = () => {
    setSelectedApp(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoadingDetails) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
      );
    }
    
    if (error && !selectedApp) {
         return <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg text-center">{error} <button onClick={handleGoBack} className="underline ml-2">Go back</button></div>
    }

    if (selectedApp) {
      return <AppDetailPage app={selectedApp} onBack={handleGoBack} />;
    }
    
    return <HomePage onSelectApp={handleSelectApp} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
