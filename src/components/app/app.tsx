import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingridientSlice';
import { ProtectedRoute } from '../protected-route';
import { fetchGetUser } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const closeModalHandle = () => {
    if (backgroundLocation) {
      navigate(backgroundLocation);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchIngredients());
    console.log(location);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* location={backgroundLocation || location} */}
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderInfo />} />
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
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
