
import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5, className = 'w-4 h-4' }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            className={`${className} ${rating >= starValue ? 'text-yellow-400' : 'text-gray-600'}`}
            filled={rating >= starValue}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
