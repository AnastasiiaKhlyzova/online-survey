import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SurveyPage.scss';
import Header from '../../components/Header/Header';
import RatingItem from '../../components/RatingItem/RatingItem';
import Button from '../../components/Button/Button';
import type { RootState } from '../../store';
import { setRating, skipRating, submitSurvey } from '../../store/surveySlice';

const SurveyPage: React.FC = () => {
  const dispatch = useDispatch();
  const { title, items } = useSelector((state: RootState) => state.survey);

  const handleRatingChange = useCallback(
    (itemId: string, rating: number) => {
      dispatch(setRating({ itemId, rating }));
    },
    [dispatch],
  );

  const handleSkip = useCallback(
    (itemId: string) => {
      dispatch(skipRating(itemId));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(() => {
    dispatch(submitSurvey());
    console.log('Survey submitted:', items);
  }, [dispatch, items]);

  const calculateProgress = () => {
    const totalItems = items.length;
    const ratedItems = items.filter((item) => item.rating !== null || item.isSkipped).length;
    return (ratedItems / totalItems) * 100;
  };

  const isAllItemsRated = items.every((item) => item.rating !== null || item.isSkipped);

  return (
    <div className="survey-page">
      <div className="survey-page__container">
        <Header title={title} />

        <div className="survey-page__items">
          {items.map((item) => (
            <RatingItem
              key={item.id}
              imageUrl={item.imageUrl}
              rating={item.rating}
              onRatingChange={(rating) => handleRatingChange(item.id, rating)}
              onSkip={() => handleSkip(item.id)}
            />
          ))}
        </div>

        <div className="survey-page__footer">
          <div className="survey-page__progress-bar">
            <div
              className="survey-page__progress-fill"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <Button text="Далее" onClick={handleSubmit} fullWidth disabled={!isAllItemsRated} />
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
