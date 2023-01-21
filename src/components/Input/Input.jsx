import styles from "./Input.module.scss"

const Input = ({labelName, id, type, description, required, placeholder, value, onChange, onBlur, invalidInput, errorMessage}) => {
  return (<div className={styles['input__wrapper']}>
    <label
      htmlFor={id}
      className={styles.label}
      aria-required={required}
    >
      {labelName}
    </label>
    <div className={styles['input__wrapper_right']}>
      {invalidInput &&  <div className={styles.input__error}>{errorMessage}</div>}
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={styles.input}
        aria-invalid={invalidInput}
        value={value}
        onChange={e=> onChange(e)}
        onBlur={e => onBlur(e)}
      />
      {description && <p className={styles.description}>{description}</p>}
    </div>
  </div>);
};

export default Input;