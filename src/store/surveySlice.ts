import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SurveyState } from '../components/types';
import twixImage from '../assets/images/twix.png';
import mwImage from '../assets/images/mw.png';

const initialState: SurveyState = {
  title: 'Оцените, пожалуйста, насколько Вам нравится вкус каждой из марок шоколадных батончиков?',
  items: [
    {
      id: '1',
      imageUrl: twixImage,
      rating: null,
      isSkipped: false,
    },
    {
      id: '2',
      imageUrl: mwImage,
      rating: null,
      isSkipped: false,
    },
  ],
  isSubmitted: false,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ itemId: string; rating: number }>) => {
      const { itemId, rating } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.rating = rating;
        item.isSkipped = false;
      }
    },
    skipRating: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.rating = null;
        item.isSkipped = true;
      }
    },
    submitSurvey: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const { setRating, skipRating, submitSurvey } = surveySlice.actions;
export default surveySlice.reducer;
