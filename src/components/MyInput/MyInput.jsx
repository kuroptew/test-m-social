
import styles from './MyInput.module.scss'

const MyInput = ({ labelName, id, type,description, required, placeholder }) => {
  return (
    <div className={styles['wrapper__input']}>
      <label
        htmlFor={id}
        className={styles.label}
        aria-required ={required}
      >
        {labelName}
      </label>
      <div className={styles['wrapper__input_right']}>
        <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={styles.input}
      />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MyInput;