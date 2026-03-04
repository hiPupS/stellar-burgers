import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, fetchUser } from '../../services/slices';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '../protected-route';
import { Layout } from './layout';
import { ConstructorWithIngredientModal } from './constructor-with-ingredient-modal';
import { FeedWithOrderModal } from './feed-with-order-modal';
import { ProfileOrdersWithModal } from './profile-orders-with-modal';
import { Preloader } from '@ui';

import '../../index.css';
import styles from './app.module.css';

const ConstructorPageOrLoader = () => {
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);

  if (isIngredientsLoading) return <Preloader />;
  if (error) {
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );
  }
  if (ingredients.length === 0) {
    return (
      <div className={`${styles.title} text text_type_main-medium pt-4`}>
        Нет ингредиентов
      </div>
    );
  }
  return <ConstructorPage />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ConstructorPageOrLoader />} />
        <Route
          path='ingredients/:id'
          element={<ConstructorWithIngredientModal />}
        />
        <Route path='feed' element={<Feed />} />
        <Route path='feed/:number' element={<FeedWithOrderModal />} />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile/orders/:number'
          element={
            <ProtectedRoute>
              <ProfileOrdersWithModal />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  );
};

export default App;
