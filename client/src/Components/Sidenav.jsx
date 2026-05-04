import { NavLink } from 'react-router-dom';
import styles from './Sidenav.module.css';

const Sidenav = () => {
  return (
    <nav className={styles.sidenav}>
      <ul>
        <li>
          <NavLink to="/">Calculadora</NavLink>
        </li>
        <li>
          <NavLink to="/">Categorias</NavLink>
        </li>
        <li>
          <NavLink to="/">Histórico</NavLink>
        </li>
        <li>
          <NavLink to="/">Como funciona</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
