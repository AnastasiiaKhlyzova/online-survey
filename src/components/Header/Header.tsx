import React from 'react';
import './Header.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="header__progress">
        <span className="header__step">2 ИЗ 3</span>
        <span className="header__link">Предыдущий вопрос</span>
      </div>
      <h1 className="header__title">{title}</h1>
    </header>
  );
};

export default Header;
