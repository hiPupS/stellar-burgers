import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

const navLinkClass = (isActive: boolean) =>
  `${styles.link} text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`;

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) => navLinkClass(isActive) + ' mr-10'}
          end
        >
          <BurgerIcon type='primary' />
          <span className='ml-2'>Конструктор</span>
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) => navLinkClass(isActive) + ' mr-10'}
        >
          <ListIcon type='primary' />
          <span className='ml-2'>Лента заказов</span>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) => navLinkClass(isActive)}
        >
          <ProfileIcon type='primary' />
          <span className='ml-2'>{userName || 'Личный кабинет'}</span>
        </NavLink>
      </div>
    </nav>
  </header>
);
