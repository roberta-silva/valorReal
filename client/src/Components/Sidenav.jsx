import { NavLink } from 'react-router-dom';
import styles from './Sidenav.module.css';

const Sidenav = () => {
  return (
    <nav className={styles.sidenav}>
      <ul>
        <li>
          <NavLink to="calculadora">Calculadora</NavLink>
        </li>
        <li>
          <NavLink to="categorias">Categorias</NavLink>
        </li>
        <li>
          <NavLink to="historico">Histórico</NavLink>
        </li>
        <li>
          <NavLink to="como-funciona">Como funciona</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
