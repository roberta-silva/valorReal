import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import ValorReal from '../assets/ValorReal.svg?react';
import Button from './Button';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/">
          <ValorReal />
        </NavLink>
        <Button />
      </nav>
    </header>
  );
};

export default Header;
