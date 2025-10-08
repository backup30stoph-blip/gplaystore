import React, { useState } from 'react';
import type { AppType, ReviewType } from '../types';
import StarRating from './StarRating';
import { ArrowLeftIcon, DownloadIcon, InfoIcon, ShieldCheckIcon, UserCircleIcon } from './icons';

// --- Locally defined components to satisfy constraints ---

interface RatingHistogramProps {
  histogram: number[];
  totalRatings: number;
}

const RatingHistogram: React.FC<RatingHistogramProps> = ({ histogram, totalRatings }) => {
  if (totalRatings === 0) return null;
  return (
    <div className="space-y-1 w-full">
      {histogram.slice().reverse().map((count, index) => {
        const starLevel = 5 - index;
        const percentage = (count / totalRatings) * 100;
        return (
          <div key={starLevel} className="flex items-center space-x-2 text-sm">
            <span className="text-brand-text-secondary w-3 text-right font-medium">{starLevel}★</span>
            <div className="flex-grow bg-brand-bg rounded-full h-2.5">
              <div
                className="bg-gray-500 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-t border-gray-700 py-5">
      <div className="flex items-start space-x-4">
        {review.avatar ? (
          <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <UserCircleIcon className="w-10 h-10 text-gray-500 flex-shrink-0" />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="font-semibold text-brand-text">{review.user}</p>
            <StarRating rating={review.rating} />
          </div>
           {review.version && <p className="text-xs text-brand-text-secondary mb-2">Version {review.version}</p>}
          <p className="mt-1 text-brand-text-secondary text-sm">{review.text}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---

interface AppDetailPageProps {
  app: AppType;
  onBack: () => void;
}

const AppDetailPage: React.FC<AppDetailPageProps> = ({ app, onBack }) => {
  const [activeTab, setActiveTab] = useState('description');

  const formatDownloads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${Math.floor(num / 1000)}K+`;
    return num.toString();
  };

  const TABS = ['description', 'reviews', 'safety'];

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-text mb-6 transition-colors">
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back to list</span>
      </button>

      <div className="bg-brand-surface rounded-xl overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <img src={app.icon} alt={`${app.name} icon`} className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex-shrink-0 shadow-lg" />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text">{app.name}</h1>
              <a href={app.developerWebsite} target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl text-brand-primary mt-1 hover:underline">{app.developer}</a>
              <div className="flex items-center mt-4 space-x-2">
                <StarRating rating={app.averageRating} className="w-5 h-5" />
                <span className="text-md font-bold text-brand-text">{app.averageRating.toFixed(1)}</span>
                <span className="text-md text-brand-text-secondary">({formatDownloads(app.downloads)} downloads)</span>
              </div>
              <p className="text-md text-brand-text-secondary mt-4 hidden md:block">{app.shortDescription}</p>
            </div>
            <div className="w-full md:w-auto self-stretch md:self-auto flex flex-col">
              <button className="w-full bg-brand-secondary hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-transform transform hover:scale-105 flex-grow">
                <DownloadIcon className="w-6 h-6" />
                <span>Download APK ({app.fileSize} MB)</span>
              </button>
              <p className="text-xs text-brand-text-secondary mt-2 text-center">Version {app.version}</p>
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {app.screenshots.length > 0 && (
            <div className="pl-6 md:pl-8 py-4">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                {app.screenshots.map((ss, index) => (
                    <img key={index} src={ss} alt={`Screenshot ${index + 1}`} className="h-48 rounded-lg shadow-md flex-shrink-0" />
                ))}
                </div>
            </div>
        )}
        
        <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="border-b border-gray-700 mb-6">
                        <nav className="flex space-x-4 sm:space-x-8">
                            <button onClick={() => setActiveTab('description')} className={`py-2 text-sm sm:text-base font-medium border-b-2 ${activeTab === 'description' ? 'text-brand-primary border-brand-primary' : 'text-brand-text-secondary border-transparent hover:border-gray-500'}`}>About</button>
                            <button onClick={() => setActiveTab('reviews')} className={`py-2 text-sm sm:text-base font-medium border-b-2 ${activeTab === 'reviews' ? 'text-brand-primary border-brand-primary' : 'text-brand-text-secondary border-transparent hover:border-gray-500'}`}>Reviews</button>
                            <button onClick={() => setActiveTab('safety')} className={`py-2 text-sm sm:text-base font-medium border-b-2 ${activeTab === 'safety' ? 'text-brand-primary border-brand-primary' : 'text-brand-text-secondary border-transparent hover:border-gray-500'}`}>Data Safety</button>
                        </nav>
                    </div>
                    <div>
                        {activeTab === 'description' && <div className="prose prose-invert max-w-none text-brand-text-secondary prose-headings:text-brand-text prose-a:text-brand-primary" dangerouslySetInnerHTML={{ __html: app.fullDescription }} />}
                        {activeTab === 'reviews' && (
                          <div>
                            <h3 className="text-xl font-bold text-brand-text mb-4">Ratings and reviews</h3>
                            <div className="flex flex-col sm:flex-row gap-8 items-center mb-6 bg-brand-bg/50 p-4 rounded-lg">
                              <div className="text-center sm:text-left">
                                <p className="text-5xl font-bold text-brand-text">{app.averageRating.toFixed(1)}</p>
                                <div className="flex justify-center my-2"><StarRating rating={app.averageRating} className="w-6 h-6" /></div>
                                <p className="text-brand-text-secondary">{app.ratings.toLocaleString()} ratings</p>
                              </div>
                              <RatingHistogram histogram={app.histogram} totalRatings={app.ratings} />
                            </div>
                            <div>
                              {app.reviews.length > 0 ? app.reviews.map(review => <ReviewCard key={review.id} review={review} />) : <p className="text-brand-text-secondary">No reviews yet.</p>}
                            </div>
                          </div>
                        )}
                        {activeTab === 'safety' && (
                           <div>
                            <h3 className="text-xl font-bold text-brand-text mb-4">Data safety</h3>
                            <p className="text-brand-text-secondary mb-6 text-sm">Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time.</p>
                            <ul className="space-y-4">
                              {app.dataSafety.length > 0 ? app.dataSafety.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <ShieldCheckIcon className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-0.5" />
                                  <span className="text-brand-text">{item}</span>
                                </li>
                              )) : <p className="text-brand-text-secondary">The developer has not provided any data safety information.</p>}
                            </ul>
                          </div>
                        )}
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-brand-bg/50 rounded-lg p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center"><InfoIcon className="w-5 h-5 mr-2" />App Information</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Version</span><span className="font-medium text-brand-text">{app.version}</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Updated on</span><span className="font-medium text-brand-text">{new Date(app.updatedAt).toLocaleDateString()}</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Downloads</span><span className="font-medium text-brand-text">{formatDownloads(app.downloads)}</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Download size</span><span className="font-medium text-brand-text">{app.fileSize} MB</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Requires Android</span><span className="font-medium text-brand-text">{app.minAndroidVersion}+</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Category</span><span className="font-medium text-brand-text">{app.category}</span></li>
                            <li className="flex justify-between"><span className="text-brand-text-secondary">Content rating</span><span className="font-medium text-brand-text">{app.contentRating}</span></li>
                            <li className="pt-3 mt-3 border-t border-gray-700">
                              <p className="text-brand-text-secondary font-semibold mb-1">What's New</p>
                              <p className="font-medium text-brand-text-secondary text-xs">{app.whatsNew}</p>
                            </li>
                             <li className="pt-3 mt-3 border-t border-gray-700 flex justify-between">
                                <a href={app.developerWebsite} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Developer Website</a>
                             </li>
                              <li className="flex justify-between">
                                <a href={app.privacyPolicy} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Privacy Policy</a>
                             </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;
