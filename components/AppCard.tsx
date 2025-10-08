
import React from 'react';
import type { AppType } from '../types';
import StarRating from './StarRating';

interface AppCardProps {
  app: AppType;
  onSelect: (app: AppType) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(app)}
      className="bg-brand-surface rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <img src={app.icon} alt={`${app.name} icon`} className="w-16 h-16 rounded-xl flex-shrink-0" />
      <div className="flex-1 overflow-hidden">
        <h3 className="text-md font-semibold text-brand-text truncate group-hover:text-brand-primary">{app.name}</h3>
        <p className="text-sm text-brand-text-secondary truncate">{app.developer}</p>
        <div className="flex items-center mt-1 space-x-2">
          <StarRating rating={app.averageRating} />
          <span className="text-xs text-brand-text-secondary">{app.averageRating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
