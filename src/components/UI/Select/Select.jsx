import styles from "./Select.module.scss"

const Select = ({options, id, value, onChange, labelName}) => {
  return (
    <div className={styles["select__wrapper"]}>
      <label
        htmlFor={id}
        className={styles["select__label"]}
      >
        {labelName}
      </label>
      <div className={styles["select__wrapper_right"]}>
        <select
          id={id}
          value={value}
          onChange={e => onChange(e)}
          className={styles["select"]}
        >
          {options.map((option) =>
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          )}
        </select>
      </div>
    </div>
  )
}

export default Select