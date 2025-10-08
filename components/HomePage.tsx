import React, { useState, useEffect } from 'react';
import AppCard from './AppCard';
import CategoryCard from './CategoryCard';
import type { AppType } from '../types';
import { mockCategories } from '../data'; // Keep using mock categories for now
import { getFeaturedApps, getLatestApps } from '../api';

interface HomePageProps {
  onSelectApp: (app: AppType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectApp }) => {
  const [featuredApps, setFeaturedApps] = useState<AppType[]>([]);
  const [latestApps, setLatestApps] = useState<AppType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        setError(null);
        const [featured, latest] = await Promise.all([
          getFeaturedApps(),
          getLatestApps()
        ]);
        setFeaturedApps(featured);
        setLatestApps(latest);
      } catch (err) {
        console.error("Failed to fetch apps:", err);
        setError("Failed to load app data. Please make sure the backend server is running and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const renderAppGrid = (apps: AppType[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map(app => (
        <AppCard key={app._id} app={app} onSelect={onSelectApp} />
      ))}
    </div>
  );
  
  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
         <div key={i} className="bg-brand-surface rounded-lg p-4 flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
        </div>
      ))}
    </div>
  );


  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center bg-brand-surface rounded-xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-4">
          Discover Your Next Favorite App
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-brand-text-secondary mb-8">
          The ultimate hub for safe and fast APK downloads. Explore thousands of apps and games for your Android device.
        </p>
        <div className="relative max-w-lg mx-auto">
          <input type="search" placeholder="Enter App ID (e.g., com.google.android.youtube)" className="w-full bg-brand-bg border border-gray-600 rounded-full py-3 pl-6 pr-12 text-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          <button className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-brand-primary rounded-r-full hover:bg-blue-500">
            Go
          </button>
        </div>
      </section>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg text-center">{error}</div>}

      {/* Featured Apps Section */}
      <section>
        <h2 className="text-2xl font-bold text-brand-text mb-6">Featured Apps</h2>
        {loading ? renderLoadingSkeleton() : renderAppGrid(featuredApps)}
      </section>

      {/* Latest Updates Section */}
      <section>
        <h2 className="text-2xl font-bold text-brand-text mb-6">Latest Updates</h2>
        {loading ? renderLoadingSkeleton() : renderAppGrid(latestApps)}
      </section>

      {/* Popular Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-brand-text mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {mockCategories.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
