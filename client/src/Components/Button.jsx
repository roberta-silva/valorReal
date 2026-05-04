import { NavLink } from 'react-router-dom';
import styles from './Button.module.css'

const Button = () => {
  return <NavLink to="calculadora" className={styles.btn}>Calcule agora</NavLink>;
};

export default Button;
