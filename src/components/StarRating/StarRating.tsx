import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.scss';

interface StarRatingProps {
  maxRating: number;
  currentRating: number | null;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxRating, currentRating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="star-rating">
      <div className="star-rating__stars-container">
        {[...Array(maxRating)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={ratingValue}
              className={`star-rating__star ${
                (hoverRating !== null && ratingValue <= hoverRating) ||
                (currentRating !== null && ratingValue <= currentRating && hoverRating === null)
                  ? 'star-rating__star--active'
                  : ''
              }`}
              onClick={() => onRatingChange(ratingValue)}
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(null)}
            >
              <FaStar />
            </span>
          );
        })}
      </div>
      {currentRating && <span className="star-rating__value">{currentRating}</span>}
      {!currentRating && <span className="star-rating__empty">Оценки нет</span>}
    </div>
  );
};

export default StarRating;
