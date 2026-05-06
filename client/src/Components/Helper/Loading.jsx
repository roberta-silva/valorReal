import styles from './Loading.module.css';

const Loading = ({ height }) => {
  return (
    <div className={styles.wrapper} style={{ height }}>
      <p>Carregando</p>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
