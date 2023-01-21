import styles from "./Select.module.scss"

const Select = ({options, defaultValue, value, onChange, labelName, id}) => {
  return (
    <div className={styles['wrapper__select']}>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {labelName}
      </label>
      <div className={styles['wrapper__select_right']}>
        <select
          id={id}
          value={value}
          onChange={e => onChange(e)}
          className={styles.select}
        >
          {options.map((option, index) =>
            <option key={index} value={option}>
              {option}
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default Select;