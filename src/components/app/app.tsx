import { ConstructorPage, Feed, Login, NotFound404, Register } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingridientSlice';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
    console.log(location);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location}>
        {/* location={location || backgroundLocation}*/}
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
