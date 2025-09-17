import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import {
  fetchIngredients,
  getIngredients
} from '../../services/slices/ingridientSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
      </Routes>
    </div>
  );
};

export default App;
