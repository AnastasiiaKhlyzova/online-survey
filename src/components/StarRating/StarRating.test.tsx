import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('Компонент StarRating', () => {
  const defaultProps = {
    maxRating: 10,
    currentRating: null,
    onRatingChange: jest.fn(),
  };

  it('должен отображать сообщение "Оценки нет", когда рейтинг не установлен', () => {
    render(<StarRating {...defaultProps} />);

    expect(screen.getByText('Оценки нет')).toBeInTheDocument();
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it('должен отображать числовое значение рейтинга, когда рейтинг установлен', () => {
    const rating = 7;
    render(<StarRating {...defaultProps} currentRating={rating} />);

    expect(screen.getByText(rating.toString())).toBeInTheDocument();
    expect(screen.queryByText('Оценки нет')).not.toBeInTheDocument();
  });

  it('должен подсвечивать звезды при наведении', () => {
    render(<StarRating {...defaultProps} />);

    const starContainers = screen.getAllByText('', { selector: '.star-rating__star' });

    expect(starContainers[2].classList.contains('star-rating__star--active')).toBe(false);

    fireEvent.mouseEnter(starContainers[2]);

    expect(starContainers[0].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[1].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[2].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[3].classList.contains('star-rating__star--active')).toBe(false);

    fireEvent.mouseLeave(starContainers[2]);

    expect(starContainers[2].classList.contains('star-rating__star--active')).toBe(false);
  });

  it('должен показывать активные звезды в соответствии с текущим рейтингом', () => {
    const rating = 3;
    render(<StarRating {...defaultProps} currentRating={rating} />);

    const starContainers = screen.getAllByText('', { selector: '.star-rating__star' });

    expect(starContainers[0].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[1].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[2].classList.contains('star-rating__star--active')).toBe(true);
    expect(starContainers[3].classList.contains('star-rating__star--active')).toBe(false);
  });
});
