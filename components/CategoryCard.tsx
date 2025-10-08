
import React from 'react';
import type { CategoryType } from '../types';
import { GamepadIcon, WrenchIcon, ChartIcon, UsersIcon, CameraIcon, PaletteIcon } from './icons';

interface CategoryCardProps {
  category: CategoryType;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    gamepad: GamepadIcon,
    wrench: WrenchIcon,
    chart: ChartIcon,
    users: UsersIcon,
    camera: CameraIcon,
    palette: PaletteIcon,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.icon] || GamepadIcon;

  return (
    <div className="bg-brand-surface rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="bg-brand-bg p-4 rounded-full mb-3 group-hover:bg-brand-primary transition-colors">
        <IconComponent className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-semibold text-brand-text text-md">{category.name}</h3>
      <p className="text-sm text-brand-text-secondary">{category.appsCount} apps</p>
    </div>
  );
};

export default CategoryCard;
