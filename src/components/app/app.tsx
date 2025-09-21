import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Profile,
  Register
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader, IngredientDetails } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingridientSlice';
import { ProtectedRoute } from '../protected-route';
import { fetchGetUser, getUser } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchGetUser());
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
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
