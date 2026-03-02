import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConstructorPage, Feed, Profile } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.loading
  );
  const ingredients = useSelector((state) => state.ingredients.items);
  const error = useSelector((state) => state.ingredients.error);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route
          path='/'
          element={
            isIngredientsLoading ? (
              <Preloader />
            ) : error ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {error}
              </div>
            ) : ingredients.length > 0 ? (
              <ConstructorPage />
            ) : (
              <div
                className={`${styles.title} text text_type_main-medium pt-4`}
              >
                Нет ингредиентов
              </div>
            )
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
