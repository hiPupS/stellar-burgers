import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const isConstructor =
    location.pathname === '/' || location.pathname.startsWith('/ingredients');
  const isFeed = location.pathname.startsWith('/feed');
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              clsx(
                styles.link,
                (isActive || isConstructor) && styles.link_active
              )
            }
          >
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              clsx(styles.link, (isActive || isFeed) && styles.link_active)
            }
          >
            <ListIcon type='primary' />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              clsx(styles.link, (isActive || isProfile) && styles.link_active)
            }
          >
            <ProfileIcon type='primary' />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
