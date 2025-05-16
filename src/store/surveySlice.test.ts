import type { SurveyState } from '../components/types';
import surveyReducer, { setRating, skipRating, submitSurvey } from './surveySlice';

const twixImage = 'twix-image-mock';
const mwImage = 'mw-image-mock';

describe('Редьюсер опроса', () => {
  const initialState: SurveyState = {
    title:
      'Оцените, пожалуйста, насколько Вам нравится вкус каждой из марок шоколадных батончиков?',
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

  it('должен обрабатывать установку рейтинга', () => {
    const rating = 7;
    const itemId = '1';
    const expectedState = {
      ...initialState,
      items: [
        {
          ...initialState.items[0],
          rating,
          isSkipped: false,
        },
        initialState.items[1],
      ],
    };

    expect(surveyReducer(initialState, setRating({ itemId, rating }))).toEqual(expectedState);
  });

  it('должен обрабатывать пропуск рейтинга', () => {
    const stateWithRating = surveyReducer(initialState, setRating({ itemId: '1', rating: 7 }));

    const expectedState = {
      ...initialState,
      items: [
        {
          ...initialState.items[0],
          rating: null,
          isSkipped: true,
        },
        initialState.items[1],
      ],
    };

    expect(surveyReducer(stateWithRating, skipRating('1'))).toEqual(expectedState);
  });

  it('должен обрабатывать отправку опроса', () => {
    const expectedState = {
      ...initialState,
      isSubmitted: true,
    };

    expect(surveyReducer(initialState, submitSurvey())).toEqual(expectedState);
  });

  it('не должен изменять состояние для несуществующего элемента', () => {
    const nonExistentId = '999';

    expect(surveyReducer(initialState, setRating({ itemId: nonExistentId, rating: 5 }))).toEqual(
      initialState,
    );

    expect(surveyReducer(initialState, skipRating(nonExistentId))).toEqual(initialState);
  });

  it('должен корректно обновлять рейтинг для элемента с уже установленным рейтингом', () => {
    const stateWithRating = surveyReducer(initialState, setRating({ itemId: '1', rating: 7 }));

    const newRating = 9;
    const expectedState = {
      ...initialState,
      items: [
        {
          ...initialState.items[0],
          rating: newRating,
          isSkipped: false,
        },
        initialState.items[1],
      ],
    };

    expect(surveyReducer(stateWithRating, setRating({ itemId: '1', rating: newRating }))).toEqual(
      expectedState,
    );
  });

  it('должен корректно обновлять статус пропуска для пропущенного элемента', () => {
    const stateWithSkipped = surveyReducer(initialState, skipRating('1'));

    const rating = 8;
    const expectedState = {
      ...initialState,
      items: [
        {
          ...initialState.items[0],
          rating,
          isSkipped: false,
        },
        initialState.items[1],
      ],
    };

    expect(surveyReducer(stateWithSkipped, setRating({ itemId: '1', rating }))).toEqual(
      expectedState,
    );
  });
});
