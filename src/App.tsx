import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import SurveyPage from './pages/SurveyPage/SurveyPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <SurveyPage />
      </div>
    </Provider>
  );
};

export default App;
