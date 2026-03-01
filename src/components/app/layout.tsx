import { Outlet } from 'react-router-dom';
import { AppHeader } from '@components';
import styles from './app.module.css';

export const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
