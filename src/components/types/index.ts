export interface RatingItemData {
  id: string;
  imageUrl: string;
  rating: number | null;
  isSkipped: boolean;
}

export interface SurveyState {
  title: string;
  items: RatingItemData[];
  isSubmitted: boolean;
}
