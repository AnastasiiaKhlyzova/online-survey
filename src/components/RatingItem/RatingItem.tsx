import React from 'react';
import StarRating from '../StarRating/StarRating';
import Button from '../Button/Button';
import './RatingItem.scss';

interface RatingItemProps {
  imageUrl: string;
  rating: number | null;
  onRatingChange: (rating: number) => void;
  onSkip: () => void;
}

const RatingItem: React.FC<RatingItemProps> = ({ imageUrl, rating, onRatingChange, onSkip }) => {
  return (
    <div className="rating-item">
      <div className="rating-item__image-container">
        <img src={imageUrl} alt="Product" className="rating-item__image" />
      </div>
      <div className="rating-item__rating-container">
        <StarRating maxRating={10} currentRating={rating} onRatingChange={onRatingChange} />
        <Button text="Затрудняюсь ответить" onClick={onSkip} variant="secondary" />
      </div>
    </div>
  );
};

export default RatingItem;
